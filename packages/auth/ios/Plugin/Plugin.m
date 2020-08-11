#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(FirebaseAuth, "FirebaseAuth",
           CAP_PLUGIN_METHOD(createUserWithEmailAndPassword, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(signInWithEmailAndPassword, CAPPluginReturnPromise);
            CAP_PLUGIN_METHOD(onAuthStateChanged, CAPPluginReturnWatch);
)
