import { SentimentAnalyser } from '~/services/text-classification';
import { ProgressCallback } from './transformer.types';

type AiSentimentAnalysysArgs = {
  texts: string[];
  progressCallback?: ProgressCallback;
};

export const aiSentimentAnalysys = async ({
  texts,
  progressCallback,
}: AiSentimentAnalysysArgs): Promise<string[]> => {
  const analyser = await SentimentAnalyser.getInstance(progressCallback);
  return analyser.analyse(texts);
};
