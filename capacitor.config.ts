import { CapacitorConfig } from '@capacitor/cli';
import ip from 'ip';

let config: CapacitorConfig;

const hotReloadConfig: CapacitorConfig['server'] = {
  cleartext: true,
  url: `http://${ip.address()}:8000`,
  allowNavigation: ['*'],
};

const baseConfig: CapacitorConfig = {
  appId: 'com.rocketmakers.boilerplate',
  appName: 'Rocketmakers Mobile Boilerplate',
  webDir: 'www',
  ios: { scheme: 'App Dev', scrollEnabled: false },
  android: { flavor: 'dev' },
  bundledWebRuntime: false,
};

switch (process.env.ENV) {
  case 'staging':
    config = {
      ...baseConfig,
      appId: 'com.rocketmakers.boilerplate.staging',
      ios: {
        scheme: 'Staging',
        scrollEnabled: false,
      },
      android: {
        flavor: 'staging',
      },
    };
    break;
  case 'prod':
    config = {
      ...baseConfig,
      appId: 'com.rocketmakers.boilerplate',
      ios: {
        scheme: 'Prod',
        scrollEnabled: false,
      },
      android: {
        flavor: 'production',
      },
    };
    break;
  default:
    config = {
      ...baseConfig,
      appId: 'com.rocketmakers.boilerplate.dev',
      ios: {
        scheme: 'App',
        scrollEnabled: false,
      },
      android: {
        flavor: 'dev',
      },
    };
    break;
}

export default { ...config, server: process.env.ENABLE_HOT_RELOAD ? hotReloadConfig : {} };
