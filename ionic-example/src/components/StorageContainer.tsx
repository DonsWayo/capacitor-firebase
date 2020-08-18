import React from 'react';
import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/storage";
const { FirebaseStorage, Filesystem } = Plugins;

const StorageContainer: React.FC = () => {

  async function getDownloadUrl() {
    const url = await FirebaseStorage.getDownloadUrl({ref: 'images/coin.png'});
    console.log(url);
  }

  async function downloadFile() {
    const download = await FirebaseStorage.downloadFile({ filePath: '/images', fileRef: 'images/coin.png', fileName: "image.png"});
    console.log(download)
  }

  async function uploadFile() {
    const download = await FirebaseStorage.uploadFile({ filePath: '/images', fileName: "image.png", fileRef: 'imaginaios.png' });
    console.log(download)
  }

  async function onChangeFile(e: any) {
    const file = e.target.files[0];
    const image = await FirebaseStorage.uploadFileWeb({ ref: 'images/file.png', file });
    console.log(image);
  }
  return (
    <div className="container">
      <input type="file" onChange={(e) => onChangeFile(e)} />
      <IonButton onClick={getDownloadUrl} expand="full">Download url</IonButton>
      <IonButton onClick={downloadFile} expand="full">Download file (native)</IonButton>
      <IonButton onClick={uploadFile} expand="full">Up file (native)</IonButton>
    </div>
  );
};

export default StorageContainer;