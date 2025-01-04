import { FlashList } from '@shopify/flash-list';
import React, { FunctionComponent } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

import { useAppTheme } from '~/theme/theme';
import { parseLicenceData } from '~/utils/licences.utils';

export const LibrariesList: FunctionComponent = () => {
  const styles = useStyles();
  const data = parseLicenceData();

  return (
    <>
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
    </>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    paragraph: {
      width: '100%',
    },
  });
};
