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
exports.SignUser = void 0;
const helper_1 = require("../utils/helper");
const SignUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, BName, Password } = req.query;
        console.log(BName);
        if (!Email || !BName || !Password) {
            return res.status(400).json({ success: false, message: 'Bad Request: Missing required parameters' });
        }
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        const Vtoken = (0, helper_1.generateRefreshToken)();
        yield (0, helper_1.insertData)(Email, BName, Vtoken, Password, date);
        res.status(200).json({ success: true, message: 'User signed up successfully' });
    }
    catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.SignUser = SignUser;
