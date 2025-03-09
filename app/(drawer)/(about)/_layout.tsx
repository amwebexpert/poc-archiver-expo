import { Stack } from 'expo-router';
import { FunctionComponent } from 'react';

const AboutLayout: FunctionComponent = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="about" />
      <Stack.Screen name="network-logs" />
    </Stack>
  );
};

export default AboutLayout;
