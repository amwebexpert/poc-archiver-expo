import React, { PropsWithChildren, type FunctionComponent } from 'react';
import { View } from 'react-native';

export const FullCentered: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{children}</View>
);
