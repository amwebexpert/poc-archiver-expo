import { useToggle } from '@uidotdev/usehooks';
import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeOut, StretchInX } from 'react-native-reanimated';
import { ThemedMarkdown } from '~/components/themed-markdown/themed-markdown';
import { useAppTheme } from '~/theme/theme';
import { Rule } from './models';

interface RuleDisplayProps {
  rule: Rule;
}

const RuleDisplay: FunctionComponent<RuleDisplayProps> = ({ rule }) => {
  const styles = useStyles();
  const [isExpanded, toggleExpanded] = useToggle();

  return (
    <View style={styles.resultItem}>
      <Button
        mode="text"
        onPress={() => toggleExpanded()}
        icon={isExpanded ? 'chevron-up' : 'chevron-down'}
        contentStyle={styles.buttonContent}
      >
        {rule.title}
      </Button>

      {isExpanded && (
        <Animated.View style={styles.expandedContent} entering={StretchInX} exiting={FadeOut}>
          <ThemedMarkdown markdownContent={rule.content} />
        </Animated.View>
      )}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    resultItem: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.outline,
    },
    buttonContent: {
      justifyContent: 'flex-start',
    },
    expandedContent: {
      paddingBottom: theme.spacing(2),
    },
  });
};

export default RuleDisplay;
