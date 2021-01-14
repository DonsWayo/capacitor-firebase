import { WebPlugin } from '@capacitor/core';
import { FirebasePerformanceMonitoringPlugin } from './definitions';
import firebase from "firebase/app";
import "firebase/performance";

export class FirebasePerformanceMonitoringWeb extends WebPlugin implements FirebasePerformanceMonitoringPlugin {
  
  constructor() {
    super({
      name: 'FirebasePerformanceMonitoring',
      platforms: ['web'],
    });
  }

  async init(): Promise<boolean> {
    console.log('Init Performance Monitoring')
    try {
      return new Promise((resolve) => {
        firebase.performance();
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

const FirebasePerformanceMonitoring = new FirebasePerformanceMonitoringWeb();

export { FirebasePerformanceMonitoring };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebasePerformanceMonitoring);
