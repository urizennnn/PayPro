import {Document} from 'mongoose'

export interface Otp extends Document{
    otp:string,
    expiresIn:number,
    email:string
}