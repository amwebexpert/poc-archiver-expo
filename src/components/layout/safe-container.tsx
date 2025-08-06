import { FunctionComponent, PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAnimateOnFocus } from '~/hooks/use-animate-on-focus';

type SafeContainerProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export const SafeContainer: FunctionComponent<SafeContainerProps> = ({ children, style }) => {
  const isVisible = useAnimateOnFocus();
  if (!isVisible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.container, style]} entering={FadeInUp.duration(500)}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
