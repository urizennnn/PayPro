// signUp.ts
import { Request, Response } from "express";
import { insertData, generateRefreshToken, generateExpirationTime, generateOTP } from "../utils/helper";
import { OtpModel } from "../Models/OtpModel";
import { verificationEmail } from "../mail";


export const SignUser = async (req: Request, res: Response) => {
    try {
        const { Email, BName, Password,Type,Country,fName,lName}: Record<string, string> = req.body as Record<string, string>;
        console.log(Email,BName,Password)
         const otp:number = generateOTP();
        const expiration = generateExpirationTime(15);
        const refreshToken = generateRefreshToken()
        if (!Email || !BName || !Password) {
            return res.status(400).json({ success: false, message: 'Bad Request: Missing required parameters' });
        }

        const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        
        const emailString = Email as string
        const BNameString = BName as string
        const StringPassword = Password as string

        await Promise.all([
            insertData(emailString, BNameString, StringPassword, date,refreshToken,fName,lName,Country,Type),
            OtpModel.create({ email: emailString, otp, expiresIn: expiration }),verificationEmail(emailString,otp)
        ]);

        

        res.status(200).json({ success: true, message: 'User signed up successfully' });
    } catch (error: any) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
