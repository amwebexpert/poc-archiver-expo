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
import { PROGRESS_STATUS_READY, ProgressCallback } from '../ai-commons/transformer.types';

const DEFAULT_MODEL_NAME = 'Xenova/nllb-200-distilled-600M';

export type TranslateArgs = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
};

export type GetInstanceArgs = {
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

const validateSupportedLanguages = (params: GetInstanceArgs): void => {
  const { sourceLanguage, targetLanguage } = params;
  if (sourceLanguage !== 'en') {
    throw new Error('Xenova/t5-small ONNX model only support "English" as source language');
  }

  if (!['de', 'fr'].includes(targetLanguage)) {
    throw new Error(
      'Xenova/t5-small ONNX model only support "German" and "French" as target languages'
    );
  }
};

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to use LLM models.
 */
export class TextTranslator {
  static instance: TextTranslator | null = null;

  private translator?: TranslationPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.translator;
  }

  static async getInstance(params: GetInstanceArgs): Promise<TextTranslator> {
    validateSupportedLanguages(params);

    const { progressHandler, sourceLanguage, targetLanguage } = params;

    const task = `translation_${sourceLanguage}_to_${targetLanguage}` as PipelineType;
    const model = 'Xenova/t5-small';

    if (this.instance?.isReady && this.instance.translator?.task === task) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    this.instance?.translator?.dispose();
    console.info('===> getInstance', task, JSON.stringify(env, null, 2));

    this.instance = new TextTranslator();
    this.instance.translator = (await pipeline(task, model, {
      progress_callback: progressHandler,
      local_files_only: canUseOfflineMode(task),
    })) as TranslationPipeline;

    updateCanUseOfflineMode(task);

    return this.instance;
  }

  async translate(params: TranslateArgs): Promise<string> {
    const { text } = params;
    if (!this.translator) {
      throw new Error('Model is not loaded yet');
    }

    const result = await this.translator(text);
    const translations = result as TranslationSingle[];

    return translations.map(({ translation_text }) => translation_text).join(' ');
  }
}
