export type GuidelineNode = {
  level: number;
  title: string;
  titleMarkdown: string;
  href: string;
  markdownLines: string[];
  children: GuidelineNode[];

  parent?: GuidelineNode;
  isMatching?: boolean;
  shouldDisplayNode?: boolean;
};
export type TocLink = {
  title: string;
  href: string;
};

export type ComputedEmbeddingsStats = {
  isCompleted: boolean;
  total: number;
  completed: number;
  nextRuleTitle: string;
};

export type EmbeddingVector = number[];

export type Rule = {
  title: string;
  content: string;
  href: string;
  embedding?: EmbeddingVector;
  similarity?: number;
};

export type SerializedRule = {
  href: string;
  contentSha256: number;
  embedding: EmbeddingVector;
};
