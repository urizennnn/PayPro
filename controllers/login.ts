import { Request, Response } from 'express';
import { findUser, LoginUser,generateRefreshToken } from '../utils/helper';
import { cookies } from '../utils/jwt';

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.params;

        const user: any = await findUser(Email);

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const refreshtoken = generateRefreshToken()
        const storedPassword: any = await LoginUser(Email);
        const payload :object={
                Email,Password
        }
    console.log({SQL:user,SQLP:storedPassword,HTTP:Email,HTTPP:Password})
        if (storedPassword === Password) {
            cookies(res,payload,refreshtoken)
            return res.status(200).json({ success: true, message: "User logged in", user: user });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    } catch (error: any) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
