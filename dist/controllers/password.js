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
exports.resendOTP = exports.updatePassword = exports.verifyOTP = exports.forgotPassword = void 0;
const helper_1 = require("../utils/helper");
const OtpModel_1 = require("../Models/OtpModel");
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email } = req.body;
            if (!Email) {
                return res.status(404).json({ success: false, message: "Email needed" });
            }
            const user = yield (0, helper_1.findUser)(Email);
            if (user) {
                const otp = (0, helper_1.generateOTP)();
                yield OtpModel_1.OtpModel.create({ email: Email, otp, expiresIn: 15 });
                return res.status(200).json({ success: true, message: "Successfully sent OTP" });
            }
            else {
                return res.status(404).json({ success: false, message: "User not found" });
            }
        }
        catch (error) {
            console.error('Error in forgotPassword:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.forgotPassword = forgotPassword;
function verifyOTP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email, otp } = req.body;
            if (!Email && otp) {
                return res.status(404).json({ success: false, message: "Email and otp needed" });
            }
            const user = yield (0, helper_1.findUser)(Email);
            if (user) {
                const otpDocument = yield OtpModel_1.OtpModel.findOne({ email: Email });
                if (otpDocument && otpDocument.otp === otp.toString() && new Date() < new Date(otpDocument.expiresIn)) {
                    yield OtpModel_1.OtpModel.findOneAndDelete({ email: Email });
                    return res.status(200).json({ success: true, message: "OTP verified successfully" });
                }
                else {
                    return res.status(400).json({ success: false, message: "Invalid OTP or expired" });
                }
            }
            else {
                return res.status(404).json({ success: false, message: "User not found" });
            }
        }
        catch (error) {
            console.error('Error in verifyOTP:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.verifyOTP = verifyOTP;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email, Password } = req.body;
            if (!Email && Password) {
                return res.status(404).json({ success: false, message: "Email and Password needed" });
            }
            yield (0, helper_1.updateUserPassword)(Password, Email);
            return res.status(200).json({ success: true, message: "Password updated successfully" });
        }
        catch (error) {
            console.error('Error in updatePassword:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.updatePassword = updatePassword;
function resendOTP(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Email } = req.body;
            const del = yield OtpModel_1.OtpModel.findOne({ email: Email });
            if (del) {
                yield OtpModel_1.OtpModel.findOneAndDelete({ email: Email });
            }
            const otp = (0, helper_1.generateOTP)();
            yield OtpModel_1.OtpModel.create({ email: Email, otp, expiresIn: 15 });
            return res.status(200).json({ success: true, message: "Sent" });
        }
        catch (error) {
            console.error('Error in updatePassword:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
exports.resendOTP = resendOTP;
