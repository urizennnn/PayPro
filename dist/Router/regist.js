"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_1 = require("../controllers/signUp");
const verifyUser_1 = require("../controllers/verifyUser");
const login_1 = require("../controllers/login");
const auth_1 = __importDefault(require("../middleware/auth"));
const password_1 = require("../controllers/password");
const router = (0, express_1.Router)();
router.post('/SignUp', signUp_1.SignUser);
router.post('/verifyEmail/:otp/:Email', verifyUser_1.verifyUser);
router.post('/login', login_1.loginUser);
router.delete('/logout', auth_1.default, login_1.logout);
router.post('/forgotPassword', password_1.forgotPass);
router.post('/verifyOTP', password_1.verifyOTP);
router.post('/updatePassword', password_1.updatePassword);
router.post('/resendOTP', password_1.resendOTP);
exports.default = router;
