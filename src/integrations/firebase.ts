import { FirebaseApp, initializeApp } from "firebase/app";
import { getConfig } from "../config";
import { Firestore, getFirestore } from "firebase/firestore";


let firebaseApp:FirebaseApp;

function initFirebaseApp():FirebaseApp{
    if(firebaseApp) return firebaseApp;

    // TODO:: check why getConfig() not working as expected
    // const config = getConfig();
    // const { firebaseConfig } = config;
    const firebaseConfig = {
        apiKey: "AIzaSyCA_D5Jn1tN-cEFEHbDuZ7MjiC0JJZRwSU",
        authDomain: "testing-9b403.firebaseapp.com",
        projectId: "testing-9b403",
        storageBucket: "testing-9b403.appspot.com",
        messagingSenderId: "257362910760",
        appId: "1:257362910760:web:d7aba0efdb7861d01b5f1d",
        measurementId: "G-KWSGS3YWBS"
      };
    firebaseApp = initializeApp(firebaseConfig);
    
    return firebaseApp;
}

function getFirebaseDB():Firestore{
    const app = initFirebaseApp(); 
    return getFirestore(app);
}

export {initFirebaseApp, getFirebaseDB}
