import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/crashlytics";
const { FirebaseCrashlytics } = Plugins;

const CrashlyticsContainer: React.FC = () => {

    function testCrash() {
        FirebaseCrashlytics.testCrash();
    }
    return (
      <div className="container">
            <IonButton onClick={testCrash} expand="full">test crash</IonButton>
      </div>
    );
};

export default CrashlyticsContainer;