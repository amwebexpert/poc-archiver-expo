import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { Button, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { SafeContainer } from '~/components/safe-container';
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
    <SafeContainer>
      <Text style={{ textAlign: 'center' }}>{runTypeMessage}</Text>

      <Button mode='contained' onPress={Updates.checkForUpdateAsync}>Check manually for updates</Button>

      {isUpdateAvailable && (
        <Button mode='contained' onPress={Updates.fetchUpdateAsync}>Download and run update</Button>
      )}

      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'monospace', fontSize: 12, padding: 10 }}>
          {JSON.stringify({ isUpdateAvailable, isUpdatePending, currentlyRunning }, null, 2)}
        </Text>
      </ScrollView>
    </SafeContainer>
  );
}
