import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FunctionComponent, useEffect, useState } from 'react';
import { SafeContainer } from '~/components/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { isProgressStatusReady } from '~/features/ai-commons/transformer.types';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import { SentimentAnalyser } from '~/features/ai-sentiments/text-classification';
import { useAppTheme } from '~/theme/theme';

const TEXTS_TO_ANALYSE = [
  'I love transformers!',
  'I hate this food, not good at all!',
  'Ce plat était délicieux et le service était excellent!',
  'Ce plat était délicieux et le service excellent. Même si le prix est un peu élevé, ca en vallait la peine!',
];

const AiSentimentAnalysis: FunctionComponent = () => {
  const styles = useStyles();
  const { isLoading, setIsLoading, modelLoadingLogs, progressHandler } = useModelLoading();
  const [classifications, setClassifications] = useState<string[]>([]);

  const analyse = async (): Promise<string[]> => {
    const analyser = await SentimentAnalyser.getInstance(progressHandler);
    return analyser.analyse(TEXTS_TO_ANALYSE);
  };

  useEffect(() => {
    analyse().then(setClassifications);
  }, []);

  return (
    <SafeContainer style={styles.root}>
      {TEXTS_TO_ANALYSE.map((text, index) => {
        const score = classifications[index] ?? '';
        const result = score ? `→ ${score}` : '...';

        return (
          <View key={text} style={styles.classification}>
            <Text>{text}</Text>
            <Text>{result}</Text>
          </View>
        );
      })}

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
          modelLoadingLogs={modelLoadingLogs}
          onDismiss={() => setIsLoading(false)}
        />
      )}
    </SafeContainer>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
      margin: theme.spacing(2),
    },
    classification: {
      marginBottom: theme.spacing(2),
    },
  });
};

export default AiSentimentAnalysis;
