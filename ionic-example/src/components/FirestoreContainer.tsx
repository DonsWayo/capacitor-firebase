import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/firestore";
const { FirebaseFirestore } = Plugins;

const FirestoreContainer: React.FC = () => {

  async function addDoc() {
    const doc = await FirebaseFirestore.addDocument({ collection: "pepe", document: { name: "lola", perro: "hamu" } });
    console.log(doc);
  }

  async function getDocs() {
    try {
      const docs = await FirebaseFirestore.getDocuments(
        { collection: "pepe", 
/*        NOT WORK FOR NOW!
          where: {value: 'name', compare: '==', on: 'lola'} ,
          order: {by: "name", descending: true},
          limit: 2 */
      });
      console.log(docs)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <IonButton onClick={addDoc} expand="full">Add doc</IonButton>
      <IonButton onClick={getDocs} expand="full">get docs</IonButton>
    </div>
  );
};

export default FirestoreContainer;