declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseCloudMessaging: FirebaseCloudMessagingPlugin;
  }
}

export interface FirebaseCloudMessagingPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  subscribeToTopic(options: { name: string }): Promise<{ message: string }>;
  unsubscribeFromTopic(options: { name: string }): Promise<{ message: string }>;
  getToken(): Promise<string>;
  initMessaging(key?: string, webContents?: any): Promise<boolean> | void;
}
