import {
  DarkTheme as DarkNavigationTheme,
  DefaultTheme as LightNavigationTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

const DEFAULT_SPACING: number = 8;
const spacing = (units: number = 1): number => units * DEFAULT_SPACING;

const roundness = 2;

export const DARK_THEME = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
  spacing,
  roundness,
};

export const LIGHT_THEME = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
  spacing,
  roundness,
};

export type AppTheme = typeof DARK_THEME;

// React Navigation themes
const navigationAdaptedThemes = adaptNavigationTheme({
  reactNavigationLight: LightNavigationTheme,
  reactNavigationDark: DarkNavigationTheme,
  materialLight: LIGHT_THEME,
  materialDark: DARK_THEME,
});

const { DarkTheme, LightTheme } = navigationAdaptedThemes;
export const NAVIGATION_DARK = { ...DarkTheme, fonts: { ...DarkNavigationTheme.fonts } };
export const NAVIGATION_LIGHT = { ...LightTheme, fonts: { ...LightNavigationTheme.fonts } };
