import { Request, Response } from "express";

function userValidation(req: Request, res: Response){
    function createUserValidation(){
        const required = ["firstName", "lastName", "gender"];
        const errors = validateRequiredRule(req, required);
        if(errors){
            res.status(400).send({errors})
        }
        return errors;
    }
    return {createUserValidation}
}

function validateRequiredRule(req: Request, rule: Array<string>):Record<string,string> | undefined{
    const data = req.body;
    const keys = Object.keys(data);
    const notFollowedRule = rule.filter(requiredField => !(keys.includes(requiredField)));
    const errors:Record<string, string> = {};
    
    if(notFollowedRule.length < 1) return

    notFollowedRule.forEach(rule => {
        errors[rule] = 'required.';
    })
    
    return errors;
}

export {userValidation};