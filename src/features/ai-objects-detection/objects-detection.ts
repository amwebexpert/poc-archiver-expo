// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { env, ObjectDetectionPipeline, pipeline } from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { PROGRESS_STATUS_READY, ProgressCallback } from '../ai-commons/transformer.types';

const DEFAULT_MODEL_NAME = 'Xenova/detr-resnet-50';

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.OBJECTS_DETECTION_MODEL_AVAILABILITY) ?? false;

const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.OBJECTS_DETECTION_MODEL_AVAILABILITY, value);

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to use LLM models.
 */
export class ImageObjectsDetector {
  static instance: ImageObjectsDetector | null = null;

  private objectsDetectionPipeline?: ObjectDetectionPipeline;

  private constructor() {}

  get isReady(): boolean {
    return !!this.objectsDetectionPipeline;
  }

  static isInstanceReady(): boolean {
    return !!this.instance?.isReady;
  }

  static async getInstance(progressHandler?: ProgressCallback) {
    if (this.instance?.isReady) {
      progressHandler?.(PROGRESS_STATUS_READY);
      return this.instance;
    }

    console.info('===> env', JSON.stringify(env, null, 2));

    this.instance = new ImageObjectsDetector();
    this.instance.objectsDetectionPipeline = await pipeline(
      'object-detection',
      DEFAULT_MODEL_NAME,
      {
        progress_callback: progressHandler,
        local_files_only: canUseOfflineMode(),
      }
    );

    updateCanUseOfflineMode();

    return this.instance;
  }

  async analyse(base64: string): Promise<void> {
    if (!this.objectsDetectionPipeline) {
      throw new Error('Model is not loaded yet');
    }

    const results = await this.objectsDetectionPipeline(base64, {
      threshold: 0.5,
      percentage: true,
    });
 
    console.info('🚀 → info', JSON.stringify(results, null, 2));
  }
}
