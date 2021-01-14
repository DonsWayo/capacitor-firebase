#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseCrashlytics, "FirebaseCrashlytics",
           CAP_PLUGIN_METHOD(init, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(testCrash, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setCustomValue, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setUserID, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(logMessage, CAPPluginReturnPromise);
)
