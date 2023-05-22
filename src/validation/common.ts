import { Request, Response } from "express";

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

export {validateRequiredRule};