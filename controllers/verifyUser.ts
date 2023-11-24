import { Request, Response } from 'express';
import { OtpModel } from '../Models/OtpModel';
import { findUser } from '../utils/helper';

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { Email, otp } = req.params;
        const find = await OtpModel.findOne({ email: Email });
        const now = new Date().getMinutes();

        if (find?.otp === otp && now < find?.expiresIn) {
            const user:any = await findUser(Email);

            if (user) {
                user.isVerified = true;
               await Promise.all([OtpModel.findOneAndDelete({email:Email}), user.save()])
                
            }

            res.status(200).json({ success: true, message: "Email verified" })
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP or expired" });
        }
    } catch (error:any) {
        console.error('Error verifying user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
