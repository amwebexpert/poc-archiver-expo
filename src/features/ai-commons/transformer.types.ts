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

export const PROGRESS_STATUS_READY: Progress = { status: 'ready' };
export const isProgressStatusReady = (progress: Progress): boolean => progress.status === 'ready';

export const extractProgressLog = (progress: Progress): string => {
  const time = nowAsTime();
  if (progress.file) {
    return `${time} ${progress.file}: ${progress.status}`;
  }

  return `${time} ${progress.model}: ${progress.status}`;
};
