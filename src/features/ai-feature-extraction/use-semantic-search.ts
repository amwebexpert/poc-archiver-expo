import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { ProgressCallback } from '../ai-commons/transformer.types';
import { collectOfflineGuidelines } from './coding-guideline/coding-guideline.utils';
import { FeatureExtractionEmbeddingsSearcher } from './ia/client-vector-searcher';

interface SemanticSearchParams {
  queryText: string;
  maxResults: number;
}

export const useSemanticSearch = (progressHandler: ProgressCallback) => {
  const [searchParams, setSearchParams] = useState<SemanticSearchParams>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['semantic-search', searchParams],
    queryFn: async () => {
      const rootNode = await collectOfflineGuidelines();
      const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher();
      await featureExtractionEmbeddingsSearcher.init(rootNode, progressHandler);
      await featureExtractionEmbeddingsSearcher.computeAllEmbeddings();

      return await featureExtractionEmbeddingsSearcher.findRelevantDocuments(searchParams);
    },
    enabled: !!searchParams,
    staleTime: Infinity,
  });

  return {
    results: data ?? [],
    isSearching: isLoading,
    isSearchError: error,
    search: (params: SemanticSearchParams) => setSearchParams(params),
  };
};
