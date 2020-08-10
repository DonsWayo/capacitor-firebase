import { WebPlugin } from '@capacitor/core';
import { FirebaseAppPlugin } from './definitions';

export class FirebaseAppWeb extends WebPlugin implements FirebaseAppPlugin {
  constructor() {
    super({
      name: 'FirebaseApp',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const FirebaseApp = new FirebaseAppWeb();

export { FirebaseApp };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseApp);
