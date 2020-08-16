import React from 'react';
import { Plugins } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/storage";
const { FirebaseStorage } = Plugins;

const StorageContainer: React.FC = () => {

    async function downloadFile() {
        const url = await FirebaseStorage.getDownloadUrl('images/coin.png');
        console.log(url);
    }

    async function onChangeFile(e: any) {
       const file = e.target.files[0];
       const image = await FirebaseStorage.uploadFileWeb({ref: 'images/file.png', file});
       console.log(image);
    }
    return (
      <div className="container">
                  <input type="file" onChange={(e) => onChangeFile(e)} />
            <IonButton onClick={downloadFile} expand="full">Log event</IonButton>
      </div>
    );
};

export default StorageContainer;