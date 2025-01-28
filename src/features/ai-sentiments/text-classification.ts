// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { env, pipeline, TextClassificationPipeline } from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { PROGRESS_STATUS_READY, ProgressCallback } from '../ai-commons/transformer.types';

// The model is fine-tuned specifically for sentiment analysis, meaning it can predict the
// sentiment of a given text (e.g., positive, negative, or neutral).
// It is particularly useful for tasks like customer feedback analysis, social media monitoring, and
// review classification.
const DEFAULT_MODEL_NAME = 'Xenova/bert-base-multilingual-uncased-sentiment';

export type ScoreLabel = {
  score: number;
  label: string;
};

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE) ?? false;

const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE, value);

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to use LLM models.
 */
export class SentimentAnalyser {
  static instance: SentimentAnalyser | null = null;

  private sentimentAnalysisPipeline?: TextClassificationPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.sentimentAnalysisPipeline;
  }

  static isInstanceReady(): boolean {
    return !!this.instance?.isReady;
  }

  static async getInstance(progressHandler?: ProgressCallback) {
    if (this.instance?.isReady) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    console.info('===> env', JSON.stringify(env, null, 2));

    this.instance = new SentimentAnalyser();
    this.instance.sentimentAnalysisPipeline = await pipeline(
      'sentiment-analysis',
      DEFAULT_MODEL_NAME,
      {
        progress_callback: progressHandler,
        local_files_only: canUseOfflineMode(),
      }
    );

    updateCanUseOfflineMode();

    return this.instance;
  }

  async analyse(texts: string[]): Promise<string[]> {
    if (!this.sentimentAnalysisPipeline) {
      throw new Error('Model is not loaded yet');
    }

    const result = (await this.sentimentAnalysisPipeline(texts)) as unknown as ScoreLabel[];
    return result.map((r) => `${r.label} (score: ${r.score.toFixed(2)})`);
  }
}
