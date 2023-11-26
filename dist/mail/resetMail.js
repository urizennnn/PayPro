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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const promises_1 = __importDefault(require("fs/promises"));
const custom_error_1 = __importDefault(require("../error/custom-error"));
const http_status_codes_1 = require("http-status-codes");
function forgotPassword(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const URL = otp.toString();
            const html = yield promises_1.default.readFile(__dirname + "/../html/verification.html", "utf-8");
            const htmlEmail = html.replace("${OTP}", URL);
            mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email,
                from: process.env.VERIFIED_EMAIL,
                subject: "Forgot password",
                html: htmlEmail,
            };
            yield mail_1.default.send(msg);
        }
        catch (error) {
            throw new custom_error_1.default(error, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    });
}
exports.default = forgotPassword;
