import similarity from "compute-cosine-similarity";
import { simpleHash } from "~/utils/hash.utils";
import { storage } from "~/utils/storage";
import {
  buildOrderedNodes,
  cloneAndRemoveAllParents,
} from "../coding-guideline/markdown-parser";
import type {
  EmbeddingVector,
  GuidelineNode,
  Rule,
  SerializedRule,
} from "../models";

export const cosineSimilarity = (
  vecA: EmbeddingVector,
  vecB: EmbeddingVector
): number => {
  if (!vecA?.length || !vecB?.length) {
    return 0;
  }

  if (vecA.length !== vecB.length) {
    throw new Error(
      `Vectors must have the same length ${vecA.length} !== ${vecB.length}`
    );
  }

  const cosineSim = similarity(vecA, vecB);
  return cosineSim ? Number.parseFloat(cosineSim.toFixed(9)) : 0;
};

type NodesFromRulesArgs = {
  rootNode?: GuidelineNode | null;
  rules: Rule[];
};

export const getNodesFromRules = ({
  rootNode,
  rules,
}: NodesFromRulesArgs): GuidelineNode[] => {
  if (!rootNode) return [];

  const clonedRoot = cloneAndRemoveAllParents(rootNode);
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot });
  const hrefs = rules.map((rule) => rule.href);

  const results = allOrderedNodes.filter(({ href }) => hrefs.includes(href));

  for (const result of results) {
    result.isMatching = true;
    result.shouldDisplayNode = true;
  }

  return results;
};

const buildStorageKey = (rule: SerializedRule | Rule): string =>
  `rule-${rule.href}`;

export const storeRuleEmbeddings = async (rule: Rule): Promise<void> => {
  const key = buildStorageKey(rule);

  const serializedRule: SerializedRule = {
    href: rule.href,
    contentSha256: simpleHash(rule.content),
    embedding: rule.embedding ?? [],
  };

  storage.set(key, JSON.stringify(serializedRule));
};

export const loadRuleEmbeddings = async (
  rule: Rule
): Promise<EmbeddingVector | null> => {
  const key = buildStorageKey(rule);
  const serializedRuleJson = storage.getString(key);

  if (!serializedRuleJson) {
    return null;
  }

  try {
    const serializedRule: SerializedRule = JSON.parse(serializedRuleJson);

    if (!serializedRule?.embedding) {
      return null;
    }

    if (simpleHash(rule.content) === serializedRule.contentSha256) {
      return serializedRule.embedding;
    }

    // Remove outdated embedding
    storage.delete(key);
    return null;
  } catch (error) {
    console.error("Error parsing stored rule embeddings:", error);
    storage.delete(key);
    return null;
  }
};
