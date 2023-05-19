import express,{Express} from 'express';
import createApiRoutes from './routes';
import cors from 'cors';

let app:Express;

async function useRestRoutes(){
    const routes = await createApiRoutes();
    app.use('/api',routes)
}

function start(){
    if(app){
        return app;
    }
    app = express();
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded());
    useRestRoutes();   

    return app;
}
export { app,start };