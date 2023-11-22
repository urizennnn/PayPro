"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_1 = require("../controllers/signUp");
const router = (0, express_1.Router)();
router.post('/SignUp', signUp_1.SignUser);
exports.default = router;
