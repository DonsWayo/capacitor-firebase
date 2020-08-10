import { WebPlugin } from '@capacitor/core';
import { FirebaseFirestorePlugin } from './definitions';

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
}

const FirebaseFirestore = new FirebaseFirestoreWeb();

export { FirebaseFirestore };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseFirestore);
