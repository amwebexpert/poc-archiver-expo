import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Button, Text } from 'react-native';

import { Container } from '~/components/safe-container';
import { LONG_VERSION_DATE } from '~/constants';

export default function Home() {
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'app running from built-in code ✓'
    : `app running an update ${LONG_VERSION_DATE}`;

  return (
    <Container>
      <Text style={{ textAlign: 'center' }}>{runTypeMessage}</Text>

      <Button onPress={Updates.checkForUpdateAsync} title="Check manually for updates" />

      {isUpdateAvailable && (
        <Button onPress={Updates.fetchUpdateAsync} title="Download and run update" />
      )}
    </Container>
  );
}
