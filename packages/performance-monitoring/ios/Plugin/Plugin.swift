import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebasePerformanceMonitoring)
public class FirebasePerformanceMonitoring: CAPPlugin {

    @objc func performance(_ call: CAPPluginCall) {
        call.success()
    }
}
