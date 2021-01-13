import { WebPlugin } from '@capacitor/core';
import { FirebaseStoragePlugin } from './definitions';
import firebase from 'firebase/app'
import 'firebase/storage'

export class FirebaseStorageWeb extends WebPlugin implements FirebaseStoragePlugin {

  constructor() {
    super({
      name: 'FirebaseStorage',
      platforms: ['web'],
    });
  }

  //@ts-ignore
  downloadFile(options: { filePath: string; fileRef: string; }): Promise<any> {
    return new Promise((reject) => {
      reject("On web use getDownloadUrl")
    });
  }
  //@ts-ignore
  uploadFile(options: { filePath: string; fileRef: string; }): Promise<any> {
    return new Promise((reject) => {
      reject("On web use the uploadFileWeb, supports File and Blod")
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }

  async getDownloadUrl(options: {ref: string}): Promise<{ success: boolean, url: string }> {
    try {
      const { ref } = options;
      return new Promise(async (resolve) => {
        const storageRef = firebase.storage().ref();
        const url = await storageRef.child(ref).getDownloadURL();
        resolve({ success: true, url});
      })
    } catch (error) {
      return error;
    }
  }


  async uploadFileWeb(options: { ref: string, file: File | Blob }) {
    try {
      return new Promise(async (resolve) => {
        const { ref, file } = options;
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(ref).put(file);
        uploadTask.on('state_changed', (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused': // or 'paused'
              console.log('Upload is paused');
              break;
            case 'running': // or 'running'
              console.log('Upload is running');
              break;
            }
        })
        resolve(uploadTask)
      })
    }
    catch (error) {
      return error;
    }
  }
}

const FirebaseStorage = new FirebaseStorageWeb();

export { FirebaseStorage };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseStorage);
