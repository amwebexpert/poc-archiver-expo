import { Text } from 'react-native';

import { useEffect, useState } from 'react';
import { FullCentered } from '~/components/full-centered';
import { Container } from '~/components/safe-container';
import { sentimentAnalysisAsString } from '~/services/text-classification';

export default function Profile() {
  const [textClassification, setTextClassification] = useState('');
  const textToAnalyse = 'I love transformers!';
  const textToAnalyse2 = 'I hate this food, not good at all!';

  useEffect(() => {
    sentimentAnalysisAsString(textToAnalyse2).then(setTextClassification);
  }, []);

  return (
    <Container>
      <FullCentered>
        <Text>Profile Screen</Text>
        <Text>{textClassification}</Text>
      </FullCentered>
    </Container>
  );
}
