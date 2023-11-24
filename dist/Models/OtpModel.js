"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    otp: { type: String, required: true },
    expiresIn: { type: String, required: true },
    email: { type: String, required: true }
});
exports.OtpModel = (0, mongoose_1.model)('Otp', OtpSchema);
