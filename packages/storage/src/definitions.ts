declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseStorage: FirebaseStoragePlugin;
  }
}

export interface FirebaseStoragePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initStorage(): Promise<boolean>
  getDownloadUrl(ref: string ): Promise<{ url: string }> ;
  uploadFileWeb(options: { ref: string, file: File | Blob }): Promise<any>;
  uploadFile(options: { filePath: string, fileRef: string }): Promise<any>;
  downloadFile(options: { filePath: string, fileRef: string }): Promise<any>;
}
