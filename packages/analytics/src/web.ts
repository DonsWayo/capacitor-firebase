import { WebPlugin } from '@capacitor/core';
import { FirebaseAnalyticsPlugin } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-analytics.js";

declare var window: any;
export class FirebaseAnalyticsWeb extends WebPlugin implements FirebaseAnalyticsPlugin {

  analytics: any = null;

  constructor() {
    super({
      name: 'FirebaseAnalytics',
      platforms: ['web'],
    });
  }

  async initAnalytics(): Promise<boolean> {
    console.log('Init Analitycs')
    try {
      await this.addFirebaseScript();
      return new Promise((resolve) => {
        this.analytics = window.firebase.analytics();
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  setUserId(options: { userId: string; }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      if (!this.analytics) {
        reject("Analytics are not init");
      }

      const { userId } = options;

      if (!userId) {
        reject("userId is missing");
      }

      this.analytics.setUserId(userId);
      resolve();
    });
  }

  /**
   * Not suported on web
   */
  reset(): Promise<void> {
    return new Promise((resolve) => resolve);
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  logEvent(options: { name: string; params: object }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      if (!this.analytics) {
        reject("Analytics are not init");
      }

      const { name, params } = options;

      if (!name && !params) {
        reject("name or params are missing");
      }

      this.analytics.logEvent(name, params);
      resolve();
    });
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

const FirebaseAnalytics = new FirebaseAnalyticsWeb();

export { FirebaseAnalytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseAnalytics);
