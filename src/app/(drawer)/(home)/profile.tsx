import { Text } from 'react-native';

import { Container } from '~/components/safe-container';
import { FullCentered } from '~/components/full-centered';

export default function Profile() {
  return (
    <Container>
      <FullCentered>
        <Text>Profile Screen</Text>
      </FullCentered>
    </Container>
  );
}
