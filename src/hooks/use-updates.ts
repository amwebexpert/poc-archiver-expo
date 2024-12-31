import * as Updates from 'expo-updates';

import { useEffect } from 'react';
import { LONG_VERSION_DATE } from '~/constants';

export const useUpdates = () => {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync(); // update has successfully downloaded; apply it now
    }
  }, [isUpdatePending]);

  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'app running from built-in code ✓'
    : `app running an update ${LONG_VERSION_DATE}`;

  console.info(
    '===> info',
    JSON.stringify({ isUpdateAvailable, isUpdatePending, currentlyRunning }, null, 2)
  );

  return { runTypeMessage, isUpdateAvailable, isUpdatePending };
};
