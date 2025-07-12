import { nowAsTime } from '~/utils/date.utils';

// TODO PocArchiverExpo-0001: improve model loading progress Typescript types and UI progress bar
const progressExample: Progress = {
  file: 'onnx/model_quantized.onnx',
  name: 'Xenova/bert-base-multilingual-uncased-sentiment',
  status: 'progress',
  progress: 0.9967550387931173,
  loaded: 168046615,
  total: 168593695,
};

export type Progress = Record<string, string | number>;

export type ProgressCallback = (progress: Progress) => void;

export const PROGRESS_STATUS_READY: Progress = { status: 'done', file: 'model.onnx' };

export const isAllFilesProgressStatusReady = (progress: Progress): boolean => {
  if (!!progress.task && !!progress.model && progress.status === 'ready') {
    console.info(`🚀 → isAllFilesProgressStatusReady`, JSON.stringify(progress, null, 2));
    return true;
  }

  return false;
};

export const extractProgressLog = (progress: Progress): string => {
  const time = nowAsTime();
  return `${time} ${JSON.stringify(progress)}`;
};
