"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceModel = void 0;
const mongoose_1 = require("mongoose");
const InvoiceSchema = new mongoose_1.Schema({
    BusinessName: { type: String, required: true },
    BusinessAddress: { type: String, required: true },
    ServiceDescription: { type: String, required: true },
    Quantity: { type: Number, required: true },
    UnitPrice: { type: Number, required: true },
    Amount: { type: Number, required: true },
    ClientName: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: String, required: true },
    Date: { type: String, required: true },
    DueDate: { type: String, required: true },
    Paid: { type: Boolean, default: false },
    OverDue: { type: Boolean, default: false }
});
exports.InvoiceModel = (0, mongoose_1.model)('Invoice', InvoiceSchema);
