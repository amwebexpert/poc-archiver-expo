import { SentimentAnalyser } from '~/services/text-classification';

export const aiSentimentAnalysys = async (texts: string[]): Promise<string[]> => {
  const analyser = await SentimentAnalyser.getInstance(console.info);
  return analyser.analyse(texts);
};
