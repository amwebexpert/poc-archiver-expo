import { ProgressCallback } from '../ai-commons/transformer.types';
import { SentimentAnalyser } from './text-classification';

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
