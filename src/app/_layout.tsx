import '~/utils/polyfills';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import 'expo-dev-client';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
