import React, { type FunctionComponent } from 'react';

import { observer } from 'mobx-react-lite';
import Markdown from 'react-native-markdown-display';
import { settingsStore } from '~/features/settings/settings.store';
import { markdownDarkTheme } from '~/theme/markdown-dark';

interface ThemedMarkdownProps {
  markdownContent: string;
}

export const ThemedMarkdown: FunctionComponent<ThemedMarkdownProps> = observer(
  ({ markdownContent }) => {
    const { isDarkMode } = settingsStore;
    const markdownStyle = isDarkMode ? markdownDarkTheme : undefined;

    return <Markdown style={markdownStyle}>{markdownContent}</Markdown>;
  }
);
