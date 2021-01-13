import { WebPlugin } from '@capacitor/core';
import { FirebaseCloudMessagingPlugin } from './definitions';
import firebase from "firebase/app";
import 'firebase/messaging';

export class FirebaseCloudMessagingWeb extends WebPlugin implements FirebaseCloudMessagingPlugin {

  constructor() {
    super({
      name: 'FirebaseCloudMessaging',
      platforms: ['web'],
    });
  }
  subscribeToTopic(options: { name: string; }): Promise<{ message: string; }> {
    return new Promise((reject) => {reject({message: "Not supported on web"})});
  }
  unsubscribeFromTopic(options: { name: string; }): Promise<{ message: string; }> {
    return new Promise((reject) => {reject({message: "Not supported on web"})});
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }


  async initMessaging(key: string): Promise<boolean> {
    console.log('Init Analitycs')
    try {
      return new Promise((resolve) => {
        firebase.messaging().usePublicVapidKey(key);
        resolve(true);
       });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getToken() {
    return await firebase.messaging().getToken();
  }
}

const FirebaseCloudMessaging = new FirebaseCloudMessagingWeb();

export { FirebaseCloudMessaging };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseCloudMessaging);
