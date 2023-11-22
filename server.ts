import express, {Request,Response} from 'express'
import morgan from 'morgan'
import { ConnectSQL } from './Database/SQLconnection'
import cookieParser from 'cookie-parser'

const server = express()
const PORT = process.env.PORT || 5000

server.use(cookieParser(process.env.JWT_SECRET))
server.use(morgan('dev'))
server.all('/',(req:Request,res:Response)=>{
    res.send('Working')
})

server.listen(PORT,()=>{
    ConnectSQL()
    console.log(`Server listening on localhost:${PORT}`)
})