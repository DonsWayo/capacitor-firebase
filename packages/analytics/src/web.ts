import { WebPlugin } from '@capacitor/core';
import { FirebaseAnalyticsPlugin } from './definitions';
import firebase from 'firebase/app'
import 'firebase/analytics'

declare var window: any;
export class FirebaseAnalyticsWeb extends WebPlugin implements FirebaseAnalyticsPlugin {

  constructor() {
    super({
      name: 'FirebaseAnalytics',
      platforms: ['web'],
    });
  }

  async analytics(): Promise<boolean> {
    try {
      return new Promise((resolve) => {
        firebase.analytics()
        firebase.analytics().setAnalyticsCollectionEnabled(true)
        console.log(firebase.app().name)
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  setUserId(options: { userId: string; }): Promise<void> {
    return new Promise(async (resolve, reject) => {

      if (!firebase.analytics()) {
        reject("Analytics are not init");
      }

      const { userId } = options;

      if (!userId) {
        reject("userId is missing");
      }

      firebase.analytics().setUserId(userId);
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

      if (!firebase.analytics()) {
        reject("Analytics are not init");
      }

      const { name, params } = options;

      if (!name && !params) {
        reject("name or params are missing");
      }
      firebase.analytics().logEvent(name, params);
      resolve();
    });
  }
}

const FirebaseAnalytics = new FirebaseAnalyticsWeb();

export { FirebaseAnalytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseAnalytics);
