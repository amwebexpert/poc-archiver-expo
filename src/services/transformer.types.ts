type Progress = Record<string, string>;

export type ProgressCallback = (progress: Progress) => void;

export const PROGRESS_STATUS_READY: Progress = { status: 'ready' };
export const isProgressStatusReady = (progress: Progress) => progress.status === 'ready';

export const DEFAULT_MODEL_NAME = 'Xenova/bert-base-multilingual-uncased-sentiment';

export type ScoreLabel = {
  score: number;
  label: string;
};
