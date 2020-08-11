package com.donswayo.capacitor.firebase.cloud.messaging;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.donswayo.capacitor.firebase.cloud.messaging.cloudmessaging.R;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.messaging.FirebaseMessaging;

import static android.content.ContentValues.TAG;

@NativePlugin
public class FirebaseCloudMessaging extends Plugin {

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void subscribeToTopic(final PluginCall call) {
        final String topic = call.getString("topic");

        if(topic == null) {
            call.error("No topic provided");
        }

        FirebaseMessaging.getInstance().subscribeToTopic(topic)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (!task.isSuccessful()) {
                            call.error("subscribeToTopic failed", task.getException());
                            return;
                        }
                        JSObject ret = new JSObject();
                        ret.put("success", "Subscribed to topic");
                        call.success(ret);

                    }
                });
    }

    @PluginMethod
    public void unsubscribeFromTopic(final PluginCall call) {
        final String topic = call.getString("topic");

        if(topic == null) {
            call.error("No topic provided");
        }

        FirebaseMessaging.getInstance().unsubscribeFromTopic(topic)
                .addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if (!task.isSuccessful()) {
                            call.error("unsubscribeFromTopic failed", task.getException());
                            return;
                        }
                        JSObject ret = new JSObject();
                        ret.put("success", "unsubscribeFromTopic to topic");
                        call.success(ret);

                    }
                });
    }

    @PluginMethod()
    public void getToken(final PluginCall call) {
        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if (!task.isSuccessful()) {
                            call.error("getToken failed", task.getException());
                            return;
                        }
                        String token = task.getResult().getToken();
                        JSObject ret = new JSObject();
                        ret.put("token", token);
                        call.success(ret);
                    }
                });
    }
}
