# Usage

## Init


Load the storage module

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/storage";

import { Plugins } from "@capacitor/core";
const { FirebaseStorage } = Plugins;

FirebaseStorage.initStorage();
```

## getDownloadUrl


```Definition```

```ts
  getDownloadUrl(options: {ref: string} ): Promise<{ success: boolean, url: string }> ;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/storage";

import { Plugins } from "@capacitor/core";
const { FirebaseStorage } = Plugins;
  
  FirebaseStorage.getDownloadUrl({ref: 'images/coin.png'});
```

## uploadFile


```Definition```

```ts
  uploadFile(options: { filePath: string, fileRef: string, fileName: string }): Promise<any>;

```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/storage";

import { Plugins } from "@capacitor/core";
const { FirebaseStorage } = Plugins;
FirebaseStorage.uploadFile({ filePath: '/images', fileName: "image.png", fileRef: 'imaginaios.png' });
```

## uploadFileWeb


```Definition```

```ts
    uploadFileWeb(options: { ref: string, file: File | Blob }):  Promise<any>;
```

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/storage";

import { Plugins } from "@capacitor/core";
const { FirebaseStorage } = Plugins;
    const file = e.target.files[0];
    const image = await FirebaseStorage.uploadFileWeb({ ref: 'images/file.png', file });
```

## downloadFile


```Definition```

```ts
  downloadFile(options: { filePath: string, fileRef: string, fileName: string }): Promise<any>;
```

IMPORTANT!

This will use the documents directory on iOS and the files folder on android, you only need to set the folder and the name of the file

```ts
//this import is for use on the web
import "@capacitor-plugin-firebase/storage";

import { Plugins } from "@capacitor/core";
const { FirebaseStorage } = Plugins;
  const download = await FirebaseStorage.downloadFile({ filePath: '/images', fileRef: 'images/coin.png', fileName: "image.png"});
```