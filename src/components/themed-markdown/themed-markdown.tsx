import React, { type FunctionComponent } from 'react';

import Markdown, { ASTNode, MarkdownProps } from 'react-native-markdown-display';
import { SyntaxColoring } from '~/features/ai-feature-extraction/coding-guideline/syntax/syntax-coloring';
import { settingsStore } from '~/features/settings/settings.store';
import { markdownDarkTheme } from '~/theme/markdown-dark';

interface ThemedMarkdownProps extends MarkdownProps {
  markdownContent: string;
  language: string;
}

export const ThemedMarkdown: FunctionComponent<ThemedMarkdownProps> = ({
  markdownContent,
  language,
  ...props
}) => {
  const markdownStyle = settingsStore.isDarkMode ? markdownDarkTheme : undefined;

  const customRules = {
    fence: (node: ASTNode) => {
      return <SyntaxColoring key={node.key} language={language} code={node.content ?? ''} />;
    },
  };

  return (
    <Markdown style={markdownStyle} rules={customRules} {...props}>
      {markdownContent}
    </Markdown>
  );
};
