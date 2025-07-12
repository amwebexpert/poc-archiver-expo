import { useToggle } from '@uidotdev/usehooks';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { FunctionComponent, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeContainer } from '~/components/layout/safe-container';
import ScoreIndicator from '~/components/score-indicator/score-indicator';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useModelLoading } from '~/features/ai-commons/use-model-loading';
import {
  AugmentedScoreLabel,
  FRENCH_INSPECTION_REPORT,
  analyse,
} from '~/features/ai-sentiments/text-classification';
import { useAppTheme } from '~/theme/theme';

const SentimentAnalysisScreen: FunctionComponent = () => {
  const styles = useStyles();
  const [textsToAnalyse, setTextsToAnalyse] = useState<string[]>(FRENCH_INSPECTION_REPORT);

  const { isLoading, setIsLoading, filesProgress, progressHandler } = useModelLoading();
  const [isWorking, toggleWorking] = useToggle(false);
  const [classifications, setClassifications] = useState<AugmentedScoreLabel[]>([]);

  const onAnalysePress = async () => {
    toggleWorking();

    try {
      const results = await analyse(textsToAnalyse, progressHandler);
      setClassifications(results);
    } finally {
      toggleWorking(false);
    }
  };

  return (
    <SafeContainer style={styles.root}>
      <ScrollView contentContainerStyle={styles.container}>
        {textsToAnalyse.map((text, index) => {
          const scoreLabel = classifications[index] ?? '';
          const title = `Inspection ${index + 1}`;

          return (
            <Card key={text}>
              <Card.Content>
                <Text variant="titleLarge" style={styles.cardTitle}>
                  {title}
                </Text>
                <Text variant="bodyMedium">{text}</Text>
                <ScoreIndicator score={scoreLabel.percent} />
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>

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
          filesProgress={filesProgress}
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
      marginHorizontal: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    container: {
      gap: theme.spacing(2),
    },
    cardTitle: {
      marginBottom: theme.spacing(1),
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

export default SentimentAnalysisScreen; 