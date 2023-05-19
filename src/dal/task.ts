import { DocumentData, addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirebaseDB } from "../integrations";
import { BaseService } from "./types";
import { Task, taskConverter } from "../db";
import { Request } from "express";
import { removeRecord, updateRecord } from "./common";

const COLLECTION_NAME = 'task';
function taskService():BaseService{

    const db = getFirebaseDB();
    const collectionRef = collection(db, COLLECTION_NAME).withConverter(taskConverter);

    async function list(){
        const querySnapshot = await getDocs(collectionRef);
        const data: Array<DocumentData> = [];
        querySnapshot.forEach((doc)=>{
            data.push(doc.data());
        })
        return data;
    }

    async function getById(req: Request){
        const { id } = req.params;
        const docRef = doc(db,COLLECTION_NAME,id).withConverter(taskConverter);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            return docSnap.data();
        }
        console.log("No Data Found.")
    }

    async function create(req: Request){
        try {
            const {description, status} = req.body;
            const task = new Task({description, status});
            const docRef = await addDoc(collectionRef, task);
    
            const data = (await getDoc(docRef)).data();
    
            return data;    
        } catch (error) {
            console.error(`${error}`);
        }
        
    }
    
    async function update(req: Request){
        return updateRecord({dbRef:db, collectionName: COLLECTION_NAME, data: req.body})
    }

    async function remove(req: Request){
        const { id } = req.body;
        return await removeRecord({id, dbRef: db, collectionName: COLLECTION_NAME})
    }

    return {list, getById, create, update, remove} 
}

export {taskService}