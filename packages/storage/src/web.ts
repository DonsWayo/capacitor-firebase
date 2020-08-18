import { WebPlugin } from '@capacitor/core';
import { FirebaseStoragePlugin } from './definitions';

const FIREBASECDN = "https://www.gstatic.com/firebasejs/7.17.2/firebase-storage.js";

declare var window: any;
export class FirebaseStorageWeb extends WebPlugin implements FirebaseStoragePlugin {

  storage: any = null;

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

  async getDownloadUrl(ref: string): Promise<{ url: string }> {
    try {
      return new Promise(async (resolve) => {
        const storageRef = this.storage.ref();
        const url = await storageRef.child(ref).getDownloadURL();
        resolve({url});
      })
    } catch (error) {
      return error;
    }
  }


  async uploadFileWeb(options: { ref: string, file: File | Blob }) {
    try {
      return new Promise(async (resolve) => {
        const { ref, file } = options;
        const storageRef = this.storage.ref();
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

  async initStorage(): Promise<boolean> {
    console.log('Init Storage')
    try {
      await this.addFirebaseScript();
      return new Promise((resolve) => {
        this.storage = window.firebase.storage();
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

const FirebaseStorage = new FirebaseStorageWeb();

export { FirebaseStorage };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseStorage);
