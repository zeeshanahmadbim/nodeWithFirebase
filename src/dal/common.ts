import { Firestore, deleteDoc, doc, updateDoc } from "firebase/firestore";

type UpdateRecord = {
    dbRef: Firestore,
    collectionName: string,
    data: {id: string} & Record<string, string>
}

type RemoveRecord = { 
    dbRef: Firestore, 
    collectionName: string, 
    id: string }

async function updateRecord({dbRef, collectionName, data}: UpdateRecord){
    const {id, ...localData} = data;
    const docRef = doc(dbRef, collectionName, id);

    try {
        await updateDoc(docRef,localData);  
        return "Data updated";
    } catch (error) {
        console.error(`${error}`)
    }
    
    return;
}

async function removeRecord({id, dbRef, collectionName}: RemoveRecord){
    
      const docRef = doc(dbRef, collectionName, id);

      try {
        await deleteDoc(docRef)
        return "Data Deleted Successfully."
      } catch (error) {
        console.error(`${error}`)
      }
}
    


export { updateRecord, removeRecord }