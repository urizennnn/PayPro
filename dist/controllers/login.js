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
const jwt_1 = require("../utils/jwt");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        const user = yield (0, helper_1.findUser)(Email);
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const refreshToken = (0, helper_1.generateRefreshToken)();
        const storedPassword = yield (0, helper_1.LoginUser)(Email);
        const payload = { Email, Password };
        console.log({ SQL: user, SQLP: storedPassword, HTTP: Email, HTTPP: Password });
        if (storedPassword === Password) {
            (0, jwt_1.cookies)(res, payload, refreshToken);
            return res.status(200).json({ success: true, message: "User logged in", user: user });
        }
        else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.loginUser = loginUser;
