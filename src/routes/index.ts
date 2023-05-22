import {Router} from 'express';
import {router as UserRouter} from './users';
import {router as TaskRouter } from './tasks';


export default async ():Promise<Router> => {
    
    const apiRouter = Router();

    apiRouter.use('/user', UserRouter);
    apiRouter.use('/task', TaskRouter);

    return apiRouter;
}
