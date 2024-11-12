import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { FullCentered } from '~/components/full-centered';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <FullCentered>
          <Text>Home</Text>
        </FullCentered>
      </Container>
    </>
  );
}
