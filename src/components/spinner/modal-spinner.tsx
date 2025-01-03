import React, { FunctionComponent, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';

export interface ModalSpinnerProps {
  isVisible: boolean;
  title: ReactNode;
  description: ReactNode;
  onDismiss: () => void;
}

export const ModalSpinner: FunctionComponent<ModalSpinnerProps> = ({
  isVisible,
  title,
  description,
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
  });
};
