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
