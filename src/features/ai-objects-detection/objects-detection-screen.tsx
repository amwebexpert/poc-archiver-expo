import { useToggle } from '@uidotdev/usehooks';
import { LayoutRectangle, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { FunctionComponent, useEffect, useState } from 'react';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import { DetectedObjects } from '~/features/ai-objects-detection/detected-objects';
import { analyse } from '~/features/ai-objects-detection/objects-detection';
import { DetectedObject } from '~/features/ai-objects-detection/objects-detection.types';
import { useImagePicker } from '~/hooks/use-image-picker';
import { useAppTheme } from '~/theme/theme';

const DEFAULT_LAYOUT_RECT: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const ObjectsDetectionScreen: FunctionComponent = () => {
  const styles = useStyles();
  const { pickImage, selectedImage, hasSelectedImage, dimensions } = useImagePicker();

  const { isLoading, setIsLoading, modelLoadingLogs, progressHandler } = useModelLoading();
  const [isWorking, toggleWorking] = useToggle(false);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);

  useEffect(() => {
    setDetectedObjects([]);
  }, [selectedImage]);

  const onAnalysePress = async () => {
    if (!selectedImage) {
      return;
    }

    toggleWorking();

    try {
      const results = await analyse(selectedImage, progressHandler);
      setDetectedObjects(results);
    } catch (error) {
      console.error('Error analysing image:', error);
    } finally {
      toggleWorking(false);
    }
  };

  return (
    <SafeContainer style={styles.root}>
      <View style={styles.imageContainer}>
        <DetectedObjects
          selectedImage={selectedImage}
          aspectRatio={dimensions.aspectRatio}
          detectedObjects={detectedObjects}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          loading={isLoading}
          onPress={pickImage}
          disabled={isWorking || isLoading}
        >
          Pick image
        </Button>

        <Button
          mode="contained"
          loading={isWorking}
          onPress={onAnalysePress}
          disabled={isWorking || isLoading || !hasSelectedImage}
        >
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
    image: {
      position: 'relative',
      flex: 1,
      width: '100%',
    },
    boundingBox: {
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'red',
    },
    boundingBoxLabel: {
      position: 'absolute',
      backgroundColor: 'black',
      color: 'white',
      fontSize: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: theme.spacing(2),
    },
  });
};

export default ObjectsDetectionScreen; 