import { DocumentData, DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

interface ITask{
    id?: string
    description: string
    status: string
    date?: string
}

class Task implements ITask{
    public id;
    public description;
    public status;
    public date;

    constructor({id, description, status, date}: ITask){
        this.id = id;
        this.description = description;
        this.status = status;
        this.date = date;
    }

    toString() {
        return this.description + ', ' + this.status + ', ' + this.date;
    }

    fullName(){
        return `${this.description} ${this.status}`;
    }
}

// Firestore data converter
const taskConverter = {
    toFirestore: (task: Task): DocumentData => {
        delete task['id'];
        return {...task};
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions): Task => {
        const data = snapshot.data(options);
        return {id: snapshot.id, ...data} as Task;
    }
};

export {Task, taskConverter}