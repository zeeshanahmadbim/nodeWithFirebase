import { Request, Response } from "express";
import { validateRequiredRule } from "./common";

function taskValidation(req: Request, res: Response){
    function createTaskValidation(){
        const required = ["description"];
        const errors = validateRequiredRule(req, required);
        if(errors){
            res.status(400).send({errors})
        }
        return errors;
    }
    return { createTaskValidation }
}


export {taskValidation};