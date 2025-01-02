import * as Updates from 'expo-updates';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { SafeContainer } from '~/components/safe-container';
import { useUpdates } from '~/hooks/use-updates';
import { useAppTheme } from '~/theme/theme';

import { AppLogo } from '~/components/logos/app-logo';
import { APP_VERSION_INFO } from '~/constants';
import { AboutDetails } from '~/features/about/about.details';
import { LibrariesList } from '~/features/about/libraries-list';

const { DISPLAY_NAME, DESCRIPTION } = APP_VERSION_INFO;

const AboutScreen: FunctionComponent = () => {
  const styles = useStyles();
  const { runTypeMessage, isUpdateAvailable } = useUpdates();

  return (
    <SafeContainer style={styles.root}>
      <Card contentStyle={styles.card}>
        <Card.Title title={DISPLAY_NAME} subtitle={DESCRIPTION} left={AppLogo} />

        <Card.Content>
          <AboutDetails />
          <Text style={styles.paragraph}>{runTypeMessage}</Text>
        </Card.Content>

        <Card.Actions>
          <Button mode="outlined" icon="refresh" onPress={Updates.checkForUpdateAsync}>
            Check
          </Button>

          {isUpdateAvailable && (
            <Button
              mode="outlined"
              icon="briefcase-download-outline"
              onPress={Updates.fetchUpdateAsync}>
              Apply update
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
