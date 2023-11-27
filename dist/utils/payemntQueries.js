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
exports.updatePayment = exports.Payment = void 0;
const helper_1 = require("./helper");
function Payment(BankName, AccountNumber, AccountName, Url, Email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        INSERT INTO ${process.env.payment}(${process.env.Bank}, ${process.env.Number}, ${process.env.Beneficiary}, ${process.env.Url}, ${process.env.Email_Payment})
        VALUES (?, ?, ?, ?, ?)
    `;
        try {
            const result = yield (0, helper_1.queryAsync)(query, [BankName, AccountNumber, AccountName, Url, Email]);
            console.log('Payment data inserted successfully:', result);
            return result;
        }
        catch (error) {
            console.error('Error inserting payment data:', error.message);
            if (error.message.includes('Out of range value for column')) {
                throw new Error('Internal server error: Out of range value for column');
            }
            else {
                throw new Error('Internal server error');
            }
        }
    });
}
exports.Payment = Payment;
function updatePayment(BankName, AccountNumber, AccountName, Url, Email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        UPDATE ${process.env.payment}
        SET
            ${process.env.Bank} = ?,
            ${process.env.Number} = ?,
            ${process.env.Beneficiary} = ?,
            ${process.env.Url} = ?
        WHERE
            ${process.env.Email_Payment} = ?;
    `;
        try {
            const result = yield (0, helper_1.queryAsync)(query, [BankName, AccountNumber, AccountName, Url, Email]);
            console.log('Data updated successfully:', result);
        }
        catch (error) {
            console.error('Error updating data:', error.message);
            if (error.message.includes('Out of range value for column')) {
                throw new Error('Internal server Error: Out of range value for column');
            }
            else {
                throw new Error('Internal server error');
            }
        }
    });
}
exports.updatePayment = updatePayment;
