import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export enum StorageKey {
  DARK_MODE = 'darkMode',
  SENTIMENT_MODEL_AVAILABLE_OFFLINE = 'sentimentAnalysisModelAvailableOffline',
  TRANSLATION_MODEL_AVAILABILITY = 'translationModelAvailability',
  OBJECTS_DETECTION_MODEL_AVAILABILITY = 'objectsDetectionModelAvailability',
  FEATURE_EXTRACTION_MODEL_AVAILABILITY = 'featureExtractionModelAvailability',
  GUIDELINES_ORDERED_NODES = 'guidelinesOrderedNodes',
}
