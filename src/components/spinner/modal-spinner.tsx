import React, { FunctionComponent, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, ProgressBar, Text } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';

export interface ModalSpinnerProps {
  isVisible: boolean;
  title?: ReactNode;
  description?: ReactNode;
  filesProgress: Record<string, number>;
  onDismiss: () => void;
}

export const ModalSpinner: FunctionComponent<ModalSpinnerProps> = ({
  isVisible,
  title = 'Loading model',
  description = 'Please wait while translation models are loading... Only run once: next time will be faster!',
  filesProgress,
  onDismiss,
}) => {
  const styles = useStyles();

  if (!isVisible) {
    return null;
  }

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>

        <Dialog.Content>
          <ActivityIndicator style={styles.spinner} />
          <Text>{description}</Text>

          <View style={styles.progressContainer}>
            {Object.entries(filesProgress)
              .map(([fileName, progress]) => (
                <View key={fileName} style={styles.progressItem}>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    {`${Math.round(progress * 100)}% - ${fileName}`}
                  </Text>
                  <ProgressBar progress={progress} />
                </View>
              ))}
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    title: {
      textAlign: 'center',
    },
    spinner: {
      marginVertical: theme.spacing(3),
    },
    progressContainer: {
      marginVertical: theme.spacing(2),
      minHeight: 180,
      gap: theme.spacing(1),
    },
    progressItem: {
      gap: theme.spacing(0.5),
    },
  });
};
