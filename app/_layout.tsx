import '~/utils/polyfills';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import 'expo-dev-client';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Toaster } from 'sonner-native';
import { SnackbarProvider } from '~/components/snack-bar/snackbar-provider';
import { settingsStore } from '~/features/settings/settings.store';
import { AppQueryProvider } from '~/store/app-query-provider';
import { DARK_THEME, LIGHT_THEME, NAVIGATION_DARK, NAVIGATION_LIGHT } from '~/theme/theme';

const RootLayout = () => {
  const { isDarkMode } = settingsStore;

  useEffect(() => {
    SplashScreen.setOptions({ duration: 3000, fade: true });
  }, []);

  return (
    <AppQueryProvider>
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

            <Toaster
              position="top-center"
              // offset={100}
              duration={3000}
              swipeToDismissDirection="up"
              visibleToasts={4}
              closeButton
              autoWiggleOnUpdate="toast-change"
              theme="system"
              icons={{ error: <Text>💥</Text>, loading: <Text>🔄</Text> }}
              toastOptions={{ actionButtonStyle: { paddingHorizontal: 20 } }}
              pauseWhenPageIsHidden
            />
          </GestureHandlerRootView>
        </ThemeProvider>
      </PaperProvider>
    </AppQueryProvider>
  );
};

export const styles = StyleSheet.create({ container: { flex: 1 } });

export default observer(RootLayout);
