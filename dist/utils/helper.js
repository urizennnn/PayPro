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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = exports.generateRefreshToken = exports.createVerificationToken = exports.queryAsync = void 0;
const SQLconnection_1 = require("../Database/SQLconnection");
const crypto_1 = __importDefault(require("crypto"));
function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        SQLconnection_1.pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
}
exports.queryAsync = queryAsync;
function createVerificationToken() {
    return crypto_1.default.randomBytes(40).toString("hex");
}
exports.createVerificationToken = createVerificationToken;
function generateRefreshToken() {
    return crypto_1.default.randomBytes(40).toString("hex");
}
exports.generateRefreshToken = generateRefreshToken;
function insertData(Email, Bname, date, token, special) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = `INSERT INTO ${process.env.TABLE}(${process.env.PRI}, ${process.env.Token}, ${process.env.Date},${process.env.Name},${process.env.Unique}) VALUES (?, ?,?, ?,?);`;
        try {
            const result = yield queryAsync(insertQuery, [Email, Bname, token, date, Bname, special]);
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
exports.insertData = insertData;