# Usage

## Init


Load the analytics module

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/analytics";

import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics } = Plugins;

FirebaseAnalytics.initAnalytics();
```

## logMessage


```Definition```

```ts
  logEvent(options: { name: string; params: object }): Promise<void>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/analytics";

import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics } = Plugins;
  
  FirebaseAnalytics.logEvent({ message: "event", params: {key: "_key", value: true} })
```

## setUserId


```Definition```

```ts
  setUserId(options: { userId: string }): Promise<void | string>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/analytics";

import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics } = Plugins;

FirebaseAnalytics.setUserId({ userId: "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9" })
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/analytics";

import { Plugins } from "@capacitor/core";
const { FirebaseAnalytics } = Plugins;

FirebaseAnalytics.reset()
```