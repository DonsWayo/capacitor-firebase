import Foundation
import Capacitor
import FirebaseMessaging
import FirebaseInstanceID

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseCloudMessaging)
public class FirebaseCloudMessaging: CAPPlugin, MessagingDelegate {
    
    @objc func initFirebaseMessaging(_ call: CAPPluginCall) {
        Messaging.messaging().delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(self.didRegisterWithToken(notification:)), name: Notification.Name(CAPNotifications.DidRegisterForRemoteNotificationsWithDeviceToken.name()), object: nil)
        
        call.success([
            "success": true
        ])
    }
    
    @objc func didRegisterWithToken(notification: NSNotification) {
        guard let deviceToken = notification.object as? Data else {
            return
        }
        Messaging.messaging().apnsToken = deviceToken
    }
    
    @objc func subscribeToTopic(_ call: CAPPluginCall) {
        let topicName = call.getString("topic") ?? nil
        
        if topicName != nil {
            call.error("No topic provided")
            return
        }
        Messaging.messaging().subscribe(toTopic: "weather") { error in
            if error != nil {
                call.error("Error to subscribe to topic \(String(describing: topicName))")
            } else {
                call.success([
                    "success": "subscribed to topic \(String(describing: topicName))"
                ])
            }
        }
        
    }
    
    @objc func unsubscribeFrom(_ call: CAPPluginCall) {
        let topicName = call.getString("topic") ?? nil
        
        if topicName != nil {
            call.error("No topic provided")
            return
        }
        
        Messaging.messaging().unsubscribe(fromTopic: topicName!) { error in
            if error != nil {
                call.error("Can't unsubscribe from topic \(String(describing: topicName))")
            } else {
                call.success([
                    "success": "unsubscribed from topic \(String(describing: topicName))"
                ])
            }
        }
    }
    
    @objc func getToken(_ call: CAPPluginCall) {
           InstanceID.instanceID().instanceID { result, error in
               if error != nil {
                   call.error("Failed to get instance FirebaseID", error)
               } else {
                   call.success([
                    "token": result!.token
                   ]);
               }
           }
       }
    
}
