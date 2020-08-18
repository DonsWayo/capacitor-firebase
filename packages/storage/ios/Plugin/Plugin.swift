import Foundation
import Capacitor
import FirebaseStorage

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseStorage)
public class FirebaseStorage: CAPPlugin{
    
    let storage = Storage.storage()
    
    
    @objc func initStorage(_ call: CAPPluginCall) {
        call.success()
    }
    
    @objc func getDownloadUrl(_ call: CAPPluginCall) {
        let ref = call.getString("ref") ?? nil
        let storageRef = storage.reference()
        
        if ref != nil {
            let downloadRef = storageRef.child(ref!)
            downloadRef.downloadURL { url, error in
                if let error = error {
                    call.error(error.localizedDescription)
                } else {
                    call.success(["url": url as Any])
                }
            }
        } else {
            call.error("Ref is missing")
        }
    }
    
    @objc func uploadFile(_ call: CAPPluginCall) {
        let filePath = call.getString("filePath") ?? nil
        let fileRef = call.getString("fileRef") ?? nil
        
        if(filePath == nil || fileRef == nil) {
            call.error("filePath or fileRef is missing")
        }
        
        let storageRef = storage.reference()
        
        // File located on disk
        let localFile = URL(string: filePath!)!
        
        // Create a reference to the file you want to upload
        let riversRef = storageRef.child(fileRef!)
        
        riversRef.putFile(from: localFile, metadata: nil) { metadata, error in
            
            if let error = error {
                call.error(error.localizedDescription)
                return
            } else {
                call.success(["success": metadata!.dictionaryRepresentation()])
            }
            
        }
    }
    
    @objc func downloadFile(_ call: CAPPluginCall) {
        let filePath = call.getString("filePath") ?? nil
        let fileRef = call.getString("fileRef") ?? nil
        
        if(filePath == nil || fileRef == nil) {
            call.error("filePath or fileRef is missing")
            return
        }
        
        let storageRef = storage.reference()
        
        // File located on disk
        let localUrl = URL(string: filePath!)!
        
        // Create a reference to the file you want to upload
        let downloadRef = storageRef.child(fileRef!)
        
        // Download to the local filesystem
        downloadRef.write(toFile: localUrl) { url, error in
            if let error = error {
                call.error(error.localizedDescription)
            } else {
                call.success(["success": true])
            }
        }
    }
}
