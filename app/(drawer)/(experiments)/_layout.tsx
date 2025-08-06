import { Stack } from 'expo-router';

export default function ExperimentsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="other-experiments" />
      <Stack.Screen name="webview-signature-pad" />
      <Stack.Screen name="native-signature-pad" />
    </Stack>
  );
}
