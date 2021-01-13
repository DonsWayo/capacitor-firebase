declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseStorage: FirebaseStoragePlugin;
  }
}

export interface FirebaseStoragePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  getDownloadUrl(options: {ref: string} ): Promise<{ success: boolean, url: string }> ;
  uploadFile(options: { filePath: string, fileRef: string, fileName: string }): Promise<any>;
  uploadFileWeb(options: { ref: string, file: File | Blob }):  Promise<any>;
  downloadFile(options: { filePath: string, fileRef: string, fileName: string }): Promise<any>;
}
