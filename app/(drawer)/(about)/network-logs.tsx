import { observer } from 'mobx-react-lite';
import React, { FunctionComponent } from 'react';
import NetworkLogger from 'react-native-network-logger';
import { settingsStore } from '~/features/settings/settings.store';

const NetworkLogsScreen: FunctionComponent = observer(() => {
  const { isDarkMode } = settingsStore;

  return <NetworkLogger theme={isDarkMode ? 'dark' : 'light'} />;
});

export default NetworkLogsScreen;
