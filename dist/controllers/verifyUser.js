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
exports.verifyUser = void 0;
const OtpModel_1 = require("../Models/OtpModel");
const helper_1 = require("../utils/helper");
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, otp } = req.params;
        const find = yield OtpModel_1.OtpModel.findOne({ email: Email });
        const now = new Date().getMinutes();
        if ((find === null || find === void 0 ? void 0 : find.otp) === otp && now < (find === null || find === void 0 ? void 0 : find.expiresIn)) {
            const user = yield (0, helper_1.findUser)(Email);
            if (user) {
                user.isVerified = true;
                yield Promise.all([OtpModel_1.OtpModel.findOneAndDelete({ email: Email }), user.save()]);
            }
            res.status(200).json({ success: true, message: "Email verified" });
        }
        else {
            res.status(400).json({ success: false, message: "Invalid OTP or expired" });
        }
    }
    catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.verifyUser = verifyUser;
