// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { pipeline, TextClassificationPipeline } from '@fugood/transformers';

type ProgressCallback = (progress: any) => void;

interface ScoreLabel {
  score: number;
  label: string;
}

export class SentimentAnalyser {
  static instance: SentimentAnalyser | null = null;

  private sentimentAnalysisPipeline?: TextClassificationPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.sentimentAnalysisPipeline;
  }

  static async getInstance(progress_callback?: ProgressCallback) {
    if (this.instance?.isReady) {
      return this.instance;
    }

    this.instance = new SentimentAnalyser();
    this.instance.sentimentAnalysisPipeline = await pipeline(
      'sentiment-analysis',
      'Xenova/bert-base-multilingual-uncased-sentiment',
      { progress_callback }
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
