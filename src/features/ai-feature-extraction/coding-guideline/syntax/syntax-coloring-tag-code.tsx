import React, { type FunctionComponent, type ReactNode } from 'react';
import { ScrollView, Text, type TextStyle } from 'react-native';

interface CodeTagProps {
  children: ReactNode;
  style?: TextStyle;
  [key: string]: unknown;
}

export const CodeTag: FunctionComponent<CodeTagProps> = ({ children, style, ...props }) => {
  return (
    <ScrollView horizontal={true}>
      <Text style={style} {...props}>
        {children}
      </Text>
    </ScrollView>
  );
};
