declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseCloudMessaging: FirebaseCloudMessagingPlugin;
  }
}

export interface FirebaseCloudMessagingPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
