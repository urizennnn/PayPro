// signUp.ts
import { Request, Response } from "express";
import { insertData, generateRefreshToken, generateExpirationTime, generateOTP } from "../utils/helper";
import { OtpModel } from "../Models/OtpModel";

export const SignUser = async (req: Request, res: Response) => {
    try {
        const { Email, BName, Password }: Record<string, string> = req.body as Record<string, string>;
        console.log(Email,BName,Password)
        const otp: number = generateOTP();
        const expiration = generateExpirationTime(15);
        const refreshToken = generateRefreshToken()
        if (!Email || !BName || !Password) {
            return res.status(400).json({ success: false, message: 'Bad Request: Missing required parameters' });
        }

        const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        
        const emailString = Email[0]
        const BNameString = BName[0]
        const StringPassword = Password[0]

        await Promise.all([
            insertData(emailString, BNameString, StringPassword, date,refreshToken),
            OtpModel.create({ email: emailString, otp, expiresIn: expiration })
        ]);

        

        res.status(200).json({ success: true, message: 'User signed up successfully' });
    } catch (error: any) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
