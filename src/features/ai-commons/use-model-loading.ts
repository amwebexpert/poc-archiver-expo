import { useState } from 'react';
import {
  extractProgressLog,
  isAllFilesProgressStatusReady,
  Progress,
  ProgressCallback
} from './transformer.types';

export const useModelLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoadingLogs, setModelLoadingLogs] = useState<string[]>([]);
  const [filesProgress, setFilesProgress] = useState<Record<string, string>>({});

  const progressHandler: ProgressCallback = (progress: Progress) => {
    //console.info('===> progress', JSON.stringify(progress, null, 2));

    const file = progress.file as string;
    const status = progress.status as string;
    setFilesProgress((previousValue: Record<string, string>) => {
      const newFilesProgress = { ...previousValue, [file]: status };
      console.info('🚀 → info', JSON.stringify(newFilesProgress, null, 2));

      return newFilesProgress;
    });

    setModelLoadingLogs((logs: string[]) => {
      const newEntry = extractProgressLog(progress);
      return logs.includes(newEntry) ? logs : [newEntry, ...logs];
    });

    setIsLoading(!isAllFilesProgressStatusReady(filesProgress));
  };

  return { isLoading, setIsLoading, modelLoadingLogs, progressHandler };
};
