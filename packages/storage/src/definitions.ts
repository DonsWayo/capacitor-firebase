declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseStorage: FirebaseStoragePlugin;
  }
}

export interface FirebaseStoragePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initStorage(): Promise<boolean>
  getDownloadUrl(ref: string ): Promise<any>;
  uploadFile(options: { ref: string, file: File | Blob }): Promise<any>;
}
