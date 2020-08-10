import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/analytics";
const { FirebaseAnalytics } = Plugins;

const AnalyticsContainer: React.FC = () => {

    function logEvent() {
        FirebaseAnalytics.logEvent('lol');
    }
    return (
      <div className="container">
            <IonButton onClick={logEvent} expand="full">Log event</IonButton>
      </div>
    );
};

export default AnalyticsContainer;