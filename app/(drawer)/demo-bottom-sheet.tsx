import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/container';
import { FullCentered } from '~/components/full-centered';

export default function DemoBottomSheet() {
  return (
    <>
      <Stack.Screen options={{ title: 'Demo @gorhom/bottom-sheet' }} />

      <Container>
        <FullCentered>
          <Text>Info</Text>
        </FullCentered>
      </Container>
    </>
  );
}

