import { Text } from 'react-native';

import { Container } from '~/components/safe-container';
import { FullCentered } from '~/components/full-centered';

export default function Home() {
  return (
    <Container>
      <FullCentered>
        <Text>Home Screen</Text>
      </FullCentered>
    </Container>
  );
}
