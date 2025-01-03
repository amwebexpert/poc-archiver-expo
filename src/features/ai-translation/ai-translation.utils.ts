import { ProgressCallback } from '../ai-commons/transformer.types';
import { TextTranslator, TranslateArgs } from './text-translation';

type AiTranslationArgs = TranslateArgs & {
  progressHandler?: ProgressCallback;
};

export const aiTranslation = async ({
  text,
  sourceLanguage,
  targetLanguage,
  progressHandler,
}: AiTranslationArgs): Promise<string> => {
  const analyser = await TextTranslator.getInstance(progressHandler);
  return analyser.translate({ text, sourceLanguage, targetLanguage });
};
