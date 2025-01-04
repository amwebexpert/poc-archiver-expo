import { useState } from 'react';
import {
  extractProgressLog,
  isProgressStatusReady,
  Progress,
  ProgressCallback,
} from './transformer.types';

export const useModelLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoadingLogs, setModelLoadingLogs] = useState<string[]>([]);

  const progressHandler: ProgressCallback = (progress: Progress) => {
    setModelLoadingLogs((logs) => {
      const newEntry = extractProgressLog(progress);
      return logs.includes(newEntry) ? logs : [newEntry, ...logs];
    });
    setIsLoading(!isProgressStatusReady(progress));
  };

  return { isLoading, setIsLoading, modelLoadingLogs, progressHandler };
};
