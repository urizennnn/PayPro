import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ConnectSQL } from './Database/SQLconnection';
import { Mongoconnect } from './Database/MongoConnection';
import Registrouter from './Router/regist';
import {config} from 'dotenv'
import fileUpload = require('express-fileupload');
import ClientRouter from './Router/client'
import cors from 'cors'
import OpenAi from './Router/Bot'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

config()
export const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cors())
server.use(fileUpload({useTempFiles:true}))
server.use(cookieParser(process.env.JWT_SECRET));
server.use(morgan('dev'));
server.use('/user', Registrouter);
server.use('/client',ClientRouter)
server.use('/OpenAi',OpenAi)

server.all('/', (req: Request, res: Response) => {
  res.send('Working');
});

(async () => {
  try {
     ConnectSQL();
     await Mongoconnect(process.env.MONGO as string)
    const app = server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    process.on('SIGINT', () => {
      console.log('Shutting down...');
      app.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });
  } catch (error:any) {
    console.error('Error connecting to the database:', error.message);
  }
})();
