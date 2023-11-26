import { Request, Response } from "express";
import { showClientsCount } from "../utils/clientQueries";
import { InvoiceModel } from "../Models/InvoiceModel";
import { showInvoices } from "./Client/Invoice";

export const dashboard = async (req: Request, res: Response) => {
    try {
        const { Owner, BusinessName } = req.body;

        const invoiceCount = await InvoiceModel.countDocuments({ BusinessName });
        const invoices = await InvoiceModel.find({ BusinessName });

        const calculateInvoiceRevenue = (invoice: { Quantity: number; UnitPrice: number }) =>
            invoice.Quantity * invoice.UnitPrice;

        const totalRevenue = invoices.reduce(
            (sum: number, invoice: { Quantity: number; UnitPrice: number }) => sum + calculateInvoiceRevenue(invoice),
            0
        );

        const clientCount = await showClientsCount(Owner);

        const overdueCount = invoices.filter((invoice) => invoice.OverDue).length;
        const paidCount = invoices.filter((invoice) => invoice.Paid).length;
        const unpaidCount = invoices.filter((invoice) => !invoice.Paid).length;

        const overduePercentage = (overdueCount / invoiceCount) * 100;
        const paidPercentage = (paidCount / invoiceCount) * 100;
        const unpaidPercentage = (unpaidCount / invoiceCount) * 100;

        const invoiceStat: object = {
            Overdue: overduePercentage,
            Paid: paidPercentage,
            Unpaid: unpaidPercentage,
        };
        const recents = await showInvoices(req,res)
        res.status(200).json({
            success: true,
            message: 'Dashboard data retrieved successfully',
            data: {
                invoiceCount: invoiceCount,
                totalRevenue: totalRevenue,
                clientCount: clientCount,
                invoiceStat: invoiceStat,
            },
            recentInvoices:{
            recents
            }
        });
    } catch (error) {
        console.error('Error in dashboard:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};
