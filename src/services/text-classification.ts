// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { pipeline, TextClassificationPipeline } from '@fugood/transformers';

export const sentimentAnalysis = async (text: string) => {
  const pipe: TextClassificationPipeline = await pipeline('sentiment-analysis', undefined, {
    progress_callback: (progress: any) => console.info('progress', progress),
  });
  const out = await pipe(text);

  // [{'label': 'POSITIVE', 'score': 0.999817686}]
  console.info('===> sentiment-analysis', out);
  return out;
};

export const sentimentAnalysisAsString = async (text: string) =>
  sentimentAnalysis(text).then((result) => JSON.stringify(result));
