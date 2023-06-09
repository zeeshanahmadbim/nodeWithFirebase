import { DocumentData, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import {BaseService} from './types';
import { getFirebaseDB } from '../integrations';
import { Request } from 'express';
import { User, userConverter } from '../db';
import { updateRecord } from './common';

const COLLECTION_NAME = 'users';

function userService():BaseService{
    const db = getFirebaseDB();
    const collectionRef = collection(db, COLLECTION_NAME).withConverter(userConverter);
    
    async function list(){
            const querySnapshot = await getDocs(collectionRef);
            const data: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
              data.push(doc.data());
            });

        return data;
    }

    async function getById(req: Request){
      const { id } = req.params;

      const docRef = doc(db, COLLECTION_NAME, id).withConverter(userConverter);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        return docSnap.data();
      }
      
      console.error("No data found");
    }

    async function create(req: Request){
        try {
            const {firstName, lastName, gender} = req.body;
            const user = new User({firstName, lastName, gender});

            const docRef = await addDoc(collectionRef, user);
            const data = (await getDoc(docRef)).data();

            return data;
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
    
    async function update(req: Request){
      return updateRecord({dbRef:db, collectionName: COLLECTION_NAME, data: req.body});
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
