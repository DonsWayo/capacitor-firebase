declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseStorage: FirebaseStoragePlugin;
  }
}

export interface FirebaseStoragePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
