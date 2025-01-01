import { FlashList } from '@shopify/flash-list';
import * as Updates from 'expo-updates';
import { FunctionComponent } from 'react';
import { Image, Linking, StyleSheet } from 'react-native';
import { Button, Card, List, Text } from 'react-native-paper';

import { SafeContainer } from '~/components/safe-container';
import { useUpdates } from '~/hooks/use-updates';
import { useAppTheme } from '~/theme/theme';
import { parseLicenceData } from '~/utils/licences.utils';

import { APP_VERSION_INFO } from '~/constants';

const { DISPLAY_NAME, DESCRIPTION } = APP_VERSION_INFO;

const AboutScreen: FunctionComponent = () => {
  const styles = useStyles();
  const data = parseLicenceData();
  const { runTypeMessage, isUpdateAvailable } = useUpdates();

  return (
    <SafeContainer style={styles.root}>
      <Card contentStyle={styles.card}>
        <Card.Title
          title={DISPLAY_NAME}
          subtitle={DESCRIPTION}
          left={() => (
            <Image
              style={{ height: 40, width: 40 }}
              source={require('../../../assets/adaptive-icon.png')}
            />
          )}
        />

        <Card.Content>
          <Text style={styles.paragraph}>{runTypeMessage}</Text>
        </Card.Content>

        <Card.Actions>
          <Button mode="outlined" icon="refresh" onPress={Updates.checkForUpdateAsync}>
            Check
          </Button>

          {isUpdateAvailable ||
            (true && (
              <Button
                mode="outlined"
                icon="briefcase-download-outline"
                onPress={Updates.fetchUpdateAsync}>
                Apply update
              </Button>
            ))}
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
      alignSelf: 'center',
      marginVertical: theme.spacing(2),
    },
  });
};

export default AboutScreen;
