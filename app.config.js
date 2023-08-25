export default {
  expo: {
    name: 'Be Saints',
    slug: 'besaints',
    package: 'be.saints.client',
    version: '0.0.5.0',
    orientation: 'portrait',
    icon: './assets/applogo.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {},
      bundleIdentifier: 'be.saints.client',
    },
    notification: {
      icon: './assets/notiflogo.png',
    },
    android: {
      googleServicesFile: './google-services.json',
      package: 'be.saints.client',
      versionCode: 32,
      adaptiveIcon: {
        backgroundImage: './assets/applogo.png',
        foregroundImage: './assets/applogo.png',
        backgroundColor: '#ffffff00',
      },
      permissions: ['NOTIFICATIONS'],
    },
    extra: {
      eas: {
        projectId: '60078d31-0462-4957-90c7-33c2afdc19c7',
      },
    },
  },
}
