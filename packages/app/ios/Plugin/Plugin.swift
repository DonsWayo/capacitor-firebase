import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseApp)
public class FirebaseApp: CAPPlugin {

    @objc func init(_ call: CAPPluginCall) {
        call.success()
    }
}
