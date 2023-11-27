import { Request, Response } from "express";
import { InvoiceModel } from "../../Models/InvoiceModel";
import { findClient, showClients } from "../../utils/clientQueries";
import { invoice } from "../../mail";


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
await invoice(Email, {
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
});

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

export const showInvoices = async (req: Request, res: Response) => {
    try {
        const { BusinessName } = req.body;
        const owner:any = await showClients(BusinessName);
        const exist = await InvoiceModel.findOne({ BusinessName });

        if (!exist) {
            return res.status(404).json({
                success: false,
                message: 'Invoice does not exist for the specified BusinessName'
            });
        }

        const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        if (exist.DueDate <= date) {
            exist.OverDue = true;
            await exist.save(); 
        }

        return res.status(200).json({
            success: true,
            message: {
                ID: owner.ID,
                ClientName: exist.ClientName,
                ServiceDescription: exist.ServiceDescription,
                Date: exist.Date,
                Paid: exist.Paid,
                OverDue: exist.OverDue,
                Price: exist.Amount
            }
        });
    } catch (error:any) {
        console.error('Error retrieving invoices:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
