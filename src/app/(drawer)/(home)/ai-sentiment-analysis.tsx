import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useEffect, useState } from 'react';
import { FullCenteredSpinner } from '~/components/spinner/full-centered-spinner';
import { SafeContainer } from '~/components/safe-container';
import { isProgressStatusReady } from '~/features/ai-commons/transformer.types';
import { aiSentimentAnalysys } from '~/features/ai-sentiments/ai-sentiment-analysis.utils';

const TEXTS_TO_ANALYSE = [
  'I love transformers!',
  'I hate this food, not good at all!',
  'Ce plat était délicieux et le service était excellent!',
  'Ce plat était délicieux et le service excellent. Même si le prix est un peu élevé, ca en vallait la peine!',
];

export default function AiSentimentAnalysis() {
  const [isReady, setIsReady] = useState(false);
  const [textClassification, setTextClassification] = useState<string[]>([]);

  useEffect(() => {
    aiSentimentAnalysys({
      texts: TEXTS_TO_ANALYSE,
      progressHandler: (progress) => {
        setIsReady(isProgressStatusReady(progress));
      },
    }).then(setTextClassification);
  }, []);

  if (!isReady) {
    return <FullCenteredSpinner />;
  }

  return (
    <SafeContainer>
      <View style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
        {TEXTS_TO_ANALYSE.map((text, index) => {
          const score = textClassification[index] ?? '';
          const result = score ? `→ ${score}` : '...';

          return (
            <View key={text} style={{ marginBottom: 20 }}>
              <Text>{text}</Text>
              <Text>{result}</Text>
            </View>
          );
        })}
      </View>
    </SafeContainer>
  );
}
