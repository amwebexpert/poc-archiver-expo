import { storage, StorageKey } from '~/utils/storage';
import { SentimentAnalyser } from './text-classification';
import { ProgressCallback } from './transformer.types';

type AiSentimentAnalysysArgs = {
  texts: string[];
  progressHandler?: ProgressCallback;
};

export const aiSentimentAnalysys = async ({
  texts,
  progressHandler,
}: AiSentimentAnalysysArgs): Promise<string[]> => {
  const analyser = await SentimentAnalyser.getInstance(progressHandler);
  return analyser.analyse(texts);
};

export const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE) ?? false;

export const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.SENTIMENT_MODEL_AVAILABLE_OFFLINE, value);
