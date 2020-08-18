package com.donswayo.capacitor.firebase;

import android.os.Bundle;

import com.donswayo.capacitor.firebase.crashlytics.FirebaseCrashlytics;
import com.donswayo.capacitor.firebase.firestore.FirebaseFirestore;
import com.donswayo.capacitor.firebase.storage.FirebaseStorage;
import com.donswayo.plugins.com.analytics.FirebaseAnalytics;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import con.donswayo.capacitor.firebase.auth.FirebaseAuth;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(FirebaseAnalytics.class);
      add(FirebaseAuth.class);
      add(FirebaseFirestore.class);
      add(FirebaseCrashlytics.class);
      add(FirebaseStorage.class);
    }});
  }
}
