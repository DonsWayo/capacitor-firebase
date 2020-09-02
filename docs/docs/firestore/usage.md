# Usage

## Init


Load the firestore module

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/firestore";

import { Plugins } from "@capacitor/core";
const { FirebaseFirestore } = Plugins;

FirebaseFirestore.initAnalytics();
```

## addDocument


```Definition```

```ts
  addDocument(options: { collection: string, document: Object }): void 
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/firestore";

import { Plugins } from "@capacitor/core";
const { FirebaseFirestore } = Plugins;
  
  FirebaseFirestore.addDocument({ collection: "events", document: {key: "_key", value: true} })
```

## getDocuments


```Definition```

```ts
    getDocuments(options: { collection: string }): void
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/firestore";

import { Plugins } from "@capacitor/core";
const { FirebaseFirestore } = Plugins;
  
  FirebaseFirestore.getDocuments({ collection: "events"})
```
