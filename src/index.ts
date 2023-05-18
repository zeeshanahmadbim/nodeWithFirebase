import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getConfig } from './config';
import { start } from './app';
import { getFirebaseDB } from "./integrations";

const db = getFirebaseDB();
// addData();
// readData();

async function run(){
  const app = await start();
  app.listen(3000,()=>{
    console.log("App is listening on port 3000")
  })
}

run().then(()=>{
  console.log("App is up and running");
})

async function readData(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log({[doc.id] :doc.data()});
  });
}

async function addData(){
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

