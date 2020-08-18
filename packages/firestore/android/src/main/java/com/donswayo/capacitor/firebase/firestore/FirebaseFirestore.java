package com.donswayo.capacitor.firebase.firestore;

import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Arrays;

import static android.content.ContentValues.TAG;



@NativePlugin
public class FirebaseFirestore extends Plugin {
    private com.google.firebase.firestore.FirebaseFirestore db;


    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void initFirestore(PluginCall call) {
        db = com.google.firebase.firestore.FirebaseFirestore.getInstance();
        call.success();
    }

    @PluginMethod
    public void addDocument(final PluginCall call) {
        String collection = call.getString("collection");
        JSObject document = call.getObject("document");

        if (collection == null || document == null) {
            call.error("Collection or document are missing");
            return;
        }

        try {
            db.collection(collection)
                    .add(document)
                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                        @Override
                        public void onSuccess(DocumentReference documentReference) {

                            JSObject ret = new JSObject();
                            ret.put("doc", documentReference);
                            call.success(ret);
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            call.error(e.getLocalizedMessage());
                        }
                    });

        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getAllDocuments(final PluginCall call) {
        String collection = call.getString("collection");

        if (collection == null) {
            call.error("Collection is missing");
            return;
        }

        try {
            db.collection(collection)
                    .get()
                    .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<QuerySnapshot> task) {
                            onDocsCompleted(task, call);
                        }
                    });

        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getDocuments(final PluginCall call) {
        String collection = call.getString("collection");
        JSObject where = call.getObject("where");
        JSObject order = call.getObject("order");
        Integer limit =  call.getInt("limit");

        if (collection == null) {
            call.error("Collection is missing");
            return;
        }

        try {
            if(where != null && order == null && limit == null) {
                if (where.has("value") && where.has("compare") && where.has("on") ) {
                    call.error("value or compare or on are missing");
                    return;
                }
                switch(where.getString("compare")) {
                    case "<":
                        db.collection(collection)
                                .whereLessThan(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "<=":
                        db.collection(collection)
                                .whereLessThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "==":
                        db.collection(collection)
                                .whereEqualTo(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case ">":
                        db.collection(collection)
                                .whereGreaterThan(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "=>":
                        db.collection(collection)
                                .whereGreaterThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains":
                        db.collection(collection)
                                .whereArrayContains(where.getString("value"), where.getString("on"))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "in":
                        db.collection(collection)
                                .whereIn(where.getString("value"), Arrays.asList(where.getString("on")))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains-any":
                        db.collection(collection)
                                .whereArrayContainsAny(where.getString("value"), Arrays.asList(where.getString("on")))
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    default:
                        db.collection(collection)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                }
            }

            if(where != null && order != null && limit == null) {
                Query.Direction desc = Query.Direction.DESCENDING;
                if (where.has("value") && where.has("compare") && where.has("on") ) {
                    call.error("value or compare or on are missing");
                    return;
                }
                if (order.has("by") && order.has("descending") ) {
                    call.error("by or descending or on are missing");
                    return;
                }
                if(order.getBool("descending") == false) {
                    desc = Query.Direction.ASCENDING;
                }
                switch(where.getString("compare")) {
                    case "<":
                        db.collection(collection)
                                .whereLessThan(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "<=":
                        db.collection(collection)
                                .whereLessThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "==":
                        db.collection(collection)
                                .whereEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case ">":
                        db.collection(collection)
                                .whereGreaterThan(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "=>":
                        db.collection(collection)
                                .whereGreaterThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains":
                        db.collection(collection)
                                .whereArrayContains(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "in":
                        db.collection(collection)
                                .whereIn(where.getString("value"), Arrays.asList(where.getString("on")))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains-any":
                        db.collection(collection)
                                .whereArrayContainsAny(where.getString("value"), Arrays.asList(where.getString("on")))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    default:
                        db.collection(collection)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                }
            }

            if(where != null && order != null && limit != null) {
                Query.Direction desc = Query.Direction.DESCENDING;
                if (where.has("value") && where.has("compare") && where.has("on") ) {
                    call.error("value or compare or on are missing");
                    return;
                }
                if (order.has("by") && order.has("descending") ) {
                    call.error("by or descending or on are missing");
                    return;
                }
                if(order.getBool("descending") == false) {
                    desc = Query.Direction.ASCENDING;
                }
                switch(where.getString("compare")) {
                    case "<":
                        db.collection(collection)
                                .whereLessThan(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "<=":
                        db.collection(collection)
                                .whereLessThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "==":
                        db.collection(collection)
                                .whereEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case ">":
                        db.collection(collection)
                                .whereGreaterThan(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "=>":
                        db.collection(collection)
                                .whereGreaterThanOrEqualTo(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains":
                        db.collection(collection)
                                .whereArrayContains(where.getString("value"), where.getString("on"))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "in":
                        db.collection(collection)
                                .whereIn(where.getString("value"), Arrays.asList(where.getString("on")))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    case "array-contains-any":
                        db.collection(collection)
                                .whereArrayContainsAny(where.getString("value"), Arrays.asList(where.getString("on")))
                                .orderBy(order.getString("by"), desc)
                                .limit(limit)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                        break;
                    default:
                        db.collection(collection)
                                .get()
                                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                    @Override
                                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                        onDocsCompleted(task, call);
                                    }
                                });
                }
            }

        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    @PluginMethod
    public void getDocument(final PluginCall call) {
        String collection = call.getString("collection");
        String document = call.getString("String");

        if (collection == null || document == null) {
            call.error("Collection or document are missing");
            return;
        }

        try {
            DocumentReference docRef = db.collection(collection).document(document);
            docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                @Override
                public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                    if (task.isSuccessful()) {
                        DocumentSnapshot document = task.getResult();
                        if (document.exists()) {
                            Log.d(TAG, "DocumentSnapshot data: " + document.getData());
                            JSObject ret = new JSObject();
                            ret.put("doc", document.getData());
                            call.success(ret);
                        } else {
                            Log.d(TAG, "No such document");
                            call.error("No such document");
                        }
                    } else {
                        Log.d(TAG, "get failed with ", task.getException());
                        call.error(task.getException().getMessage());
                    }
                }
            });

        } catch (Exception ex) {
            call.error(ex.getLocalizedMessage());
        }
    }

    private void onDocsCompleted(Task<QuerySnapshot> task, PluginCall call) {
        if (task.isSuccessful()) {
            JSObject ret = new JSObject();
            ret.put("docs", task.getResult());
            call.success(ret);
        } else {
            call.error(task.getException().getMessage());
        }
    }

}
