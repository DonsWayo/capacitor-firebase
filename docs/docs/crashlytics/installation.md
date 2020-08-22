# Installation

This module requires that the `@capacitor-plugin-firebase/app` module is already setup and installed. To install the "app" module, view the
[Getting Started](/) documentation.

:::: tabs
 
::: tab yarn
```bash
# Install the Crashlytics module
yarn add @capacitor-plugin-firebase/crashlytics

```
:::
 
 
::: tab npm
```bash
# Install the Crashlytics module
npm i @capacitor-plugin-firebase/crashlytics

```
:::
 
::::

:::: tabs
 
::: tab iOS
```bash
Nothing more on iOS
```
:::
 
 
::: tab Android
1. In your project-level build.gradle file, add the Crashlytics Gradle plugin as a buildscript dependency:

``` groovy
buildscript {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }

    dependencies {
        // ...

        // Check that you have the Google Services Gradle plugin v4.3.2 or later
        // (if not, add it).
        classpath 'com.google.gms:google-services:4.3.3'

        // Add the Crashlytics Gradle plugin.
        classpath 'com.google.firebase:firebase-crashlytics-gradle:2.2.0'
    }
}

allprojects {
    repositories {
        // Check that you have Google's Maven repository (if not, add it).
        google()
    }
}
```

1.In your app-level build.gradle file, apply the Crashlytics Gradle plugin:

``` groovy
apply plugin: 'com.android.application'

apply plugin: 'com.google.gms.google-services' // Google Services Gradle plugin

// Apply the Crashlytics Gradle plugin
apply plugin: 'com.google.firebase.crashlytics'
```
:::
 
::::

Update the changes
```bash
npx cap sync
```