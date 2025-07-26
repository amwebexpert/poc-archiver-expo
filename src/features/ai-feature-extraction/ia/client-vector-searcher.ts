// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import {
  pipeline,
  type FeatureExtractionPipeline,
  type Tensor,
} from "@fugood/transformers";
import { ProgressCallback } from "~/features/ai-commons/transformer.types";
import { storage, StorageKey } from "~/utils/storage";
import { loadAllRules } from "../coding-guideline/coding-guideline.utils";
import type {
  ComputedEmbeddingsStats,
  EmbeddingVector,
  GuidelineNode,
  Rule,
} from "../models";
import {
  cosineSimilarity,
  loadRuleEmbeddings,
  storeRuleEmbeddings,
} from "./client-vector-searcher.utils";

const EMBEDDING_CONFIG = {
  pooling: "mean", // Better than 'cls' for semantic search
  normalize: true, // Consistent normalization for all embeddings
  quantize: false, // Preserve maximum precision
} as const;

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.FEATURE_EXTRACTION_MODEL_AVAILABILITY) ?? false;

export const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.FEATURE_EXTRACTION_MODEL_AVAILABILITY, value);

enum LlmModel {
  all_minilm_l6_v2 = 'Xenova/all-MiniLM-L6-v2',
  gte_small = 'Xenova/gte-small',
}

type RelevantDocumentsArgs = {
  queryText?: string | null;
  maxResults?: number;
};

const tensorToEmbeddingVector = (tensor: Tensor): EmbeddingVector =>
  Array.from((tensor as any).data as number[]).map((v) => Number.parseFloat(v.toFixed(9)));

export class FeatureExtractionEmbeddingsSearcher {
  featureExtractionEmbeddings: FeatureExtractionPipeline | null = null;
  rules: Rule[] = [];

  get hasRules(): boolean {
    return this.rules.length > 0;
  }

  get isReadyForSemanticSearch(): boolean {
    return this.hasRules && this.rules.every((rule) => !!rule.embedding);
  }

  get computedEmbeddingsStats(): ComputedEmbeddingsStats {
    return {
      isCompleted: this.isReadyForSemanticSearch,
      total: this.rules.length,
      completed: this.rules.filter((rule) => !!rule.embedding).length,
      nextRuleTitle: this.nextRuleToCompute?.title ?? '',
    };
  }

  get nextRuleToCompute(): Rule | null {
    return this.rules.find((rule) => !rule.embedding) ?? null;
  }

  computeNextRuleEmbedding = async (): Promise<void> => {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first');
    const rule = this.nextRuleToCompute;
    if (!rule) return;

    const embeddings = await loadRuleEmbeddings(rule);
    if (embeddings) {
      rule.embedding = embeddings;
    } else {
      await this.computeRuleEmbedding(rule);
      storeRuleEmbeddings(rule);
    }

    //console.info(`🚀 → ${rule.title}`, rule);
  };

  async computeRuleEmbedding(rule: Rule): Promise<void> {
    console.info(`====>>> computing rule embeddings: ${rule.title}`);

    if (!this.featureExtractionEmbeddings) return;
    const createEmbedding = this.featureExtractionEmbeddings;

    const tensor: Tensor = await createEmbedding(rule.content, EMBEDDING_CONFIG);

    rule.embedding = tensorToEmbeddingVector(tensor);
  }

  async computeAllEmbeddings(): Promise<void> {
    if (!this.featureExtractionEmbeddings) throw Error('Model should be loaded first');

    // @see Ticket-001 regarding multiple threads
    // const embeddingPromises = this.rules.map((rule) => this.computeRuleEmbedding(rule))
    // await Promise.all(embeddingPromises)
    while (this.nextRuleToCompute) {
      await this.computeNextRuleEmbedding();
    }

    console.info('====>>> Computed embeddings for all rules. END.');
  }

  async init(rootNode?: GuidelineNode | null, progressHandler?: ProgressCallback) {
    if (!rootNode?.children?.length) throw Error('Guidelines should be loaded first');

    this.rules = loadAllRules(rootNode);
    this.featureExtractionEmbeddings = await pipeline(
      'feature-extraction',
      LlmModel.all_minilm_l6_v2,
      {
        progress_callback: progressHandler,
        local_files_only: canUseOfflineMode(),
      }
    );

    updateCanUseOfflineMode();
  }

  findRelevantDocuments = async (configs?: RelevantDocumentsArgs): Promise<Rule[]> => {
    console.info('🚀 → findRelevantDocuments', configs);
    if (!configs) return this.rules;
    if (!this.isReadyForSemanticSearch) return this.rules;
    if (!this.featureExtractionEmbeddings) throw Error('Cannot compute embeddings');

    const { queryText, maxResults = 5 } = configs;
    if (!queryText) return this.rules;

    const tensor: Tensor = await this.featureExtractionEmbeddings(queryText, EMBEDDING_CONFIG);
    const queryTextEmbedding = tensorToEmbeddingVector(tensor);

    const rules: Rule[] = this.rules
      .map((rule) => ({
        ...rule,
        similarity: cosineSimilarity(queryTextEmbedding, rule.embedding ?? []),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults);

    return rules;
  };

  findRelevantDocument = async (queryText: string): Promise<Rule | null> =>
    this.findRelevantDocuments({ queryText, maxResults: 1 }).then((docs) => docs[0] ?? null);
}
