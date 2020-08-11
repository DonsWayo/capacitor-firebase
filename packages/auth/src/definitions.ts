declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseAuth: FirebaseAuthPlugin;
  }
}

export interface FirebaseAuthPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
