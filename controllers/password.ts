import { Request, Response } from 'express';
import { generateOTP, findUser, updateUserPassword } from '../utils/helper';
import { OtpModel } from '../Models/OtpModel';
import { forgotPassword,verificationEmail } from '../mail';

export async function forgotPass(req: Request, res: Response) {
    try {
        const { Email } = req.body;

        if(!Email){
            return res.status(404).json({ success: false, message: "Email needed" })
        }

        const user:any = await findUser(Email);

        if (user) {
            const otp:number = generateOTP();
            await Promise.all([ OtpModel.create({ email: Email, otp, expiresIn: 15 }),forgotPassword(Email,otp)])
            return res.status(200).json({ success: true, message: "Successfully sent OTP" });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error:any) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function verifyOTP(req: Request, res: Response) {
    try {
        const { Email, otp } = req.body;
        if(!Email && otp){
            return res.status(404).json({ success: false, message: "Email and otp needed" })
        }

        const user :any= await findUser(Email);

        if (user) {
            const otpDocument:any = await OtpModel.findOne({ email: Email });

            if (otpDocument && otpDocument.otp === otp.toString() && new Date() < new Date(otpDocument.expiresIn)) {
                await OtpModel.findOneAndDelete({ email: Email });
                return res.status(200).json({ success: true, message: "OTP verified successfully" });
            } else {
                return res.status(400).json({ success: false, message: "Invalid OTP or expired" });
            }
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error:any) {
        console.error('Error in verifyOTP:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function updatePassword(req: Request, res: Response) {
    try {
        const { Email, Password } = req.body;
        if(!Email && Password){
            return res.status(404).json({ success: false, message: "Email and Password needed" })
        }

        await updateUserPassword(Password, Email);

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error:any) {
        console.error('Error in updatePassword:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}


export async function resendOTP(req:Request,res:Response){
    try{
        const {Email} = req.body
        const del = await OtpModel.findOne({email:Email})
        if(del){
            await OtpModel.findOneAndDelete({email:Email})
        }
        const otp = generateOTP()
        await Promise.all([OtpModel.create({email:Email,otp,expiresIn:15}),verificationEmail(Email,otp)])
         

         return res.status(200).json({ success: true, message: "Sent" });
    }catch(error:any){
        console.error('Error in updatePassword:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}