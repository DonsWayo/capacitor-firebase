declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseAnalytics: FirebaseAnalyticsPlugin;
  }
}

export interface FirebaseAnalyticsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
