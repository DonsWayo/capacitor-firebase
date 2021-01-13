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
    
    @objc func getDownloadUrl(_ call: CAPPluginCall) {
        let ref = call.getString("ref") ?? nil
        let storageRef = storage.reference()
        
        if ref != nil {
            let downloadRef = storageRef.child(ref!)
            downloadRef.downloadURL { url, error in
                if let error = error {
                    call.error(error.localizedDescription)
                } else {
                    call.success([
                        "success": true,
                        "url": url?.absoluteString as Any
                    ])
                }
            }
        } else {
            call.error("Ref is missing")
        }
    }
    
    @objc func uploadFile(_ call: CAPPluginCall) {
        let filePath = call.getString("filePath") ?? nil
        let fileRef = call.getString("fileRef") ?? nil
        let fileName = call.getString("fileName") ?? nil
        
        if(filePath == nil || fileRef == nil || fileName == nil) {
            call.error("filePath or fileRef or fileName is missing")
            return
        }
        
        let storageRef = storage.reference()
        
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]

        // File located on disk
        let localFile = URL(fileURLWithPath: documentsPath + filePath! + "/" + fileName!)
        
        // Create a reference to the file you want to upload
        let riversRef = storageRef.child(fileRef!)
        
        riversRef.putFile(from: localFile, metadata: nil) { metadata, error in
            
            if let error = error {
                call.error(error.localizedDescription)
                return
            } else {
                call.success([
                    "success": true,
                    "metadata": metadata!.dictionaryRepresentation()
                ])
            }
            
        }
    }
    
    @objc func downloadFile(_ call: CAPPluginCall) {
        let filePath = call.getString("filePath") ?? nil
        let fileRef = call.getString("fileRef") ?? nil
        let fileName = call.getString("fileName") ?? nil
        
        if(filePath == nil || fileRef == nil || fileName == nil) {
            call.error("filePath or fileRef or fileName is missing")
            return
        }
        
        let storageRef = storage.reference()
        
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]

        // File located on disk
        let localUrl = URL(fileURLWithPath: documentsPath + filePath! + "/" + fileName!)
        print(localUrl)
        
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
