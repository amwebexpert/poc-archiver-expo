import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { FullCentered } from '~/components/full-centered';

export default function Info() {
  return (
    <>
      <Stack.Screen options={{ title: 'Info' }} />

      <Container>
        <FullCentered>
          <Text>Info</Text>
        </FullCentered>
      </Container>
    </>
  );
}

