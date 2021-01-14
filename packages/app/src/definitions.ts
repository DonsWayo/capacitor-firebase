declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseApp: FirebaseAppPlugin;
  }
}

export interface FirebaseAppPlugin {
  init(options: FirebaseInitConfig): Promise<boolean>;
}

export interface FirebaseInitConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}