declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseAnalytics: FirebaseAnalyticsPlugin;
  }
}

export interface FirebaseAnalyticsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  analytics(): Promise<boolean>
  logEvent(options: { name: string; params: object }): Promise<void>;
  setUserId(options: { userId: string }): Promise<void>;
  reset(): Promise<void>;
}
