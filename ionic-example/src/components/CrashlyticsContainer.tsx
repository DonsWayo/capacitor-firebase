import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/crashlytics";
const { FirebaseCrashlytics } = Plugins;

const CrashlyticsContainer: React.FC = () => {

    function testCrash() {
        FirebaseCrashlytics.testCrash();
    }

    function logMessage() {
      FirebaseCrashlytics.logMessage({message: "hello crash"});
    }

    function setCustomValue() {
      FirebaseCrashlytics.setCustomValue({forKey: "my_key", value: 1000, type: "int"});
    }

    return (
      <div className="container">
            <IonButton onClick={testCrash} expand="full">test crash</IonButton>
            <IonButton onClick={logMessage} expand="full">logMessage</IonButton>
            <IonButton onClick={setCustomValue} expand="full">setCustomValue</IonButton>
      </div>
    );
};

export default CrashlyticsContainer;