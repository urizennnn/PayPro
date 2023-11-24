import { Request, Response } from 'express';
import { findUser, LoginUser } from '../utils/helper';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body;

        const user: any = await findUser(Email);

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const storedPassword: any = await LoginUser(Email);

        if (storedPassword === Password) {
            return res.status(200).json({ success: true, message: "User logged in", user: user });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error: any) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
