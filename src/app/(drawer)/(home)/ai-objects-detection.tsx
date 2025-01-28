import { useToggle } from '@uidotdev/usehooks';
import { Image, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { FunctionComponent, useState } from 'react';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import { ImageObjectsDetector } from '~/features/ai-objects-detection/objects-detection';
import { useImagePicker } from '~/hooks/use-image-picker';
import { useAppTheme } from '~/theme/theme';

const ObjectsDetection: FunctionComponent = () => {
  const styles = useStyles();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const { pickImage, selectedImage, dimensions } = useImagePicker();

  const { isLoading, setIsLoading, modelLoadingLogs, progressHandler } = useModelLoading();
  const [isWorking, toggleWorking] = useToggle(false);

  const onAnalysePress = async () => {
    toggleWorking();

    try {
      const analyser = await ImageObjectsDetector.getInstance(progressHandler);
      await analyser.analyse('');
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
          mode="outlined"
          loading={isLoading}
          onPress={pickImage}
          disabled={isWorking || isLoading}>
          Pick image
        </Button>

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
