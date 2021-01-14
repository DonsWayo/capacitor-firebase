import Foundation
import Capacitor
import FirebaseCrashlytics

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseCrashlytics)
public class FirebaseCrashlytics: CAPPlugin {

    @objc func init(_ call: CAPPluginCall) {
        call.success()
    }
    
    @objc func testCrash(_ call: CAPPluginCall) {
        call.success()
        fatalError()
    }
    
    @objc func setCustomValue(_ call: CAPPluginCall) {
        let forKey = call.getString("forKey") ?? nil
        let type = call.getString("type") ?? "string"
        
        if forKey == nil {
            call.error("forKey is missing")
            return
        }
        
        switch type {
        case "boolean":
            let value = call.getBool("value")
            if value == nil {
                call.error("value is missing!")
                return
            }
            Crashlytics.crashlytics().setCustomValue(value as Any, forKey: forKey!)
        case "int":
            let value = call.getInt("value")
            if value == nil {
                call.error("value is missing!")
                return
            }
            Crashlytics.crashlytics().setCustomValue(value as Any, forKey: forKey!)
        case "double":
            let value = call.getDouble("value")
            if value == nil {
                call.error("value is missing!")
                return
            }
            Crashlytics.crashlytics().setCustomValue(value as Any, forKey: forKey!)
        default:
            let value = call.getString("value")
            Crashlytics.crashlytics().setCustomValue(value as Any, forKey: forKey!)
        }
        
        
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
