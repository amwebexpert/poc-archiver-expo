import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { toast } from 'sonner-native';
import { useAppTheme } from '~/theme/theme';

const ToasterDemoScreen: FunctionComponent = () => {
  const theme = useAppTheme();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Button
        icon="lightbulb-outline"
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => {
          toast('Hello, World!');
        }}
      >
        summer-native toast
      </Button>
      <Button
        icon="android-messages"
        mode="contained"
        buttonColor="orange"
        onPress={() => {
          toast.warning('Warning', {
            description: 'Your changes wont be saved',
            richColors: true,
          });
        }}
      >
        warn toast
      </Button>
      <Button
        icon="chat-alert-outline"
        mode="contained"
        buttonColor={theme.colors.error}
        onPress={() => {
          toast.error('Error', {
            description: 'An unexpected error occurred',
            richColors: true,
          });
        }}
      >
        error toast
      </Button>
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      gap: theme.spacing(1),
      paddingVertical: theme.spacing(1),
    },
  });
};

export default ToasterDemoScreen;
