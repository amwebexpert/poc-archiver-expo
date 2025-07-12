// @see https://github.com/hans00/react-native-transformers-example/blob/main/DEVELOPMENT.md
// import { pipeline } from '@xenova/transformers';
import { env, pipeline } from '@fugood/transformers';
import { storage, StorageKey } from '~/utils/storage';
import { ProgressCallback } from '../ai-commons/transformer.types';
import { DetectedObject } from './objects-detection.types';

// Other models tried so far:
// - 'Xenova/detr-resnet-101'
// - 'Xenova/yolos-small-300'
// - 'Xenova/yolos-base'
// - 'Xenova/yolos-small'
const DEFAULT_MODEL_NAME = 'Xenova/detr-resnet-50';

const canUseOfflineMode = (): boolean =>
  storage.getBoolean(StorageKey.OBJECTS_DETECTION_MODEL_AVAILABILITY) ?? false;

export const updateCanUseOfflineMode = (value = true): void =>
  storage.set(StorageKey.OBJECTS_DETECTION_MODEL_AVAILABILITY, value);

export const analyse = async (
  base64: string,
  progressHandler?: ProgressCallback
): Promise<DetectedObject[]> => {
  console.info('===> env', JSON.stringify(env, null, 2));

  const objectsDetectionPipeline = await pipeline('object-detection', DEFAULT_MODEL_NAME, {
    progress_callback: progressHandler,
    local_files_only: canUseOfflineMode(),
  });

  updateCanUseOfflineMode();

  const results = await objectsDetectionPipeline(base64, {
    threshold: 0.5,
    percentage: true,
  });

  return results as DetectedObject[];
};
