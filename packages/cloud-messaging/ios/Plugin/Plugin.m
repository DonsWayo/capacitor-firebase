#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseCloudMessaging, "FirebaseCloudMessaging",
           CAP_PLUGIN_METHOD(init, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(didRegisterWithToken, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(subscribeToTopic, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unsubscribeFrom, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getToken, CAPPluginReturnPromise);
)
