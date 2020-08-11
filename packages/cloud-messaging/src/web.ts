import { WebPlugin } from '@capacitor/core';
import { FirebaseCloudMessagingPlugin } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js";

declare var window: any;
export class FirebaseCloudMessagingWeb extends WebPlugin implements FirebaseCloudMessagingPlugin {

  messaging: any = null;

  constructor() {
    super({
      name: 'FirebaseCloudMessaging',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async initMessaging(key: string): Promise<boolean> {
    console.log('Init Analitycs')
    try {
      await this.addFirebaseScript();
      return new Promise((resolve) => {
        this.messaging = window.firebase.messaging();
        this.messaging.usePublicVapidKey(key);
        resolve(true);
       });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getToken() {
    return await this.messaging.getToken();
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

const FirebaseCloudMessaging = new FirebaseCloudMessagingWeb();

export { FirebaseCloudMessaging };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseCloudMessaging);
