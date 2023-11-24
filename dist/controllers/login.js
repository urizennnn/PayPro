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
exports.loginUser = void 0;
const helper_1 = require("../utils/helper");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const user = yield (0, helper_1.findUser)(Email);
        if (!user) {
            res.status(400).json({ 'success': false, 'message': "User does not exist" });
        }
        const check = yield (0, helper_1.LoginUser)(Email);
        if (check === Password) {
            res.status(200).json({ 'success': true, 'message': "User logged In", "user": user });
        }
    }
    catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.loginUser = loginUser;
