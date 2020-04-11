import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Request, Response } from 'express';

import Router from './routes/index';            //To import the Router (index.ts) from the routes folder
import './database';                            //To connect to MongoDB Database


//INITIALIZATIONS
const app: express.Application = express();     //We create an Express application
const serverport: number = 3000;                //Port 3000 set at Server


//SETTINGS AND MIDDLEWARES
app.set('port', serverport);

app.use(express.json());                        //To interpret incoming JSONs
app.use(express.urlencoded({'extended': false})); //To interpret HTML Forms
app.use(morgan('dev'));                         //To print at the Console the HTTP requests
app.use(cors());                                //To use CORS in HTTP


//ROUTES
app.get('/test', (req: Request, res: Response) => {
    res.send(`Hello World! I'm listening at port ${app.get('port')}`);
});

app.use('', Router);                            //We will use the Router defined in routes/index.ts for the rest of the


//SERVER START
app.listen(app.get('port'), () => {
    console.log(`\nServer listening at port ${app.get('port')}`);
});