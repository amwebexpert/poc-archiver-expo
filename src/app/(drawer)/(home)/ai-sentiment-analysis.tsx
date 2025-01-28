import { useToggle } from '@uidotdev/usehooks';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { FunctionComponent, useState } from 'react';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
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
  const [isWorking, toggleWorking] = useToggle(false);
  const [classifications, setClassifications] = useState<string[]>([]);

  const onAnalysePress = async () => {
    toggleWorking();

    try {
      const analyser = await SentimentAnalyser.getInstance(progressHandler);
      analyser.analyse(TEXTS_TO_ANALYSE).then(setClassifications);
    } finally {
      toggleWorking(false);
    }
  };

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

      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={() => setClassifications([])}
          disabled={isWorking || isLoading}>
          Reset
        </Button>

        <Button
          mode="contained"
          loading={isLoading}
          onPress={onAnalysePress}
          disabled={isWorking || isLoading}>
          Analyse
        </Button>
      </View>

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
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: theme.spacing(2),
    },
  });
};

export default AiSentimentAnalysis;
