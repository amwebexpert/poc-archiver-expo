import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeInLeft, ZoomIn } from 'react-native-reanimated';

import { toast } from 'sonner-native';
import { useAppTheme } from '~/theme/theme';

const AnimatedButton = Animated.createAnimatedComponent(Button);

const ToasterDemoScreen: FunctionComponent = () => {
  const theme = useAppTheme();
  const styles = useStyles();

  return (
    <Animated.View style={styles.container}>
      <AnimatedButton
        entering={ZoomIn.delay(300).duration(700)}
        icon="lightbulb-outline"
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => {
          toast('Hello, World!');
        }}
      >
        summer-native toast
      </AnimatedButton>
      <AnimatedButton
        entering={ZoomIn.delay(500).duration(700)}
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
      </AnimatedButton>
      <AnimatedButton
        entering={ZoomIn.delay(700).duration(700)}
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
      </AnimatedButton>
    </Animated.View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      gap: theme.spacing(0.5),
      paddingVertical: theme.spacing(1),
    },
  });
};

export default ToasterDemoScreen;
