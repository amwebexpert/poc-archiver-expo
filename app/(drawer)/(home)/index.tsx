import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Button, StatusBar, Text } from 'react-native';

import { Container } from '~/components/safe-container';

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
    ? 'This app is running from built-in code'
    : 'This app is running an update';

  return (
    <Container>
      <Text>Updates Infos</Text>
      <Text>{runTypeMessage}</Text>

      <Button onPress={Updates.checkForUpdateAsync} title="Check manually for updates" />

      {isUpdateAvailable && (
        <Button onPress={Updates.fetchUpdateAsync} title="Download and run update" />
      )}
    </Container>
  );
}
