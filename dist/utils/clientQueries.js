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
exports.showClientsCount = exports.showClients = exports.findClient = exports.uploadClientDetails = void 0;
const helper_1 = require("./helper");
function uploadClientDetails(fName, lName, Email, Address, Phone, pfp, date, id, owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = `INSERT INTO ${process.env.Client_TABLE}(${process.env.PRI_Client}, ${process.env.location},${process.env.Pfp},${process.env.Date_Client},${process.env.Client_FName},${process.env.Client_LName},${process.env.number},${process.env.ID},${process.env.OWNER}) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);`;
        try {
            const result = yield (0, helper_1.queryAsync)(insertQuery, [Email, Address, pfp, date, fName, lName, Phone, id, owner]);
            console.log('Data inserted successfully:', result);
        }
        catch (error) {
            if (error.message.includes('Out of range value for column')) {
                console.error(`Error inserting data: ${error.message}.`);
                throw new Error('Internal server Error');
            }
            else {
                console.error('Error inserting data:', error.message);
                throw new Error(error);
            }
        }
    });
}
exports.uploadClientDetails = uploadClientDetails;
function findClient(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `select * from ${process.env.Client_TABLE} where ${process.env.Client_TABLE}.${process.env.PRI_Client}=?`;
        try {
            const result = yield (0, helper_1.queryAsync)(query, [email]);
            console.log('Data inserted successfully:', result);
        }
        catch (error) {
            if (error.message.includes('Out of range value for column')) {
                console.error(`Error inserting data: ${error.message}.`);
                throw new Error('Internal server Error');
            }
            else {
                console.error('Error inserting data:', error.message);
                throw new Error(error);
            }
        }
    });
}
exports.findClient = findClient;
function showClients(owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `select * from ${process.env.Client_TABLE} where ${process.env.OWNER} =? `;
        try {
            const result = yield (0, helper_1.queryAsync)(query, [owner]);
            console.log('Data inserted successfully:', result);
        }
        catch (error) {
            if (error.message.includes('Out of range value for column')) {
                console.error(`Error inserting data: ${error.message}.`);
                throw new Error('Internal server Error');
            }
            else {
                console.error('Error inserting data:', error.message);
                throw new Error(error);
            }
        }
    });
}
exports.showClients = showClients;
function showClientsCount(owner) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `select count(*) from ${process.env.Client_TABLE} where ${process.env.OWNER} =? `;
        try {
            const result = yield (0, helper_1.queryAsync)(query, [owner]);
            console.log('Data inserted successfully:', result);
        }
        catch (error) {
            if (error.message.includes('Out of range value for column')) {
                console.error(`Error inserting data: ${error.message}.`);
                throw new Error('Internal server Error');
            }
            else {
                console.error('Error inserting data:', error.message);
                throw new Error(error);
            }
        }
    });
}
exports.showClientsCount = showClientsCount;
