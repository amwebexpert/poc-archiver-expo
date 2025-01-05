import { FunctionComponent, PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';

type SafeContainerProps = PropsWithChildren<{
  style?: ViewStyle;
}>;

export const SafeContainer: FunctionComponent<SafeContainerProps> = ({ children, style }) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
