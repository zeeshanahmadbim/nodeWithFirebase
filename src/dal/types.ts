import { Request } from "express";
import { DocumentData } from "firebase/firestore";
import { User } from "../db";

export type BaseService = {
    list:()=> Promise<DocumentData[]>,
    create:(req: Request)=>Promise<User | undefined>,
    update:(req: Request)=>Promise<DocumentData | undefined | void | string>,
    remove:(req: Request)=>Promise<string | undefined>,
    getById:(req: Request)=>Promise<DocumentData | undefined>
}