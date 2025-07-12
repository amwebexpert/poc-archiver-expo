import { useState } from 'react';
import { isAllFilesProgressStatusReady, ProgressInfos, ProgressCallback } from './transformer.types';

const getStatusAsPercent = (progressInfos: ProgressInfos): number => {
  if (progressInfos.status === 'ready' || progressInfos.status === 'done') {
    return 1;
  }

  if (progressInfos.progress) {
    return Number(progressInfos.progress);
  }

  return 0;
};

export const useModelLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filesProgress, setFilesProgress] = useState<Record<string, number>>({});

  const progressHandler: ProgressCallback = (progress: ProgressInfos) => {
    const isReady = isAllFilesProgressStatusReady(progress);
    setIsLoading(!isReady);

    const file = progress.file as string;
    const model = progress.model as string;
    const task = progress.task as string;

    setFilesProgress((previousValue: Record<string, number>) => {
      const newFilesProgress = {
        ...previousValue,
        [file ?? model ?? task]: getStatusAsPercent(progress),
      };
      return newFilesProgress;
    });
  };

  return { isLoading, setIsLoading, filesProgress, progressHandler };
};
