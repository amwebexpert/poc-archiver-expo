import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useAppTheme } from '~/theme/theme';
import { getColorForPercentage } from './score-indicator.utils';

interface ScoreIndicatorProps {
  score?: number;
}

const ScoreIndicator: FunctionComponent<ScoreIndicatorProps> = ({ score }) => {
  const styles = useStyles();

  if (score === undefined || score === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ProgressBar
        progress={score}
        color={getColorForPercentage(score)}
        style={styles.progressBar}
      />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      marginVertical: theme.spacing(2),
    },
    text: {
      fontSize: 18,
      marginBottom: theme.spacing(1),
    },
    progressBar: {
      width: '100%',
      height: 10,
      borderRadius: theme.roundness,
    },
  });
};

export default ScoreIndicator;
