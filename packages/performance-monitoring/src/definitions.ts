declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebasePerformanceMonitoring: FirebasePerformanceMonitoringPlugin;
  }
}

export interface FirebasePerformanceMonitoringPlugin {
  init(): Promise<boolean>;
}
