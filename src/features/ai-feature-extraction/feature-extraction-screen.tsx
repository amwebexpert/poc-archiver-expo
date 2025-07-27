import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';

import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeContainer } from '~/components/layout/safe-container';
import { ModalSpinner } from '~/components/spinner/modal-spinner';
import { useAppTheme } from '~/theme/theme';
import { useModelLoading } from '../ai-commons/use-model-loading';
import RuleDisplay from './rule-display';
import { useSemanticSearch } from './use-semantic-search';

const MAX_RESULTS = 5;

const FeatureExtractionScreen: FunctionComponent = observer(() => {
  const styles = useStyles();

  const { isLoading, setIsLoading, filesProgress, progressHandler } = useModelLoading();
  const { results, isSearching, search } = useSemanticSearch(progressHandler);

  const [queryText, setQueryText] = useState('multiple ternary operators usage');

  const onSemanticSearch = () => search({ queryText, maxResults: MAX_RESULTS });

  return (
    <SafeContainer style={styles.root}>
      <View style={styles.searchRow}>
        <TextInput
          mode="outlined"
          placeholder="Enter search query..."
          value={queryText}
          onChangeText={setQueryText}
          style={styles.searchInput}
          disabled={isSearching || isLoading}
          onSubmitEditing={onSemanticSearch}
          returnKeyType="search"
          multiline={false}
          right={
            queryText.length > 0 ? (
              <TextInput.Icon
                icon="close"
                onPress={() => setQueryText('')}
                disabled={isSearching || isLoading}
              />
            ) : undefined
          }
        />
        <IconButton
          icon="magnify"
          mode="contained"
          onPress={onSemanticSearch}
          disabled={isSearching || isLoading}
          loading={isSearching || isLoading}
        />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {results.length > 0 && (
          <View style={styles.resultsContainer}>
            {results.map((rule) => (
              <RuleDisplay key={rule.href} rule={rule} />
            ))}
          </View>
        )}
      </ScrollView>

      {isLoading && (
        <ModalSpinner
          isVisible={isLoading}
          filesProgress={filesProgress}
          onDismiss={() => setIsLoading(false)}
        />
      )}
    </SafeContainer>
  );
});

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      marginTop: theme.spacing(2),
    },
    container: {
      marginHorizontal: theme.spacing(2),
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: theme.spacing(2),
      marginVertical: theme.spacing(2),
    },
    resultsContainer: {
      gap: theme.spacing(0.5),
    },
    searchInput: {
      flex: 1,
      marginRight: theme.spacing(1),
    },
  });
};

export default FeatureExtractionScreen;
