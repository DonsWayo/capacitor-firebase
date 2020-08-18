import React from 'react';
import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { IonButton } from '@ionic/react';
import "@capacitor-plugin-firebase/storage";
const { FirebaseStorage, Filesystem } = Plugins;

const StorageContainer: React.FC = () => {

  async function getDownloadUrl() {
    const url = await FirebaseStorage.getDownloadUrl('images/coin.png');
    console.log(url);
  }

  async function downloadFile() {
    const uri = await Filesystem.getUri({
      directory: FilesystemDirectory.Documents,
      path: 'image.png'
    });
    console.log(uri)
    const download = await FirebaseStorage.downloadFile({ filePath: uri.uri, fileRef: 'images/coin.png' });
    console.log(download)
  }

  async function uploadFile() {
    const uri = await Filesystem.getUri({
      directory: FilesystemDirectory.Documents,
      path: 'image.png'
    });
    console.log(uri)
    const download = await FirebaseStorage.uploadFile({ filePath: uri.uri, fileRef: 'images/coin-ionic.png' });
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
      <IonButton onClick={downloadFile} expand="full">Download file (native)</IonButton>
      <IonButton onClick={uploadFile} expand="full">Upload file (native)</IonButton>
    </div>
  );
};

export default StorageContainer;