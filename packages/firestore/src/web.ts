import { WebPlugin } from '@capacitor/core';
import { FirebaseFirestorePlugin, Where, Order } from './definitions';
import firebase from 'firebase/app'
import 'firebase/firestore'

export class FirebaseFirestoreWeb extends WebPlugin implements FirebaseFirestorePlugin {
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
      const doc = await firebase.firestore().collection(collection).add(document);
      return doc;
  }

  async getDocuments(options: { collection: string, where?: Where, order?: Order, limit?: number }) {
      const { collection, where, order, limit } = options;
      console.log(options);
      let docs: any = [];
      if(collection && !where && !order && !limit){
        const getDocs = await firebase.firestore().collection(collection).get();
        getDocs.forEach(function(doc: any) {
          docs.push(doc.data());
        });
        return {"docs": docs}
      }
      if(collection && where && !order && !limit) {
        return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).get();
      }
      if(collection && where && order && !limit) {
        if(order && order.descending) {
          return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).orderBy(order.by, 'desc').get();
        } else {
          return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).orderBy(order.by).get();
        }
      }
      if(collection && where && limit && !order) {
        return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).limit(limit).get();
      }
      if(collection && where && order && limit) {
        if(order && order.descending) {
          return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).orderBy(order.by, 'desc').limit(limit).get();
        } else {
          return await firebase.firestore().collection(collection).where(where.value, where.compare, where.on).orderBy(order.by).limit(limit).get();
        }
      }
  }
}

const FirebaseFirestore = new FirebaseFirestoreWeb();

export { FirebaseFirestore };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseFirestore);
