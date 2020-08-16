declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseCrashlytics: FirebaseCrashlyticsPlugin;
  }
}

export interface FirebaseCrashlyticsPlugin {
  initCrashlytics(): Promise<any>
  logMessage(options: { message: string }): Promise<void | string>;
  setUserId(options: { userId: string }): Promise<void | string>;
  testCrash(): Promise<void | string>;
  setCustomValue(options: { forKey: string; value: any; type?: string; }): Promise<void | string>;
}
