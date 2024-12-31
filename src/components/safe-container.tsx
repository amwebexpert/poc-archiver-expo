import { FunctionComponent, PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export const SafeContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
