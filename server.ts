import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ConnectSQL } from './Database/SQLconnection';
import Registrouter from './Router/regist';

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cookieParser(process.env.JWT_SECRET));
server.use(morgan('dev'));
server.use('/user', Registrouter);

server.all('/', (req: Request, res: Response) => {
  res.send('Working');
});

(async () => {
  try {
     ConnectSQL();
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
