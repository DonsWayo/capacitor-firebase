import Foundation
import Capacitor
import FirebaseCrashlytics

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseCrashlytics)
public class FirebaseCrashlytics: CAPPlugin {
    
    @objc func testCrash(_ call: CAPPluginCall) {
        call.success()
        fatalError()
    }
    
    @objc func setCustomValue(_ call: CAPPluginCall) {
        let options = call.getObject("options") ?? nil
        
        if options == nil {
            call.error("customValue is missing")
            return
        }
        
        let forKey = options!["forKey"] ?? nil
        let value = options!["value"] ?? nil
        
        if forKey == nil  || value == nil {
            call.error("forKey or value is missing")
        }
        Crashlytics.crashlytics().setCustomValue(value as Any, forKey: forKey as! String)
        
        call.success()
    }
    
    @objc func setUserID(_ call: CAPPluginCall) {
        let userId = call.getString("userId") ?? nil
        
        if userId == nil {
            call.error("userId is missing")
            return
        }
        
        Crashlytics.crashlytics().setUserID(userId!)
        call.success()
        
    }
    
    @objc func logMessage(_ call: CAPPluginCall) {
        let message = call.getString("message") ?? nil
        
        if message == nil {
            call.error("message is missing")
            return
        }
        
        Crashlytics.crashlytics().log(message!)
        
        call.success()
        
    }
}
