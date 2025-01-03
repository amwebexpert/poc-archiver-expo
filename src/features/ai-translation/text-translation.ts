// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import {
  env,
  pipeline,
  PipelineType,
  TranslationPipeline,
  TranslationSingle
} from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { PROGRESS_STATUS_READY, ProgressCallback } from '../ai-commons/transformer.types';

const DEFAULT_MODEL_NAME = 'Xenova/nllb-200-distilled-600M';

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.TRANSLATION_MODEL_AVAILABLE_OFFLINE) ?? false;

const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.TRANSLATION_MODEL_AVAILABLE_OFFLINE, value);

export type TranslateArgs = {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
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

  static async getInstance(progressHandler?: ProgressCallback) {
    if (this.instance?.isReady) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    console.info('===> env', JSON.stringify(env, null, 2));

    this.instance = new TextTranslator();
    this.instance.translator = (await pipeline('translation_en_to_fr' as PipelineType, undefined, {
      progress_callback: progressHandler,
      local_files_only: canUseOfflineMode(),
    })) as TranslationPipeline;

    updateCanUseOfflineMode();

    return this.instance;
  }

  async translate(params: TranslateArgs): Promise<string> {
    const { text, sourceLanguage, targetLanguage } = params;
    if (!this.translator) {
      throw new Error('Model is not loaded yet');
    }

    const result = await this.translator(text);
    const translations = result as TranslationSingle[];

    return translations.map(({ translation_text }) => translation_text).join(' ');
  }
}
