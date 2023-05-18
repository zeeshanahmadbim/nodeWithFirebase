import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import {BaseService} from './types';
import { getFirebaseDB } from '../integrations';
import { Request } from 'express';


function userService():BaseService{
    const db = getFirebaseDB();
    const collectionRef = collection(db, "users");
    
    async function list(){
            const querySnapshot = await getDocs(collectionRef);
            const data: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()});
            });

        return data;
    }

    async function getById(req: Request){
      const { id } = req.params;

      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        return docSnap.data();
      }
      
      console.error("No data found");
    }

    async function create(req: Request){
        try {
            const {firstName, lastName, gender} = req.body;

            const docRef = await addDoc(collectionRef, {
              firstName, lastName, gender
            });

            return docRef.id;
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
    
    async function update(req: Request){
        const {id, ...data} = req.body;
        const docRef = doc(db, "users", id);
        try {
          await updateDoc(docRef,data);  
          return "Data updated";
        } catch (error) {
          console.error(`${error}`)
        }
        
        return;
    }
    
    async function remove(req: Request){
      const { id } = req.body;
      const docRef = doc(db, "users", id);

      try {
        await deleteDoc(docRef)
        return "Data Deleted Successfully."
      } catch (error) {
        console.error(`${error}`)
      }
    }

    return {list, getById, create, update, remove}
}

export {userService}
