declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebasePerformanceMonitoring: FirebasePerformanceMonitoringPlugin;
  }
}

export interface FirebasePerformanceMonitoringPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initPerformanceMonitoring(): Promise<boolean>;
}
