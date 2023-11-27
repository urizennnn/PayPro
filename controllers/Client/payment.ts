import { Request, Response } from "express";
import { updatePayment,Payment } from "../../utils/payemntQueries";

export const addPayment = async (req: Request, res: Response) => {
    try {
        const { BankName, AccountNumber, AccountName, Url, Email } = req.body;
        await Payment(BankName, AccountNumber, AccountName, Url, Email);
        return res.status(201).json({ success: true, message: 'Payment Created' });
    } catch (error: any) {
        console.error('Error adding payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { BankName, AccountNumber, AccountName, Url, Email } = req.body;
        await updatePayment(BankName, AccountNumber, AccountName, Url, Email);
        return res.status(200).json({ success: true, message: 'Payment Updated' });
    } catch (error: any) {
        console.error('Error updating payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
