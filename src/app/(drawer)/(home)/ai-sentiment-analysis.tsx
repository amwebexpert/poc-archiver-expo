import { Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import { Container } from '~/components/safe-container';
import { aiSentimentAnalysys } from '~/services/ai-sentiment-analysis.utils';

const TEXTS_TO_ANALYSE = [
  'I love transformers!',
  'I hate this food, not good at all!',
  'Ce plat était délicieux et le service était excellent!',
  'Ce plat était délicieux et le service excellent. Même si le prix est un peu élevé, ca en vallait la peine!',
];

export default function Profile() {
  const [textClassification, setTextClassification] = useState<string[]>();

  useEffect(() => {
    aiSentimentAnalysys(TEXTS_TO_ANALYSE).then(setTextClassification);
  }, []);

  return (
    <Container>
      <View style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        {TEXTS_TO_ANALYSE.map((text, index) => (
          <View key={text} style={{ marginBottom: 10 }}>
            <Text>{text}</Text>
            <Text>{textClassification?.[index] ?? ''}</Text>
          </View>
        ))}
      </View>
    </Container>
  );
}
