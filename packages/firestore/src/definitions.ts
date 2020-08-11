declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseFirestore: FirebaseFirestorePlugin;
  }
}

export interface Where {
  value: string;
  compare: '<' | '<=' | '==' | '>' | '>=' | 'array-contains' |'in' | 'array-contains-any';
  on: any;
}

export interface Order {
  by: string;
  descending: boolean;
}

export interface FirebaseFirestorePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  initFirestore(): Promise<boolean | unknown>
}
