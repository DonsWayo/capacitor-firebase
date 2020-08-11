import { WebPlugin } from '@capacitor/core';
import { FirebaseAuthPlugin } from './definitions';
import { Observable } from 'rxjs';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-auth.js";

declare var window: any;

export class FirebaseAuthWeb extends WebPlugin implements FirebaseAuthPlugin {

  auth:any = null;

  constructor() {
    super({
      name: 'FirebaseAuth',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async createUserWithEmailAndPassword(options: { email: string, password: string }): Promise<any>  {
    const { email, password } = options
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async signInWithEmailAndPassword(options: { email: string, password: string }): Promise<any>  {
    const { email, password } = options
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  onAuthStateChanged(): Observable<any> {
    return new Observable(subscriber => {
      this.auth.onAuthStateChanged((user: any) => {
        subscriber.next(user);
      });
    });
  }

  async initAuth(): Promise<boolean> {
    console.log('Init Analitycs')
    try {
      await this.addFirebaseScript();
      return new Promise((resolve) => {
        this.auth = window.firebase.auth();
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

const FirebaseAuth = new FirebaseAuthWeb();

export { FirebaseAuth };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseAuth);
