import { ProgressCallback } from '~/features/ai-commons/transformer.types';
import { collectOfflineGuidelines } from '../coding-guideline/coding-guideline.utils';
import { FeatureExtractionEmbeddingsSearcher } from './client-vector-searcher';

export const SAMPLE_QUERIES = [
  'ternary abuse',
  'many args position',
  'multiple values comparison',
  'complex React component using many conditional render in template',
];

export const simpleTest = async (progressHandler: ProgressCallback) => {
  const rootNode = await collectOfflineGuidelines();

  const featureExtractionEmbeddingsSearcher = new FeatureExtractionEmbeddingsSearcher();
  await featureExtractionEmbeddingsSearcher.init(rootNode, progressHandler);
  await featureExtractionEmbeddingsSearcher.computeAllEmbeddings();

  const maxResults = 5;
  for (const queryText of SAMPLE_QUERIES) {
    const rules = await featureExtractionEmbeddingsSearcher.findRelevantDocuments({
      queryText,
      maxResults,
    });

    if (!rules.length) {
      console.info(`====>>> no match for "${queryText}"`);
      continue;
    }

    console.info(
      `====>>> best ${maxResults} matches for "${queryText}"`,
      JSON.stringify(
        rules.map((rule) => rule.title),
        null,
        2
      )
    );
  }
};
