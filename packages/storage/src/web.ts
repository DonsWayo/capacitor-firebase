import { WebPlugin } from '@capacitor/core';
import { FirebaseStoragePlugin } from './definitions';

export class FirebaseStorageWeb extends WebPlugin implements FirebaseStoragePlugin {
  constructor() {
    super({
      name: 'FirebaseStorage',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const FirebaseStorage = new FirebaseStorageWeb();

export { FirebaseStorage };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseStorage);
