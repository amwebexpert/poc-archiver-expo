const packageJson = require('./package.json');

export default {
  expo: {
    name: packageJson.name,
    slug: packageJson.name,
    version: packageJson.version,
    scheme: packageJson.name,
    newArchEnabled: true,
    plugins: [
      'expo-router',
      'expo-asset',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#6aa563',
          image: './assets/icon.png',
          imageWidth: 100,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      icon: {
        light: './assets/icon.png',
        dark: './assets/icon.png',
        tinted: './assets/icon.png',
      },
      supportsTablet: true,
      bundleIdentifier: 'com.amwebexpert.pocarchiverexpo',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#6aa563',
      },
      package: 'com.amwebexpert.pocarchiverexpo',
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: '62af709a-d2e6-4cf9-9aaa-57126baef3bd',
      },
    },
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/62af709a-d2e6-4cf9-9aaa-57126baef3bd',
    },
  },
};
