package com.donswayo.capacitor.firebase.crashlytics;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

@NativePlugin
public class FirebaseCrashlytics extends Plugin {

    private com.google.firebase.crashlytics.FirebaseCrashlytics mFirebaseCrashlytics;

    @PluginMethod
    public void initCrashlytics(PluginCall call) {
        mFirebaseCrashlytics = com.google.firebase.crashlytics.FirebaseCrashlytics.getInstance();
        call.success();
    }

    @PluginMethod
    public void testCrash(PluginCall call) {
        call.success();
        throw new RuntimeException("Test Crash"); // Force a crash
    }

    @PluginMethod
    public void logMessage(PluginCall call) {
        String message = call.getString("message");

        if (message == null) {
            call.error("Message is missing!");
            return;
        }

        mFirebaseCrashlytics.log(message);
        call.success();
    }

    @PluginMethod
    public void setCustomValue(PluginCall call) throws JSONException {
        JSObject options = call.getObject("options");
        String type;

        if (options == null) {
            call.error("options are missing!");
            return;
        }

        if(options.getString("type") == null ) {
            type = "string";
        } else {
            type = options.getString("type");
        }

        switch (type) {
            case "int":
                mFirebaseCrashlytics.setCustomKey(options.getString("forKey"), options.getInt("value"));
                break;
            case "boolean":
                mFirebaseCrashlytics.setCustomKey(options.getString("forKey"), options.getBoolean("value"));
                break;
            case "double":
                mFirebaseCrashlytics.setCustomKey(options.getString("forKey"), options.getDouble("value"));
                break;
            default:
                mFirebaseCrashlytics.setCustomKey(options.getString("forKey"), options.getString("value"));
                break;

        }

        call.success();
    }

    @PluginMethod
    public void setUserId(PluginCall call) {
        String userId = call.getString("userId");

        if (userId == null) {
            call.error("UserId is missing!");
            return;
        }

        mFirebaseCrashlytics.setUserId("12345");
        call.success();
    }

}
