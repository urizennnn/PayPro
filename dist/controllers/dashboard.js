"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const clientQueries_1 = require("../utils/clientQueries");
const InvoiceModel_1 = require("../Models/InvoiceModel");
const Invoice_1 = require("./Client/Invoice");
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Owner, BusinessName } = req.body;
        const invoiceCount = yield InvoiceModel_1.InvoiceModel.countDocuments({ BusinessName });
        const invoices = yield InvoiceModel_1.InvoiceModel.find({ BusinessName });
        const calculateInvoiceRevenue = (invoice) => invoice.Quantity * invoice.UnitPrice;
        const totalRevenue = invoices.reduce((sum, invoice) => sum + calculateInvoiceRevenue(invoice), 0);
        const clientCount = yield (0, clientQueries_1.showClientsCount)(Owner);
        const overdueCount = invoices.filter((invoice) => invoice.OverDue).length;
        const paidCount = invoices.filter((invoice) => invoice.Paid).length;
        const unpaidCount = invoices.filter((invoice) => !invoice.Paid).length;
        const overduePercentage = (overdueCount / invoiceCount) * 100;
        const paidPercentage = (paidCount / invoiceCount) * 100;
        const unpaidPercentage = (unpaidCount / invoiceCount) * 100;
        const invoiceStat = {
            Overdue: overduePercentage,
            Paid: paidPercentage,
            Unpaid: unpaidPercentage,
        };
        const recents = yield (0, Invoice_1.showInvoices)(req, res);
        res.status(200).json({
            success: true,
            message: 'Dashboard data retrieved successfully',
            data: {
                invoiceCount: invoiceCount,
                totalRevenue: totalRevenue,
                clientCount: clientCount,
                invoiceStat: invoiceStat,
            },
            recentInvoices: {
                recents
            }
        });
    }
    catch (error) {
        console.error('Error in dashboard:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.dashboard = dashboard;
