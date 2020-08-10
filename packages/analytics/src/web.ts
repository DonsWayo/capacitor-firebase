import { WebPlugin } from '@capacitor/core';
import { FirebaseAnalyticsPlugin } from './definitions';

export class FirebaseAnalyticsWeb extends WebPlugin implements FirebaseAnalyticsPlugin {
  constructor() {
    super({
      name: 'FirebaseAnalytics',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}

const FirebaseAnalytics = new FirebaseAnalyticsWeb();

export { FirebaseAnalytics };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FirebaseAnalytics);
