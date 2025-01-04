import { nowAsTime } from '~/utils/date.utils';

export type Progress = Record<string, string>;

export type ProgressCallback = (progress: Progress) => void;

export const PROGRESS_STATUS_READY: Progress = { status: 'ready' };
export const isProgressStatusReady = (progress: Progress) => progress.status === 'ready';

export const extractProgressLog = (progress: Progress) => {
  const time = nowAsTime();
  if (progress.file) {
    return `${time} - ${progress.file}: ${progress.status}`;
  }

  return `${time} - ${progress.model}: ${progress.status}`;
};
