import { Image, LayoutChangeEvent, LayoutRectangle, StyleSheet, Text, View } from 'react-native';

import React, { Fragment, FunctionComponent, useState } from 'react';
import { DetectedObject } from '~/features/ai-objects-detection/objects-detection.types';
import { useAppTheme } from '~/theme/theme';

const DEFAULT_LAYOUT_RECT: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export interface DetectedObjectsProps {
  selectedImage?: string;
  aspectRatio: number;
  detectedObjects: DetectedObject[];
}

export const DetectedObjects: FunctionComponent<DetectedObjectsProps> = ({
  selectedImage,
  aspectRatio,
  detectedObjects,
}) => {
  const styles = useStyles();
  const { fontSize } = styles.boundingBoxLabel;

  const [imageLayout, setImageLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT_RECT);
  const imageHeight = imageLayout.width / aspectRatio;
  const imageTopY = (imageLayout.height - imageHeight) / 2;

  const onLayout = (event: LayoutChangeEvent) => setImageLayout(event.nativeEvent.layout);

  if (!selectedImage) {
    return null;
  }

  return (
    <>
      <Image
        source={{ uri: selectedImage }}
        resizeMode="contain"
        style={styles.image}
        onLayout={onLayout}
      />

      {detectedObjects.map(({ label, box }, index) => {
        const top = box.ymin * imageHeight + imageTopY;
        const left = box.xmin * imageLayout.width;
        const width = (box.xmax - box.xmin) * imageLayout.width;
        const height = (box.ymax - box.ymin) * imageHeight;

        return (
          <Fragment key={`${label}-${index}`}>
            <View style={[styles.boundingBox, { top, left, width, height }]} />
            <Text style={[styles.boundingBoxLabel, { top: top - fontSize, left }]}>{label}</Text>
          </Fragment>
        );
      })}
    </>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    image: {
      flex: 1,
      width: '100%',
      position: 'relative',
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
  });
};
