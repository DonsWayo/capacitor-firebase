package com.donswayo.plugins.com.analytics;

import android.Manifest;
import android.app.Activity;
import android.os.Bundle;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

@NativePlugin(
        permissions = {
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.INTERNET,
                Manifest.permission.WAKE_LOCK,
        }
)
public class FirebaseAnalytics extends Plugin {
    private com.google.firebase.analytics.FirebaseAnalytics mFirebaseAnalytics;

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void init(PluginCall call) {
        mFirebaseAnalytics = com.google.firebase.analytics.FirebaseAnalytics.getInstance(this.bridge.getActivity());
        call.success();
    }

    @PluginMethod
    public void setUserId(PluginCall call) {
        try {
            String userId = call.getString("userId");

            if (mFirebaseAnalytics == null) {
                call.error("Analytics are not init");
            }

            if(userId != null) {
                mFirebaseAnalytics.setUserId(userId);
                call.success();
            } else {
                call.error("userId is missing");
            }
        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void logEvent(PluginCall call) {
        try {
            String name = call.getString("name");
            JSObject params = call.getObject("params", new JSObject());

            if (mFirebaseAnalytics == null) {
                call.error("Analytics are not init");
            }

            if(name != null && params != null) {
                Bundle paramsData =  jsonToBundle(params);
                mFirebaseAnalytics.logEvent(name, paramsData);
                call.success();
            } else {
                call.error("name or params are missing");
            }

        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void reset(PluginCall call) {
        try {
            if (mFirebaseAnalytics == null) {
                call.error("Analytics are not init");
            }

            mFirebaseAnalytics.resetAnalyticsData();
            call.success();
        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    public static Bundle jsonToBundle(JSONObject jsonObject) throws JSONException {
        Bundle bundle = new Bundle();
        Iterator iter = jsonObject.keys();
        while(iter.hasNext()){
            String key = (String)iter.next();
            String value = null;
            try {
                value = jsonObject.getString(key);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            bundle.putString(key,value);
        }
        return bundle;
    }

}


