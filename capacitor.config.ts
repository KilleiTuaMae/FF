import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Familia Financeira 3',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    hostname: 'localhost'
  }
};

export default config;
