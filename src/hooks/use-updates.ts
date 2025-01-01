import * as Updates from 'expo-updates';
import { nativeBuildVersion, nativeApplicationVersion } from 'expo-application';

import { useEffect } from 'react';
import { APP_VERSION_INFO, LONG_VERSION_DATE } from '~/constants';

const { NAME } = APP_VERSION_INFO;

export const useUpdates = () => {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync(); // update has successfully downloaded; apply it now
    }
  }, [isUpdatePending]);

  const app = `App "${NAME}" ${LONG_VERSION_DATE}`;
  const storeVersion = `Store version: ${nativeApplicationVersion} (${nativeBuildVersion})`;
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? `${app} is running from built-in code ✓. ${storeVersion}.`
    : `${app} is running an dynamic update. ${storeVersion}.`;

  console.info(
    '===> info',
    JSON.stringify({ isUpdateAvailable, isUpdatePending, currentlyRunning }, null, 2)
  );

  return { runTypeMessage, isUpdateAvailable, isUpdatePending };
};
