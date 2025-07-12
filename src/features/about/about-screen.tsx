import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { SafeContainer } from '~/components/layout/safe-container';
import { useUpdates } from '~/hooks/use-updates';
import { useAppTheme } from '~/theme/theme';

import { router } from 'expo-router';
import { AppLogo } from '~/components/logos/app-logo';
import { APP_VERSION_INFO } from '~/constants';
import { AboutDetails } from '~/features/about/about.details';
import { LibrariesList } from '~/features/about/libraries-list';

const { DISPLAY_NAME, DESCRIPTION } = APP_VERSION_INFO;

const AboutScreen: FunctionComponent = () => {
  const styles = useStyles();
  const { runTypeMessage, isUpdateAvailable, checkForUpdates, isLoading, fetchAndApplyUpdate } =
    useUpdates();

  return (
    <SafeContainer style={styles.root}>
      <Card contentStyle={styles.card}>
        <Card.Title title={DISPLAY_NAME} subtitle={DESCRIPTION} left={({ size }) => <AppLogo size={size} />} />

        <Card.Content>
          <AboutDetails />
          <Text style={styles.paragraph}>{runTypeMessage}</Text>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="outlined"
            onPress={() => router.push('/(drawer)/(about)/network-logs')}
            icon="network"
          >
            Http
          </Button>

          <Button mode="outlined" icon="refresh" onPress={checkForUpdates} loading={isLoading}>
            Check
          </Button>

          {isUpdateAvailable && (
            <Button
              mode="outlined"
              icon="briefcase-download-outline"
              loading={isLoading}
              onPress={fetchAndApplyUpdate}
            >
              Apply
            </Button>
          )}
        </Card.Actions>
      </Card>

      <LibrariesList />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      margin: theme.spacing(2),
      gap: theme.spacing(2),
    },
    container: {
      flex: 1,
    },
    card: {
      padding: theme.spacing(2),
    },
    paragraph: {
      width: '100%',
      textAlign: 'center',
      marginVertical: theme.spacing(2),
    },
  });
};

export default AboutScreen; 