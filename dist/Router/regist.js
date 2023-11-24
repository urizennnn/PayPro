"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_1 = require("../controllers/signUp");
const verifyUser_1 = require("../controllers/verifyUser");
const router = (0, express_1.Router)();
router.post('/SignUp', signUp_1.SignUser);
router.post('/verifyEmail/:otp/:Email', verifyUser_1.verifyUser);
exports.default = router;
