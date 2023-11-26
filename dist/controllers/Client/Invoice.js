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
exports.showInvoices = exports.createInvoice = void 0;
const InvoiceModel_1 = require("../../Models/InvoiceModel");
const clientQueries_1 = require("../../utils/clientQueries");
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { BusinessAddress, BusinessName, ServiceDescription, Quantity, UnitPrice, Amount, ClientName, Email, Phone, Date, DueDate } = req.body;
        if (![BusinessAddress, BusinessName, ServiceDescription, Quantity, UnitPrice, Amount, ClientName, Email, Phone, Date, DueDate].every((value) => !!value)) {
            return res.status(400).json({
                success: false,
                message: 'Incomplete data. Please fill in all fields and try again'
            });
        }
        const exist = yield (0, clientQueries_1.findClient)(Email);
        if (!exist) {
            return res.status(404).json({
                success: false,
                message: 'Client has not been created, please create a client and try again'
            });
        }
        const createClientInvoice = yield InvoiceModel_1.InvoiceModel.create(Object.assign({}, req.body));
        res.status(200).json({
            success: true,
            message: 'Invoice created successfully',
            data: createClientInvoice
        });
    }
    catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.createInvoice = createInvoice;
const showInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { BusinessName } = req.body;
        const owner = yield (0, clientQueries_1.showClients)(BusinessName);
        const exist = yield InvoiceModel_1.InvoiceModel.findOne({ BusinessName });
        if (!exist) {
            return res.status(404).json({
                success: false,
                message: 'Invoice does not exist for the specified BusinessName'
            });
        }
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        if (exist.DueDate <= date) {
            exist.OverDue = true;
            yield exist.save();
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
    }
    catch (error) {
        console.error('Error retrieving invoices:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
exports.showInvoices = showInvoices;
