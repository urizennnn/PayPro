import {Document} from 'mongoose'

export interface Otp extends Document{
    otp:number,
    expiresIn:number,
    email:string
}