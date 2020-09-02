# Usage

## Init


Load the cloud messaging module

```Definition```

```ts
  initMessaging(key?: string): Promise<boolean>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/cloud-messaging";

import { Plugins } from "@capacitor/core";
const { FirebaseCloudMessaging } = Plugins;

FirebaseCloudMessaging.initMessaging();
```

## subscribeToTopic


```Definition```

```ts
  subscribeToTopic(options: { name: string }): Promise<{ message: string }>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/cloud-messaging";

import { Plugins } from "@capacitor/core";
const { FirebaseCloudMessaging } = Plugins;
  
  FirebaseCloudMessaging.subscribeToTopic({ name: "general" })
```

## subscribeToTopic


```unsubscribeFromTopic```

```ts
  subscribeToTopic(options: { name: string }): Promise<{ message: string }>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/cloud-messaging";

import { Plugins } from "@capacitor/core";
const { FirebaseCloudMessaging } = Plugins;
  
  FirebaseCloudMessaging.unsubscribeFromTopic({ name: "general" })
```

## getToken


```unsubscribeFromTopic```

```ts
    getToken(): Promise<{ token: string }>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/cloud-messaging";

import { Plugins } from "@capacitor/core";
const { FirebaseCloudMessaging } = Plugins;
  
  FirebaseCloudMessaging.getToken()
```