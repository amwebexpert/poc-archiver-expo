import { FlashList } from '@shopify/flash-list';
import * as Updates from 'expo-updates';
import { FunctionComponent } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, List, Text, useTheme } from 'react-native-paper';

import { SafeContainer } from '~/components/safe-container';
import { useUpdates } from '~/hooks/use-updates';
import { AppTheme } from '~/theme/theme';
import { parseLicenceData } from '~/utils/licences.utils';

const AboutScreen: FunctionComponent = () => {
  const styles = useStyles();
  const data = parseLicenceData();
  const { runTypeMessage, isUpdateAvailable } = useUpdates();

  return (
    <SafeContainer>
      <Text style={{ textAlign: 'center' }}>{runTypeMessage}</Text>

      <Button mode="contained" onPress={Updates.checkForUpdateAsync}>
        Check manually for updates
      </Button>

      {isUpdateAvailable && (
        <Button mode="contained" onPress={Updates.fetchUpdateAsync}>
          Download and run update
        </Button>
      )}

      <View style={styles.paragraph}>
        <Text>Open source dependencies:</Text>
      </View>

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
    paragraph: {
      textAlign: 'center',
      marginVertical: theme.spacing(2),
    },
  });
};

export default AboutScreen;
