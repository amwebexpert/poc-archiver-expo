import { Stack } from 'expo-router';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { FullCentered } from '~/components/full-centered';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Container>
        <FullCentered>
          <Text>Profile</Text>
        </FullCentered>
      </Container>
    </>
  );
}
