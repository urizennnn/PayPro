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
exports.update = exports.addPayment = void 0;
const payemntQueries_1 = require("../../utils/payemntQueries");
const addPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { BankName, AccountNumber, AccountName, Url, Email } = req.body;
        yield (0, payemntQueries_1.Payment)(BankName, AccountNumber, AccountName, Url, Email);
        return res.status(201).json({ success: true, message: 'Payment Created' });
    }
    catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.addPayment = addPayment;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { BankName, AccountNumber, AccountName, Url, Email } = req.body;
        yield (0, payemntQueries_1.updatePayment)(BankName, AccountNumber, AccountName, Url, Email);
        return res.status(200).json({ success: true, message: 'Payment Updated' });
    }
    catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});
exports.update = update;
