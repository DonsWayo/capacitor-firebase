import { WebPlugin } from '@capacitor/core';
import { FirebaseCloudMessagingPlugin } from './definitions';

export class FirebaseCloudMessagingWeb extends WebPlugin implements FirebaseCloudMessagingPlugin {
  constructor() {
    super({
      name: 'FirebaseCloudMessaging',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const FirebaseCloudMessaging = new FirebaseCloudMessagingWeb();

export { FirebaseCloudMessaging };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseCloudMessaging);
