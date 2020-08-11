import Foundation
import Capacitor
import Firebase


enum MyError: Error {
    case runtimeError(String)
}
/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FirebaseFirestore)
public class FirebaseFirestore: CAPPlugin {
    
    let db = Firestore.firestore()
    
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.success([
            "value": value
        ])
    }
    
    
    @objc func addDocument(_ call: CAPPluginCall) {
        let collection = call.getString("collection") ?? nil
        let document = call.getObject("document") ?? nil
        
        if collection != nil || document != nil {
            call.error("collection or document are missing")
            return
        }
        
        var ref: DocumentReference? = nil
        ref = db.collection(collection!).addDocument(data: document!) { err in
            if let err = err {
                call.error(err.localizedDescription)
            } else {
                call.success(["document": ref!])
            }
        }
    }
    
    @objc func getDocuments(_ call: CAPPluginCall) {
        let collection = call.getString("collection") ?? nil
        let `where` = call.getObject("collection") ?? nil
        let order = call.getObject("order") ?? nil
        let limit = call.getInt("limit") ?? nil
        
        if collection != nil {
            call.error("collection or document are missing")
            return
        }
        
        
        if collection != nil && !(`where` != nil) && !(order != nil) && !(limit != nil) {
            db.collection(collection!).getDocuments() { (querySnapshot, err) in
                if let err = err {
                    call.error(err.localizedDescription)
                } else {
                    call.success(["docs": querySnapshot!.documents])
                }
            }
        }
        if collection != nil && `where` != nil && !(order != nil) && !(limit != nil) {
            let comparaVelue = `where`!["compare"] as! String
            let onValue = `where`!["on"] ?? nil
            
            if comparaVelue.count > 0 || onValue != nil {
                call.error("compare or on are missing")
                return
            }
            
            switch comparaVelue {
            case "<":
                db.collection(collection!).whereField(comparaVelue, isLessThan: onValue!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
                
            case "<=":
                db.collection(collection!).whereField(comparaVelue, isLessThanOrEqualTo: onValue!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
                
            case ">":
                db.collection(collection!).whereField(comparaVelue, isGreaterThan: onValue!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
            case ">=":
                db.collection(collection!).whereField(comparaVelue, isGreaterThanOrEqualTo: onValue!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
                
            case "array-contains":
                db.collection(collection!).whereField(comparaVelue, arrayContains:onValue!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
            case "in":
                db.collection(collection!).whereField(comparaVelue, in:onValue! as! [Any]).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
                
            case "array-contains-any":
                db.collection(collection!).whereField(comparaVelue, arrayContainsAny: onValue! as! [Any]).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
                
            default:
                db.collection(collection!).getDocuments() { (querySnapshot, err) in
                    if let err = err {
                        call.error(err.localizedDescription)
                    } else {
                        call.success(["docs": querySnapshot!.documents])
                    }
                }
            }
            
            
            if collection != nil && `where` != nil && order != nil && !(limit != nil) {
                let orderByValue = order!["by"] as! String
                let orderDescendingValue = order!["descending"] as! Bool
                let comparaVelue = `where`!["compare"] as! String
                let onValue = `where`!["on"] ?? nil
                
                if comparaVelue.count > 0 || onValue != nil {
                    call.error("compare or on are missing")
                    return
                }
                
                if orderByValue.count > 0 {
                    call.error("by or descending are missing")
                    return
                }
                
                switch comparaVelue {
                case "<":
                    db.collection(collection!).whereField(comparaVelue, isLessThan: onValue!).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "<=":
                    db.collection(collection!).whereField(comparaVelue, isLessThanOrEqualTo: onValue!).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case ">":
                    db.collection(collection!).whereField(comparaVelue, isGreaterThan: onValue!).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                case ">=":
                    db.collection(collection!).whereField(comparaVelue, isGreaterThanOrEqualTo: onValue!).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "array-contains":
                    db.collection(collection!).whereField(comparaVelue, arrayContains:onValue!).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                case "in":
                    db.collection(collection!).whereField(comparaVelue, in:onValue! as! [Any]).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "array-contains-any":
                    db.collection(collection!).whereField(comparaVelue, arrayContainsAny: onValue! as! [Any]).order(by: orderByValue, descending: orderDescendingValue).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                default:
                    db.collection(collection!).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                }
                
            }
            
            if collection != nil && `where` != nil && order != nil && limit != nil {
                let orderByValue = order!["by"] as! String
                let orderDescendingValue = order!["descending"] as! Bool
                let comparaVelue = `where`!["compare"] as! String
                let onValue = `where`!["on"] ?? nil
                
                if comparaVelue.count > 0 || onValue != nil {
                    call.error("compare or on are missing")
                    return
                }
                
                if orderByValue.count > 0 {
                    call.error("by or descending are missing")
                    return
                }
                
                if limit != Int() {
                    call.error("Limit need to be a number")
                    return
                }
                
                
                switch comparaVelue {
                case "<":
                    db.collection(collection!)
                        .whereField(comparaVelue, isLessThan: onValue!)
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "<=":
                    db.collection(collection!)
                        .whereField(comparaVelue, isLessThanOrEqualTo: onValue!)
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case ">":
                    db.collection(collection!)
                        .whereField(comparaVelue, isGreaterThan: onValue!)
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                case ">=":
                    db.collection(collection!)
                        .whereField(comparaVelue, isGreaterThanOrEqualTo: onValue!)
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "array-contains":
                    db.collection(collection!)
                        .whereField(comparaVelue, arrayContains:onValue!)
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                case "in":
                    db.collection(collection!)
                        .whereField(comparaVelue, in:onValue! as! [Any])
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                case "array-contains-any":
                    db.collection(collection!)
                        .whereField(comparaVelue, arrayContainsAny: onValue! as! [Any])
                        .order(by: orderByValue, descending: orderDescendingValue)
                        .limit(to: limit!)
                        .getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                    
                default:
                    db.collection(collection!).getDocuments() { (querySnapshot, err) in
                        if let err = err {
                            call.error(err.localizedDescription)
                        } else {
                            call.success(["docs": querySnapshot!.documents])
                        }
                    }
                }
                
            }
        }
    }
}
