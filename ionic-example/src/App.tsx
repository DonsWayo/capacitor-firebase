import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import "@capacitor-plugin-firebase/app";
import "@capacitor-plugin-firebase/analytics";
import "@capacitor-plugin-firebase/storage";
import "@capacitor-plugin-firebase/firestore";
import { Plugins } from "@capacitor/core";


/* Theme variables */
import './theme/variables.css';

const { FirebaseApp, FirebaseAnalytics, FirebaseStorage, FirebaseFirestore } = Plugins;

const App: React.FC = () => {

  async function init() {
    await FirebaseApp.initFirebase({
      apiKey: process.env.REACT_APP_apiKey || "",
      authDomain: process.env.REACT_APP_authDomain || "",
      databaseURL: process.env.REACT_APP_databaseURL || "",
      projectId: process.env.REACT_APP_projectId || "",
      storageBucket: process.env.REACT_APP_storageBucket || "",
      messagingSenderId: process.env.REACT_APP_messagingSenderId || "",
      appId: process.env.REACT_APP_appId || "",
      measurementId: process.env.REACT_APP_measurementId || ""
    });
    FirebaseAnalytics.initAnalytics();
    FirebaseStorage.initStorage();
    FirebaseFirestore.initFirestore();
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/page/:name" component={Page} exact />
            <Redirect from="/" to="/page/Analytics" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
