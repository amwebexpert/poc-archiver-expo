// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { pipeline, TextClassificationPipeline, env } from '@fugood/transformers';
import {
  DEFAULT_MODEL_NAME,
  PROGRESS_STATUS_READY,
  ProgressCallback,
  ScoreLabel,
} from './transformer.types';

export class SentimentAnalyser {
  static instance: SentimentAnalyser | null = null;

  private sentimentAnalysisPipeline?: TextClassificationPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.sentimentAnalysisPipeline;
  }

  static async getInstance(progressHandler?: ProgressCallback) {
    if (this.instance?.isReady) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    console.info('===> env', JSON.stringify(env, null, 2))

    this.instance = new SentimentAnalyser();
    this.instance.sentimentAnalysisPipeline = await pipeline(
      'sentiment-analysis',
      DEFAULT_MODEL_NAME,
      { progress_callback: progressHandler, local_files_only: true }
    );

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
