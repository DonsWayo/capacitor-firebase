import { WebPlugin } from '@capacitor/core';
import { FirebasePerformanceMonitoringPlugin } from './definitions';

export class FirebasePerformanceMonitoringWeb extends WebPlugin implements FirebasePerformanceMonitoringPlugin {
  constructor() {
    super({
      name: 'FirebasePerformanceMonitoring',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const FirebasePerformanceMonitoring = new FirebasePerformanceMonitoringWeb();

export { FirebasePerformanceMonitoring };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebasePerformanceMonitoring);
