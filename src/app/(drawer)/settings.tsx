import { FunctionComponent, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { SafeContainer } from '~/components/safe-container';
import { useSnackbar } from '~/components/snack-bar/snackbar-provider';
import { settingsStore } from '~/stores/settings.store';

const SettingsScreen: FunctionComponent = () => {
  const { showSnackbarMessage } = useSnackbar();

  useEffect(() => {
    if (settingsStore.isDarkMode) {
      showSnackbarMessage('Dark mode is enabled');
    }
  }, [settingsStore.isDarkMode]);

  return (
    <SafeContainer>
      <View style={styles.root}>
        <Button icon="switch" mode="contained" onPress={() => settingsStore.toggleDarkMode()}>
          Toggle Dark mode
        </Button>
      </View>
    </SafeContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default observer(SettingsScreen);
