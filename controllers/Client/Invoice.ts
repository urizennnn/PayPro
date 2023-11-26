import { Request, Response } from "express";
import { InvoiceModel } from "../../Models/InvoiceModel";
import { findClient } from "../../utils/clientQueries";

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const {
            BusinessAddress,
            BusinessName,
            ServiceDescription,
            Quantity,
            UnitPrice,
            Amount,
            ClientName,
            Email,
            Phone,
            Date,
            DueDate
        } = req.body;

        if (![BusinessAddress, BusinessName, ServiceDescription, Quantity, UnitPrice, Amount, ClientName, Email, Phone, Date, DueDate].every((value) => !!value)) {
            return res.status(400).json({
                success: false,
                message: 'Incomplete data. Please fill in all fields and try again'
            });
        }

        const exist = await findClient(Email);

        if (!exist!) {
            return res.status(404).json({
                success: false,
                message: 'Client has not been created, please create a client and try again'
            });
        }

        const createClientInvoice = await InvoiceModel.create({ ...req.body });

        res.status(200).json({
            success: true,
            message: 'Invoice created successfully',
            data: createClientInvoice
        });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
