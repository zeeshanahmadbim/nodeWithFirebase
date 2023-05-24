import { FirebaseApp, initializeApp } from "firebase/app";
import { getConfig } from "../config";
import { Firestore, getFirestore } from "firebase/firestore";


let firebaseApp:FirebaseApp;

function initFirebaseApp():FirebaseApp{
    if(firebaseApp) return firebaseApp;

    const config = getConfig();
    const { firebaseConfig } = config;
    firebaseApp = initializeApp(firebaseConfig);
    
    return firebaseApp;
}

function getFirebaseDB():Firestore{
    const app = initFirebaseApp(); 
    return getFirestore(app);
}

export {initFirebaseApp, getFirebaseDB}
