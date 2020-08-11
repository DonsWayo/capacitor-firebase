package con.donswayo.capacitor.firebase.auth;

import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseUser;

import java.util.concurrent.Executor;

import static android.content.ContentValues.TAG;

@NativePlugin
public class FirebaseAuth extends Plugin {

    private com.google.firebase.auth.FirebaseAuth mAuth;
    private com.google.firebase.auth.FirebaseAuth.AuthStateListener mAuthListener;

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void initFirebaseAuth(PluginCall call) {
        mAuth = com.google.firebase.auth.FirebaseAuth.getInstance();
        this.onAuthStateChanged();
        call.success();
    }

    @PluginMethod
    public void createUserWithEmailAndPassword(final PluginCall call) {
        String email = call.getString("email");
        String password = call.getString("password");

        if(email == null || password == null) {
            call.error("Email or password are missing");
            return;
        }

        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener((Executor) this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "createUserWithEmail:success");
                            JSObject ret = new JSObject();
                            ret.put("user", mAuth.getCurrentUser());
                            call.success(ret);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w(TAG, "createUserWithEmail:failure", task.getException());
                            call.error("createUserWithEmail:failure", task.getException());
                        }
                    }
                });
    }

    @PluginMethod
    public void signInWithEmailAndPassword(final PluginCall call) {
        String email = call.getString("email");
        String password = call.getString("password");

        if(email == null || password == null) {
            call.error("Email or password are missing");
            return;
        }


        mAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener((Executor) this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            JSObject ret = new JSObject();
                            ret.put("user", mAuth.getCurrentUser());
                            call.success(ret);
                        } else {
                            call.error("signInWithEmail:failure", task.getException());
                        }
                    }
                });
    }

    @PluginMethod
    public void onAuthStateChanged() {
        mAuthListener = new com.google.firebase.auth.FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull com.google.firebase.auth.FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if (user != null ) {
                    Log.e(TAG, "onAuthStateChanged:signed_in" + user.getUid());
                    bridge.triggerWindowJSEvent("onAuthStateChanged", user.toString());
                } else { //user is not logged in
                    Log.e(TAG, "onAuthStateChanged:signed_out");
                    bridge.triggerWindowJSEvent("onAuthStateChanged", "{ 'user': 'null' }");
                }
            }
        };
    }

}
