import { Schema,model } from "mongoose";
import { Otp } from "../Interface/OTP";

const OtpSchema = new Schema<Otp>({
    otp:{type:Number,required:true},
    expiresIn:{type:Number,required:true},
    email:{type:String,required:true}
})

export const OtpModel = model<Otp>('Otp',OtpSchema)