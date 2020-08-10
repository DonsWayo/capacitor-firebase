import { WebPlugin } from '@capacitor/core';
import { FirebaseAppPlugin, FirebaseInitConfig } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js";

declare var window: any;

export class FirebaseAppWeb extends WebPlugin implements FirebaseAppPlugin {

  public app: any;

  constructor() {
    super({
      name: 'FirebaseApp',
      platforms: ['web'],
    });
  }

  async initFirebase(config: FirebaseInitConfig): Promise<boolean> {
    try {
      await this.addFirebaseScript();
      return new Promise((resolve, reject) => {
        if (this.isFirebaseInitialized()) {
          reject(false);
        }
        this.app = window.firebase;
        this.app.initializeApp(config);
        resolve(true);
      });
    } catch (error) {
      console.log(error);
      return(false);
    }
  }

  private isFirebaseInitialized() {
    if (!window.firebase) {
      return false;
    }

    const firebaseApps = window.firebase.apps;
    if (firebaseApps && firebaseApps.length === 0) {
      return false;
    } else {
      return true;
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

const FirebaseApp = new FirebaseAppWeb();

export { FirebaseApp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseApp);
