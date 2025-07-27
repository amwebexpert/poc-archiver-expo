import React, { type FunctionComponent, type ReactNode } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';

interface PreTagProps {
  children: ReactNode;
  style?: ViewStyle;
  [key: string]: unknown;
}

export const PreTag: FunctionComponent<PreTagProps> = ({ children, style, ...props }) => (
  <ScrollView horizontal={true} style={style} {...props}>
    {children}
  </ScrollView>
);
