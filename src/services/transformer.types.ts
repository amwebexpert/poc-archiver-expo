export type ProgressCallback = (progress: Record<string, string>) => void;

export const MODEL_NAME = 'Xenova/bert-base-multilingual-uncased-sentiment';

export type ScoreLabel = {
  score: number;
  label: string;
};
