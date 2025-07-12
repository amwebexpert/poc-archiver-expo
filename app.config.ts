import packageJson from './package.json';
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: packageJson.name,
  slug: packageJson.name,
  version: packageJson.version,
  scheme: packageJson.name,
  newArchEnabled: true,
  plugins: [
    [
      'expo-router',
      {
        origin: 'http://localhost:8081',
      },
    ],
    'expo-asset',
    [
      'expo-splash-screen',
      { backgroundColor: '#6aa563', image: './assets/images/icon.png', imageWidth: 100 },
    ],
  ],
  experiments: { typedRoutes: true, tsconfigPaths: true },
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: { image: './assets/images/splash.png' },
  assetBundlePatterns: ['**/*'],
  ios: {
    icon: {
      light: './assets/images/icon.png',
      dark: './assets/images/icon.png',
      tinted: './assets/images/icon.png',
    },
    supportsTablet: true,
    bundleIdentifier: 'com.amwebexpert.pocarchiverexpo',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#6aa563',
    },
    package: 'com.amwebexpert.pocarchiverexpo',
  },
  web: {
    output: 'server',
  },
  extra: {
    router: { origin: false },
    eas: { projectId: '62af709a-d2e6-4cf9-9aaa-57126baef3bd' },
  },
  runtimeVersion: { policy: 'appVersion' },
  updates: { url: 'https://u.expo.dev/62af709a-d2e6-4cf9-9aaa-57126baef3bd' },
};

export default config;
