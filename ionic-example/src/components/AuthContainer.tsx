import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/auth";
const { FirebaseAuth } = Plugins;

const AuthContainer: React.FC = () => {

    async function signInWithEmailAndPassword() {
        const email = 'pepe@pepe.com'
        const password = '123456'
        const auth = await FirebaseAuth.signInWithEmailAndPassword({email, password})
        console.log(auth)
    }

    async function createUserWithEmailAndPassword() {
        const email = 'pepe@pepe.com'
        const password = '123456'
        const auth = await FirebaseAuth.createUserWithEmailAndPassword({email, password})
        console.log(auth)
    }

    return (
      <div>
           <IonButton onClick={signInWithEmailAndPassword} expand="full">signInWithEmailAndPassword</IonButton>
           <IonButton onClick={createUserWithEmailAndPassword} expand="full">createUserWithEmailAndPassword</IonButton>
      </div>
    );
};

export default AuthContainer;