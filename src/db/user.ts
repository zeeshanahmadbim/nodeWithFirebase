import { DocumentData, DocumentSnapshot, SnapshotOptions } from "firebase/firestore";

interface IUser{
    id?: string
    firstName: string
    lastName: string
    gender: string
}

class User implements IUser{
    public id;
    public firstName;
    public lastName;
    public gender;

    constructor({id, firstName, lastName, gender}: IUser){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }

    toString() {
        return this.firstName + ', ' + this.lastName + ', ' + this.gender;
    }

    fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}

// Firestore data converter
const userConverter = {
    toFirestore: (user: User): DocumentData => {
        delete user['id'];
        return {...user};
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions): User => {
        const data = snapshot.data(options);
        return {id: snapshot.id, ...data} as User;
    }
};

export {User, userConverter}