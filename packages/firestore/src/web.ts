import { WebPlugin } from '@capacitor/core';
import { FirebaseFirestorePlugin, Where, Order } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-firestore.js";

declare var window: any;
export class FirebaseFirestoreWeb extends WebPlugin implements FirebaseFirestorePlugin {

  firestore: any = null;

  constructor() {
    super({
      name: 'FirebaseFirestore',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async addDocument(options: { collection: string, document: Object }) {
      const { collection, document } = options;
      const doc = await this.firestore.collection(collection).add(document);
      return doc;
  }

  async getDocuments(options: { collection: string, where?: Where, order?: Order, limit?: number }) {
      const { collection, where, order, limit } = options;
      console.log(options);
      if(collection && !where && !order && !limit){
        return await this.firestore.collection(collection).get();
      }
      if(collection && where && !order && !limit) {
        return await this.firestore.collection(collection).where(where.value, where.compare, where.on).get();
      }
      if(collection && where && order && !limit) {
        if(order && order.descending) {
          return await this.firestore.collection(collection).where(where.value, where.compare, where.on).orderBy(order.by, 'desc').get();
        } else {
          return await this.firestore.collection(collection).where(where.value, where.compare, where.on).orderBy(order.by).get();
        }
      }
      if(collection && where && limit && !order) {
        return await this.firestore.collection(collection).where(where.value, where.compare, where.on).limit(limit).get();
      }
      if(collection && where && order && limit) {
        if(order && order.descending) {
          return await this.firestore.collection(collection).where(where.value, where.compare, where.on).orderBy(order.by, 'desc').limit(limit).get();
        } else {
          return await this.firestore.collection(collection).where(where.value, where.compare, where.on).orderBy(order.by).limit(limit).get();
        }
      }
  }

  async initFirestore(): Promise<boolean | unknown> {
    console.log('Init Analitycs')
      return new Promise( async (resolve) => {
        await this.addFirebaseScript();
        this.firestore = window.firebase.firestore();
        resolve(true);
      })
      .catch((error) => {
        return error;
      })
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

const FirebaseFirestore = new FirebaseFirestoreWeb();

export { FirebaseFirestore };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseFirestore);
