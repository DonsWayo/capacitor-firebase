import { Observable } from "rxjs";

declare module '@capacitor/core' {
  interface PluginRegistry {
    FirebaseAuth: FirebaseAuthPlugin;
  }
}

export interface FirebaseAuthPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  createUserWithEmailAndPassword(options: { email: string, password: string }): Promise<any>
  signInWithEmailAndPassword(options: { email: string, password: string }): Promise<any>
  onAuthStateChanged(): Observable<any>;
}
