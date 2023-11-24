import { Request, Response } from 'express';
import { findUser, LoginUser, generateRefreshToken } from '../utils/helper';
import { cookies } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body; 

        const user: any = await findUser(Email);

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const refreshToken = generateRefreshToken();
        const storedPassword: any = await LoginUser(Email);
        const storedPasswordValue = storedPassword[0]?.Password || ''
        const payload: object = { Email, Password };

       

        if (storedPasswordValue === Password) {
            cookies(res, payload, refreshToken);
            return res.status(200).json({ success: true, message: "User logged in", user: user });
        } 
    } catch (error: any) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
