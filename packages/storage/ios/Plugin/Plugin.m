#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseStorage, "FirebaseStorage",
           CAP_PLUGIN_METHOD(getDownloadUrl, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(uploadFile, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(downloadFile, CAPPluginReturnPromise);
)
