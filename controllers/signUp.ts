import { Request, Response } from "express";
import { insertData,generateRefreshToken ,generateExpirationTime,generateOTP} from "../utils/helper";
import { OtpModel } from "../Models/OtpModel";

export const SignUser = async (req: Request, res: Response) => {
    try {
        const { Email, BName, Password }: Record<string, string> = req.query as Record<string, string>;
        const otp = generateOTP();
        const expiration = generateExpirationTime(15);
        if (!Email || !BName || !Password) {
            return res.status(400).json({ success: false, message: 'Bad Request: Missing required parameters' });
        }

        const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        const Vtoken: string = generateRefreshToken();
        await Promise.all([ insertData(Email, BName,  Vtoken, Password, date),
         OtpModel.create({ email: Email, otp, expiresIn: expiration })])
        
        res.status(200).json({ success: true, message: 'User signed up successfully' });
    } catch (error: any) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

