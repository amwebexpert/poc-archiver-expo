import { useState } from 'react';
import {
  extractProgressLog,
  isAllFilesProgressStatusReady,
  Progress,
  ProgressCallback,
} from './transformer.types';

export const useModelLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoadingLogs, setModelLoadingLogs] = useState<string[]>([]);
  const [filesProgress, setFilesProgress] = useState<Record<string, string>>({});

  const progressHandler: ProgressCallback = (progress: Progress) => {
    const isReady = isAllFilesProgressStatusReady(progress);

    const file = progress.file as string;
    const status = progress.status as string;
    setFilesProgress((previousValue: Record<string, string>) => {
      const newFilesProgress = { ...previousValue, [file]: status };
      return newFilesProgress;
    });

    setModelLoadingLogs((logs: string[]) => {
      const newEntry = extractProgressLog(progress);
      return logs.includes(newEntry) ? logs : [newEntry, ...logs];
    });

    setIsLoading(!isReady);
  };

  return { isLoading, setIsLoading, modelLoadingLogs, progressHandler };
};
