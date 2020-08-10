declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseApp: FirebaseAppPlugin;
  }
}

export interface FirebaseAppPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
