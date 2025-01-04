import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import * as Updates from 'expo-updates';

import { useEffect, useState } from 'react';
import { APP_VERSION_INFO } from '~/constants';

const { NAME } = APP_VERSION_INFO;

export const useUpdates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  const fetchAndApplyUpdate = async () => {
    setIsLoading(true);

    try {
      await Updates.fetchUpdateAsync();
    } catch (error) {
      console.error('Failed to fetch update:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkForUpdates = async () => {
    setIsLoading(true);

    try {
      await Updates.checkForUpdateAsync();
    } catch (error) {
      console.error('Failed to check for updates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync(); // update has successfully downloaded; apply it now
    }
  }, [isUpdatePending]);

  const storeVersion = `Store version: ${nativeApplicationVersion} (${nativeBuildVersion})`;
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? `${storeVersion}: from built-in code.`
    : `${storeVersion}: with dynamic update.`;

  return {
    runTypeMessage,
    isUpdateAvailable,
    isUpdatePending,
    checkForUpdates,
    isLoading,
    fetchAndApplyUpdate,
  };
};
