import { FlashList } from '@shopify/flash-list';
import * as Updates from 'expo-updates';
import { FunctionComponent } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { Button, Card, List, Text, useTheme } from 'react-native-paper';

import { SafeContainer } from '~/components/safe-container';
import { useUpdates } from '~/hooks/use-updates';
import { AppTheme } from '~/theme/theme';
import { parseLicenceData } from '~/utils/licences.utils';

import { APP_VERSION_INFO } from '~/constants';

const { DISPLAY_NAME, DESCRIPTION } = APP_VERSION_INFO;

const AboutScreen: FunctionComponent = () => {
  const styles = useStyles();
  const data = parseLicenceData();
  const { runTypeMessage, isUpdateAvailable } = useUpdates();

  return (
    <SafeContainer style={styles.root}>
      <Card>
        <Card.Title
          title={DISPLAY_NAME}
          subtitle={DESCRIPTION}
          left={() => (
            <Image
              style={{ height: 48, width: 48 }}
              source={require('../../../assets/adaptive-icon.png')}
            />
          )}
        />

        <Card.Content>
          <Text style={styles.paragraph}>{runTypeMessage}</Text>
        </Card.Content>

        <Card.Actions>
          <Button mode="contained" icon="refresh" onPress={Updates.checkForUpdateAsync}>
            Check
          </Button>

          {isUpdateAvailable || true && (
            <Button
              mode="contained"
              icon="briefcase-download-outline"
              onPress={Updates.fetchUpdateAsync}>
              Apply update
            </Button>
          )}
        </Card.Actions>
      </Card>

      <Text style={styles.paragraph}>Open source dependencies:</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={`${item.version} [${item.licenceType} licence]`}
            onPress={() => Linking.openURL(item.repository)}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        )}
        estimatedItemSize={data.length}
      />
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useTheme() as AppTheme;

  return StyleSheet.create({
    root: {
      margin: theme.spacing(2),
      gap: theme.spacing(2),
    },
    paragraph: {
      alignSelf: 'center',
      marginVertical: theme.spacing(2),
    },
  });
};

export default AboutScreen;
