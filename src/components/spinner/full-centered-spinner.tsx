import React, { FunctionComponent } from 'react';
import { FullCentered } from '../layout/full-centered';
import { ActivityIndicator } from 'react-native-paper';

export const FullCenteredSpinner: FunctionComponent = () => (
  <FullCentered>
    <ActivityIndicator />
  </FullCentered>
);
