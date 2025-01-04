import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import * as Updates from 'expo-updates';

import { useEffect } from 'react';
import { APP_VERSION_INFO } from '~/constants';

const { NAME } = APP_VERSION_INFO;

export const useUpdates = () => {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync(); // update has successfully downloaded; apply it now
    }
  }, [isUpdatePending]);

  const storeVersion = `Store version: ${nativeApplicationVersion} (${nativeBuildVersion})`;
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? `${storeVersion}: from built-in code.`
    : `${storeVersion}: with dynamic update.`;

  console.info(
    '===> info',
    JSON.stringify({ isUpdateAvailable, isUpdatePending, currentlyRunning }, null, 2)
  );

  return { runTypeMessage, isUpdateAvailable, isUpdatePending };
};
