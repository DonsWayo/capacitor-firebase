package com.donswayo.capacitor.firebase.storage;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FileDownloadTask;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.File;
import java.io.IOException;

@NativePlugin
public class FirebaseStorage extends Plugin {
    private com.google.firebase.storage.FirebaseStorage storage;

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void initStorage(PluginCall call) {
        storage = com.google.firebase.storage.FirebaseStorage.getInstance();
        call.success();
    }

    @PluginMethod
    public void getDownloadUrl(final PluginCall call) {
        String ref = call.getString("ref");

        if(ref != null) {
            call.error("Ref is missing");
            return;
        }

        StorageReference storageRef = storage.getReference();

        storageRef.child(ref).getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
            @Override
            public void onSuccess(Uri uri) {
                // Got the download URL for 'users/me/profile.png'
                JSObject ret = new JSObject();
                ret.put("url", uri);
                call.success(ret);
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception exception) {
                // Handle any errors
                Log.d("FIREBASE_STORAGE", String.valueOf(exception));
                call.error(String.valueOf(exception));
            }
        });
    }

    @PluginMethod
    public void downloadFile(final PluginCall call) throws IOException {
        String filePath = call.getString("filePath");
        String fileRef = call.getString("fileRef");

        if(filePath != null || fileRef!= null ) {
            call.error("filePath or fileRef is missing");
            return;
        }

        StorageReference storageRef = storage.getReference();
        StorageReference ref = storageRef.child(fileRef);

        File localFile = File.createTempFile(filePath, fileRef);

        ref.getFile(localFile).addOnSuccessListener(new OnSuccessListener<FileDownloadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(FileDownloadTask.TaskSnapshot taskSnapshot) {
                // Local temp file has been created
                JSObject ret = new JSObject();
                ret.put("success", taskSnapshot);
                call.success(ret);
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception exception) {
                // Handle any errors
                Log.d("FIREBASE_STORAGE", String.valueOf(exception));
                call.error(String.valueOf(exception));
            }
        });

    }

    @PluginMethod
    public void uploadFile(final PluginCall call) throws IOException {
        String filePath = call.getString("filePath");
        String fileRef = call.getString("fileRef");

        if(filePath != null || fileRef!= null ) {
            call.error("filePath or fileRef is missing");
            return;
        }

        StorageReference storageRef = storage.getReference();
        Uri file = Uri.fromFile(new File(filePath));
        StorageReference riversRef = storageRef.child(fileRef);
        UploadTask uploadTask = riversRef.putFile(file);

        // Register observers to listen for when the download is done or if it fails
        uploadTask.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception exception) {
                // Handle unsuccessful uploads
                Log.d("FIREBASE_STORAGE", String.valueOf(exception));
                call.error(String.valueOf(exception));
            }
        }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                // taskSnapshot.getMetadata() contains file metadata such as size, content-type, etc.
                // ...
                JSObject ret = new JSObject();
                ret.put("success", taskSnapshot.getMetadata());
                call.success(ret);
            }
        });

    }
}
