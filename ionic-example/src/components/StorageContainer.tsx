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
       const image = await FirebaseStorage.uploadFile({ref: 'images/file.png', file});
       image.on('state_changed', (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused': // or 'paused'
            console.log('Upload is paused');
            break;
          case 'running': // or 'running'
            console.log('Upload is running');
            break;
          }
      })
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