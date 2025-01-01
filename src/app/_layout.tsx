import '~/utils/polyfills';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SnackbarProvider } from '~/components/snack-bar/snackbar-provider';
import { settingsStore } from '~/features/settings/settings.store';
import { DARK_THEME, LIGHT_THEME, NAVIGATION_DARK, NAVIGATION_LIGHT } from '~/theme/theme';
import * as SplashScreen from 'expo-splash-screen';

const RootLayout = () => {
  const { isDarkMode } = settingsStore;

  useEffect(() => {
    SplashScreen.setOptions({ duration: 3000, fade: true });
  }, []);

  return (
    <PaperProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <ThemeProvider value={isDarkMode ? NAVIGATION_DARK : NAVIGATION_LIGHT}>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <SnackbarProvider>
              <Stack>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              </Stack>
            </SnackbarProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </PaperProvider>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(RootLayout);
