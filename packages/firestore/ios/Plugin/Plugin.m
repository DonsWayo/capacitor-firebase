#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseFirestore, "FirebaseFirestore",
           CAP_PLUGIN_METHOD(initFirestore, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addDocument, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDocuments, CAPPluginReturnPromise);
)
