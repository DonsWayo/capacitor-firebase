#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseAnalytics, "FirebaseAnalytics",
           CAP_PLUGIN_METHOD(initAnalytics, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setUserID, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetAnalyticsData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(logEvent, CAPPluginReturnPromise);
)
