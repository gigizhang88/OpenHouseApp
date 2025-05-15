import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.openhouse.app',
  appName: 'Open House App',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  ios: {
    contentInset: 'always',
    scheme: 'Open House App',
    backgroundColor: '#ffffff'
  }
};

export default config;
