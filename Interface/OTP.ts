import {Document} from 'mongoose'

export interface Otp extends Document{
    otp:string,
    expiresIn:string,
    email:string
}