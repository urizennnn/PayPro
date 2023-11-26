import {Request,Response} from 'express'
import { showClients } from '../../utils/clientQueries';


export const showclients= async(req:Request,res:Response)=>{
try{

    const {Owner} = req.body
   const result = await showClients(Owner)

   res.status(200).json({ success: true, message:result})

}catch(error:any){
         console.error('Error uploading client details:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
}
}