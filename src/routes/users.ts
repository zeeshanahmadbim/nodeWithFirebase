import {Request, Response, Router} from 'express';
import { userService } from '../dal';
import { userValidation } from '../validation';

const router = Router();

router.get('',async (req: Request, res: Response) => {
    const service = userService();
    const data = await service.list();
    res.send({ data })
});

router.post('',async (req: Request, res: Response)=>{
    const validation = userValidation(req, res);
    const errors  = validation.createUserValidation();

    if(errors) return

    const service = userService();
    const response = await service.create(req);

    res.send({response})
});

router.get('/:id',async (req: Request, res: Response)=>{
    const service = userService();
    const data = await service.getById(req);
    if(data){
        res.send({data})
        return
    }
    res.status(404).send({message: "Data not found"})
})

router.put('', async (req: Request, res: Response)=>{
    const service = userService();
    const data = await service.update(req)
    
    if(data){
        res.send({data})
        return
    }
    res.status(404).send({message: "Data not found"});
})

router.delete('',async (req: Request, res: Response)=>{
    const service = userService();
    const data = await service.remove(req)
    
    if(data){
        res.send({data})
        return
    }
    res.status(404).send({message: "Something went wrong."});
})

export { router };