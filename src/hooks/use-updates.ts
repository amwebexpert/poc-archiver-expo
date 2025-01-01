import * as Updates from 'expo-updates';

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

  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? `App "${NAME}" is running from built-in code ✓`
    : `App "${NAME}" is running an dynamic update. Version name: ${LONG_VERSION_DATE}`;

  console.info(
    '===> info',
    JSON.stringify({ isUpdateAvailable, isUpdatePending, currentlyRunning }, null, 2)
  );

  return { runTypeMessage, isUpdateAvailable, isUpdatePending };
};
