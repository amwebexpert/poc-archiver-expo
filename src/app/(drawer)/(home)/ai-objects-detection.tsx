import { useToggle } from '@uidotdev/usehooks';
import { StyleSheet, View, Image, useWindowDimensions, LayoutChangeEvent } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { FunctionComponent, useState } from 'react';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useAppTheme } from '~/theme/theme';

const ObjectsDetection: FunctionComponent = () => {
  const styles = useStyles();
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modelLoadingLogs = [''];

  const [isWorking, toggleWorking] = useToggle(false);

  const onAnalysePress = async () => {
    toggleWorking();

    try {
      // TODO
    } finally {
      toggleWorking(false);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => setMaxHeight(event.nativeEvent.layout.height);

  return (
    <SafeContainer style={styles.root}>
      <View onLayout={onLayout} style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/800' }}
          resizeMode="contain"
          height={maxHeight}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          loading={isLoading}
          onPress={onAnalysePress}
          disabled={isWorking || isLoading}>
          Analyse
        </Button>
      </View>

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
          modelLoadingLogs={modelLoadingLogs}
          onDismiss={() => setIsLoading(false)}
        />
      )}
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    cardTitle: {
      marginBottom: theme.spacing(1),
    },
    imageContainer: {
      flex: 1,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: theme.spacing(2),
    },
  });
};

export default ObjectsDetection;
