import React, { type FunctionComponent } from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { settingsStore } from '~/features/settings/settings.store';
import dark from './styles/dark';
import light from './styles/light';
import { CodeTag } from './syntax-coloring-tag-code';
import { PreTag } from './syntax-coloring-tag-pre';
import { getMonospaceFont } from '~/utils/platform.utils';

interface SyntaxColoringProps {
  code: string;
  language: string;
}

export const SyntaxColoring: FunctionComponent<SyntaxColoringProps> = ({ code, language }) => {
  const style = settingsStore.isDarkMode ? dark : light;

  return (
    <SyntaxHighlighter 
      language={language} 
      style={style} 
      PreTag={PreTag} 
      CodeTag={CodeTag}
      fontFamily={getMonospaceFont()}
    >
      {code}
    </SyntaxHighlighter>
  );
};
