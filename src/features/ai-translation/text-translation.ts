// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import {
  env,
  pipeline,
  PipelineType,
  TranslationPipeline,
  TranslationSingle,
} from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { ProgressCallback } from '../ai-commons/transformer.types';

const DEFAULT_MODEL_NAME = 'Xenova/t5-small';

export type TranslateArgs = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  progressHandler?: ProgressCallback;
};

const getAvailableOfflineTasks = (): Record<PipelineType, boolean> => {
  const jsonValue = storage.getString(StorageKey.TRANSLATION_MODEL_AVAILABILITY) ?? '{}';
  return JSON.parse(jsonValue);
};

const canUseOfflineMode = (task: PipelineType): boolean =>
  getAvailableOfflineTasks()[task] ?? false;

const updateCanUseOfflineMode = (task: PipelineType): void => {
  const availableOfflineTasks = getAvailableOfflineTasks();
  availableOfflineTasks[task] = true;
  storage.set(StorageKey.TRANSLATION_MODEL_AVAILABILITY, JSON.stringify(availableOfflineTasks));
};

const validateSupportedLanguages = (sourceLanguage: string, targetLanguage: string): void => {
  if (sourceLanguage !== 'en') {
    throw new Error('Xenova/t5-small ONNX model only support "English" as source language');
  }

  if (!['de', 'fr'].includes(targetLanguage)) {
    throw new Error(
      'Xenova/t5-small ONNX model only support "German" and "French" as target languages'
    );
  }
};

export const translate = async ({
  text,
  sourceLanguage,
  targetLanguage,
  progressHandler,
}: TranslateArgs): Promise<string> => {
  validateSupportedLanguages(sourceLanguage, targetLanguage);

  const task = `translation_${sourceLanguage}_to_${targetLanguage}` as PipelineType;
  const model = DEFAULT_MODEL_NAME;

  console.info('===> translate', task, JSON.stringify(env, null, 2));

  const translationPipeline = (await pipeline(task, model, {
    progress_callback: progressHandler,
    local_files_only: canUseOfflineMode(task),
  })) as TranslationPipeline;

  updateCanUseOfflineMode(task);

  const result = await translationPipeline(text);
  console.info('🚀 → translate result', result);

  const translations = result as TranslationSingle[];

  return translations.map(({ translation_text }) => translation_text).join(' ');
};
