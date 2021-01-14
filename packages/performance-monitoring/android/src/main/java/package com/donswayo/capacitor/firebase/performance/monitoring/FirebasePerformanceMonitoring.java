package package com.donswayo.capacitor.firebase.performance.monitoring;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin
public class FirebasePerformanceMonitoring extends Plugin {

    @PluginMethod
    public void init(PluginCall call) {
        call.success();
    }
}
