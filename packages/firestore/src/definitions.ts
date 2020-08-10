declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseFirestore: FirebaseFirestorePlugin;
  }
}

export interface FirebaseFirestorePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
