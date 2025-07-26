import { Asset } from "expo-asset";
import { storage, StorageKey } from "~/utils/storage";
import type { GuidelineNode, Rule } from "../models";
import {
  buildNode,
  buildOrderedNodes,
  cloneAndRemoveAllParents,
  createGuidelineNodes,
  hasDescendentMatching,
  isParentOfAvoidPreferSection,
} from "./markdown-parser";

export const isAvoidOrPreferTitle = (title: string): boolean =>
  title.startsWith("❌ Avoid") || title.startsWith("✅ Prefer");

const extractRuleContent = (node: GuidelineNode): string => {
  const content = node.children
    .map(({ title, markdownLines }) => {
      const lines = markdownLines.join("\n");
      return `${title}\n${lines}`;
    })
    .join("\n");

  return content;
};

export const extractFullRule = (node: GuidelineNode): Rule => {
  const { title, href } = node;
  const content = extractRuleContent(node);

  return { title, href, content };
};

export const loadRules = (guidelineNode: GuidelineNode): Rule[] => {
  const rules: Rule[] = [];
  for (const child of guidelineNode.children) {
    rules.push(extractFullRule(child));
  }

  return rules;
};

export const loadAllRules = (rootNode: GuidelineNode): Rule[] => {
  const rules: Rule[] = [];

  for (const guidelineNode of rootNode.children) {
    const guidelineNodeRules = loadRules(guidelineNode);
    rules.push(...guidelineNodeRules);
  }

  return rules;
};

type CombineSearchResultsArgs = {
  exactMatches: GuidelineNode[];
  semanticMatches: GuidelineNode[];
};

export const combineSearchResults = ({
  exactMatches,
  semanticMatches,
}: CombineSearchResultsArgs): GuidelineNode[] => {
  const exactMatchHrefs = exactMatches
    .filter((node) => node.shouldDisplayNode)
    .map((node) => node.href);
  const semanticMatchHrefs = semanticMatches.map((node) => node.href);
  console.info("====>>> combineearchResults", {
    exactMatchHrefs,
    semanticMatchHrefs,
  });

  const combinedResults = [...exactMatches];

  for (const semanticResult of semanticMatches) {
    if (!exactMatchHrefs.includes(semanticResult.href))
      combinedResults.push(semanticResult);
  }

  console.info(
    `====>>> returning ${combinedResults.length} combined search results`
  );

  return combinedResults;
};

export const normalizeForSearch = (search: string): string =>
  search.toLowerCase().replaceAll("`", "").trim();

type FilterGuidelines = {
  search: string;
  rootNode: GuidelineNode;
};
export const filterGuidelines = ({
  search,
  rootNode,
}: FilterGuidelines): GuidelineNode[] => {
  if (!rootNode) return [];

  const normalizedSearch = normalizeForSearch(search);
  if (!normalizedSearch) return [];

  // traverse the tree and mark nodes that match the search inside its markdownLines
  const clonedRoot = cloneAndRemoveAllParents(rootNode);
  const allOrderedNodes = buildOrderedNodes({ node: clonedRoot });
  for (const node of allOrderedNodes) {
    node.isMatching =
      normalizeForSearch(node.title).includes(normalizedSearch) ||
      node.markdownLines.some((line) =>
        normalizeForSearch(line).includes(normalizedSearch)
      );
  }

  // traverse the tree and determine which nodes to show
  for (const node of allOrderedNodes) {
    if (!isParentOfAvoidPreferSection(node)) continue;

    node.shouldDisplayNode = node.isMatching || hasDescendentMatching(node);
  }

  return allOrderedNodes.filter((node) => node.shouldDisplayNode);
};

export const getFullOrderedNodes = (
  rootNode: GuidelineNode
): GuidelineNode[] => {
  if (!rootNode) return [];

  const clonedRoot = cloneAndRemoveAllParents(rootNode);
  return buildOrderedNodes({ node: clonedRoot });
};

export const storeOrderedNodes = (node: GuidelineNode): void => {
  const allOrderedNodes = getFullOrderedNodes(node);

  console.debug(
    "====>>> debug guidelines ordered nodes:",
    allOrderedNodes.map(
      (node) => `${node.titleMarkdown}\n${node.markdownLines.join("\n    ")}`
    )
  );
  storage.set(
    StorageKey.GUIDELINES_ORDERED_NODES,
    JSON.stringify(allOrderedNodes)
  );
};

export const collectOfflineGuidelines = async (): Promise<GuidelineNode> => {
  const assets: Asset[] = await Asset.loadAsync([
    require("@assets/markdowns/common-coding-patterns.md"),
    require("@assets/markdowns/common-naming-patterns.md"),
    require("@assets/markdowns/common-react-patterns.md"),
    require("@assets/markdowns/common-unit-testing.md"),
  ]);

  const urls = assets.map((asset) => asset.localUri ?? asset.uri);

  return collectAllGuidelinesIntoSingleRoot(urls);
};

const collectAllGuidelinesIntoSingleRoot = async (
  urls: string[]
): Promise<GuidelineNode> => {
  const rootNode: GuidelineNode = buildNode({
    level: 0,
    title: "Root TOC node grouping all guidelines",
    href: "",
    baseUrl: "",
  });

  const results = await Promise.all(urls.map(fetchCodingGuidelinesText));

  results.map((text, index) =>
    createGuidelineNodes({ rootNode, text, baseUrl: urls[index] })
  );

  return rootNode;
};

export const fetchCodingGuidelinesText = async (
  url: string
): Promise<string> => {
  const result = await fetch(url);
  const fileContent = await result.text();

  return fileContent ?? "";
};
