import { Document } from "mongoose";

export interface Invoceinterface extends Document{
    otp:number,
    expiresIn:number,
    email:string
}