import Foundation
import Capacitor
import FirebaseAnalytics

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseAnalytics)
public class FirebaseAnalytics: CAPPlugin {

    @objc func initAnalytics(_ call: CAPPluginCall) {
        call.success()
    }

    @objc func setUserID(_ call: CAPPluginCall) {
        let userId = call.getString("userId") ?? ""
        if userId != "" {
            Analytics.setUserID(userId)
            call.success()
        } else {
            call.error("userId is missing")
        }
    }
    
    @objc func resetAnalyticsData(_ call: CAPPluginCall) {
           Analytics.resetAnalyticsData()
           call.success()
    }
    
    @objc func logEvent(_ call: CAPPluginCall) {
        let name = call.getString("name") ?? nil
        let params = call.getObject("params") ?? nil
        
            if(name != nil && params != nil) {
                Analytics.logEvent(name!, parameters: params)
                call.success()
            } else {
                call.error("name or params are missing")
            }
          
       }
}
