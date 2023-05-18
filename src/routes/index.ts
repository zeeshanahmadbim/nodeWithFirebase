import {Router} from 'express';
import {router as UserRouter} from './users';


export default async ():Promise<Router> => {
    
    const apiRouter = Router();

    apiRouter.use('/user', UserRouter);

    return apiRouter;
}
