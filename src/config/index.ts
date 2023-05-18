import * as dotenv from 'dotenv';
import { Config } from '../types';

let config:Config;

function loadConfig(){
    dotenv.config();
    const env = process.env; 
    config = {
        firebaseConfig:{
            apiKey: env?.apiKey || '',
            authDomain: env?.authDomain ||'',
            projectId: env?.projectId || '',
            storageBucket: env?.storageBucket || '',
            messagingSenderId: env?.messagingSenderId || '',
            appId: env?.appId || '',
            measurementId: env?.measurementId ||  ''
        }
    } 

    return config;
}

function getConfig():Config{
    if(config) return config;
    return loadConfig();
}

export { getConfig }