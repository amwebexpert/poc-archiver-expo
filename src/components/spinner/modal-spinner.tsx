import React, { FunctionComponent, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';

export interface ModalSpinnerProps {
  isVisible: boolean;
  title?: ReactNode;
  description?: ReactNode;
  modelLoadingLogs: string[];
  onDismiss: () => void;
}

export const ModalSpinner: FunctionComponent<ModalSpinnerProps> = ({
  isVisible,
  title = 'Loading model',
  description = 'Please wait while translation models are loading... Only run once: next time will be faster!',
  modelLoadingLogs,
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

          <View style={styles.progressLogs}>
            {modelLoadingLogs.map((log) => (
              <Text numberOfLines={1} key={log} ellipsizeMode="tail" style={styles.progressLog}>
                {log}
              </Text>
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
    progressLogs: {
      height: 80,
      maxHeight: 80,
      overflow: 'scroll',
      marginVertical: 10,
      width: '100%',
    },
    progressLog: {
      color: theme.colors.secondary,
      width: '100%',
    },
  });
};
