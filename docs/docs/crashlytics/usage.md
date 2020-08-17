# Usage

## Init

::: warning
Crashlytics only work on iOS and Android, web is not supported
:::

Load the crashlytics module

```ts
// Not needed, this import is for use on the web
// import "@capacitor-plugin-firebase/crashlytics";
import { Plugins } from "@capacitor/core";
const { FirebaseCrashlytics } = Plugins;

FirebaseFirestore.initCrashlytics();
```

## logMessage


```Definition```

```ts
    logMessage(options: { message: string }): Promise<void | string>;
```

```ts
// Not needed, this import is for use on the web
// import "@capacitor-plugin-firebase/crashlytics";
import { Plugins } from "@capacitor/core";
const { FirebaseCrashlytics } = Plugins;
  FirebaseCrashlytics.logMessage({ message: "this app not crash!" })
```

## setUserId


```Definition```

```ts
  setUserId(options: { userId: string }): Promise<void | string>;
```

```ts
// Not needed, this import is for use on the web
// import "@capacitor-plugin-firebase/crashlytics";
import { Plugins } from "@capacitor/core";
const { FirebaseCrashlytics } = Plugins;
  FirebaseCrashlytics.setUserId({ userId: "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9" })
```

## testCrash


```Definition```

```ts
  testCrash(): Promise<void | string>;
```

```ts
// Not needed, this import is for use on the web
// import "@capacitor-plugin-firebase/crashlytics";
import { Plugins } from "@capacitor/core";
const { FirebaseCrashlytics } = Plugins;
  FirebaseCrashlytics.testCrash();
```

## setCustomValue


```Definition```

```ts
// Type is needed for android
  setCustomValue(options: { forKey: string; value: any; type?: string; }): Promise<void | string>;
```

```ts
// Not needed, this import is for use on the web
// import "@capacitor-plugin-firebase/crashlytics";
import { Plugins } from "@capacitor/core";
const { FirebaseCrashlytics } = Plugins;
  FirebaseCrashlytics.setCustomValue({ forKey: "my_key", value: "value", type: "string"}): Promise<void | string>;
```

