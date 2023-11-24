import {Request,Response} from 'express'
import { findUser,LoginUser } from '../utils/helper'

export const loginUser = async(req:Request,res:Response)=>{
    try{
        
        const {Email,Password} = req.body
const user:any = await findUser(Email)

if(!user){
    res.status(400).json({'success':false,'message':"User does not exist"})
}

const check:any = await LoginUser(Email)

if(check === Password){
    res.status(200).json({'success':true,'message':"User logged In","user":user})
    }

}catch(error:any){
    console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
}

}