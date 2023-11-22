import { Request, Response } from "express";
import { generateRefreshToken, insertData } from "../utils/helper";

export const SignUser = async (req: Request, res: Response) => {
  try {
    const { Email, BName, Password }: Record<string, string> = req.query as Record<string, string>;

    if (!Email || !BName || !Password) {
      return res.status(400).json({ success: false, message: 'Bad Request: Missing required parameters' });
    }

    const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
    const Vtoken: string = generateRefreshToken();

    await insertData(Email, BName, date, Vtoken, Password);

    res.status(200).json({ success: true, message: 'User signed up successfully' });
  } catch (error: any) {
    console.error('Error signing up user:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
