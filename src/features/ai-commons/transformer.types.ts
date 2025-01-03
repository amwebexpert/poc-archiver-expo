type Progress = Record<string, string>;

export type ProgressCallback = (progress: Progress) => void;

export const PROGRESS_STATUS_READY: Progress = { status: 'ready' };
export const isProgressStatusReady = (progress: Progress) => progress.status === 'ready';

export const extractProgressLog = (progress: Progress) => {
    if (progress.file) {
        return `${progress.file}: ${progress.status}`;
    }

    return `${progress.model}: ${progress.status}`;
};