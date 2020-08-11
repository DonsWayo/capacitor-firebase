import { WebPlugin } from '@capacitor/core';
import { FirebaseAuthPlugin } from './definitions';

export class FirebaseAuthWeb extends WebPlugin implements FirebaseAuthPlugin {
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
}

const FirebaseAuth = new FirebaseAuthWeb();

export { FirebaseAuth };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseAuth);
