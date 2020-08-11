import Foundation
import Capacitor
import FirebaseAuth
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseAuth)
public class FirebaseAuth: CAPPlugin {
    
    @objc func createUserWithEmailAndPassword(_ call: CAPPluginCall) {
        let email = call.getString("email") ?? nil
        let password = call.getString("password") ?? nil
        
        if email != nil || password != nil {
            call.reject("Email or password is missing")
            return
        }
        
        Auth.auth().createUser(withEmail: email!, password: password!) { authResult, error in
            if error != nil {
                call.error(error?.localizedDescription ?? "Error on create user with email and password")
            }
            call.success([
                "success": authResult as Any
            ])
        }
        
        
    }
    
    @objc func signInWithEmailAndPassword(_ call: CAPPluginCall) {
        let email = call.getString("email") ?? nil
        let password = call.getString("password") ?? nil
        
        if email != nil || password != nil {
            call.reject("Email or password is missing")
            return
        }
        
        Auth.auth().signIn(withEmail: email!, password: password!) { authResult, error in
            if error != nil {
                call.error(error?.localizedDescription ?? "Error on create user with email and password")
            }
            call.success([
                "success": authResult as Any
            ])
        }
        
        
    }
    
    @objc func onAuthStateChanged() {
        Auth.auth().addStateDidChangeListener { (auth, user) in
            print(auth)
            print(user as Any)
          self.bridge.triggerDocumentJSEvent(eventName: "onAuthStateChanged", data: "auth")
        }
    }
}
