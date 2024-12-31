import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { settingsStore } from '~/stores/settings.store';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={settingsStore.darkMode ? 'light-content' : 'dark-content'} />

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
