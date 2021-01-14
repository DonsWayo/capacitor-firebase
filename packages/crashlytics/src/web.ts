import { WebPlugin } from '@capacitor/core';
import { FirebaseCrashlyticsPlugin } from './definitions';

export class FirebaseCrashlyticsWeb extends WebPlugin implements FirebaseCrashlyticsPlugin {
  constructor() {
    super({
      name: 'FirebaseCrashlytics',
      platforms: ['web'],
    });
  }
  init(): Promise<any> {
    return new Promise((reject) => {
      reject("Crashlytics not work on web")
    });
  }
  //@ts-ignore
  logMessage(options: { message: string; }): Promise<void | string> {
    return new Promise((reject) => {
      reject("Crashlytics not work on web")
    });
  }
  //@ts-ignore
  setUserId(options: { userId: string; }): Promise<void | string> {
    return new Promise((reject) => {
      reject("Crashlytics not work on web")
    });
  }
  testCrash(): Promise<void | string> {
    return new Promise((reject) => {
      reject("Crashlytics not work on web")
    });
  }
  //@ts-ignore
  setCustomValue(options: { forKey: string; value: any; type?: string | undefined; }): Promise<void | string> {
    return new Promise((reject) => {
      reject("Crashlytics not work on web")
    });;
  }
}

const FirebaseCrashlytics = new FirebaseCrashlyticsWeb();

export { FirebaseCrashlytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseCrashlytics);
