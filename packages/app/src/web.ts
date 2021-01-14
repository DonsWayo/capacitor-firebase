import { WebPlugin } from '@capacitor/core';
import { FirebaseAppPlugin, FirebaseInitConfig } from './definitions';
import firebase from "firebase/app";

export class FirebaseAppWeb extends WebPlugin implements FirebaseAppPlugin {

  public app: any;

  constructor() {
    super({
      name: 'FirebaseApp',
      platforms: ['web'],
    });
  }

  async init(config: FirebaseInitConfig): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        if (firebase.apps.length > 1) {
          reject(false);
        }
        firebase.initializeApp(config);
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const FirebaseApp = new FirebaseAppWeb();

export { FirebaseApp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseApp);
