import { WebPlugin } from '@capacitor/core';
import { FirebasePerformanceMonitoringPlugin } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.18.0/firebase-performance.js";

declare var window: any;

export class FirebasePerformanceMonitoringWeb extends WebPlugin implements FirebasePerformanceMonitoringPlugin {
  
  performance: any = null;

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

  async initPerformanceMonitoring(): Promise<boolean> {
    console.log('Init Performance Monitoring')
    try {
      await this.addFirebaseScript();
      return new Promise((resolve) => {
        this.performance = window.firebase.performance();
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  private addFirebaseScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const element = window.document.querySelector("head");
      const file = window.document.createElement("script");
      file.type = "text/javascript";
      file.src = FIREBASECDN;
      file.onload = resolve;
      file.onerror = reject;
      element.appendChild(file);
    });
  }
}

const FirebasePerformanceMonitoring = new FirebasePerformanceMonitoringWeb();

export { FirebasePerformanceMonitoring };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebasePerformanceMonitoring);
