import { Request, Response } from 'express';
import { OtpModel } from '../Models/OtpModel';
import { findUser } from '../utils/helper';

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const { Email, otp } = req.params;
        const find = await OtpModel.findOne({ email: Email });

        if (find?.otp.toString() === otp && new Date() < new Date(find?.expiresIn)) {
            const user: any = await findUser(Email);

            if (user) {
                user.isVerified = true;
                
                try {
                    await Promise.all([OtpModel.findOneAndDelete({ email: Email })]);
                    res.status(200).json({ success: true, message: "Email verified" });
                } catch (saveError:any) {
                    console.error('Error saving user:', saveError);
                    res.status(500).json({ success: false, error: saveError.message });
                }
            } else {
                res.status(400).json({ success: false, message: "User not found" });
            }
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP or expired" });
        }
    } catch (error: any) {
        console.error('Error verifying user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
