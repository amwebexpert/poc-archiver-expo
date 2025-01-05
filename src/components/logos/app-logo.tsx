import React, { FunctionComponent } from 'react';
import { Image } from 'react-native';

export interface AppLogoProps {
  size?: number;
}

export const AppLogo: FunctionComponent<AppLogoProps> = ({ size }) => (
  <Image
    style={{ height: size, width: size }}
    source={require('@assets/images/icon-transparent-background.png')}
  />
);
