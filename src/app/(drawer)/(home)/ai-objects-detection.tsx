import { useToggle } from '@uidotdev/usehooks';
import { Image, LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import { ImageObjectsDetector } from '~/features/ai-objects-detection/objects-detection';
import { DetectedObject } from '~/features/ai-objects-detection/objects-detection.types';
import { useImagePicker } from '~/hooks/use-image-picker';
import { useAppTheme } from '~/theme/theme';

const DEFAULT_LAYOUT_RECT: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const ObjectsDetection: FunctionComponent = () => {
  const styles = useStyles();
  const { pickImage, selectedImage, hasSelectedImage, dimensions } = useImagePicker();

  const [imageLayout, setImageLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT_RECT);
  const imageHeight = imageLayout.width / dimensions.aspectRatio;
  const imageTopY = (imageLayout.height - imageHeight) / 2;

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
      const analyser = await ImageObjectsDetector.getInstance(progressHandler);
      const results = await analyser.analyse(selectedImage);
      setDetectedObjects(results);
    } catch (error) {
      console.error('Error analysing image:', error);
    } finally {
      toggleWorking(false);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => setImageLayout(event.nativeEvent.layout);

  return (
    <SafeContainer style={styles.root}>
      <View style={styles.imageContainer}>
        {!!selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            resizeMode="contain"
            style={styles.image}
            onLayout={onLayout}
          />
        )}

        {detectedObjects.map(({ label, box }, index) => {
          const top = box.ymin * imageHeight + imageTopY;
          const left = box.xmin * imageLayout.width;
          const width = (box.xmax - box.xmin) * imageLayout.width;
          const height = (box.ymax - box.ymin) * imageHeight;

          return (
            <Fragment key={`${label}-${index}`}>
              <View style={[styles.boundingBox, { top, left, width, height }]} />
              <Text style={[styles.boundingBoxLabel, { top: top - 12, left }]}>{label}</Text>
            </Fragment>
          );
        })}
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
          disabled={isWorking || isLoading || !hasSelectedImage}>
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

export default ObjectsDetection;
