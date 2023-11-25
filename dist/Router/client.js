"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createProfile_1 = require("../controllers/Client/createProfile");
const router = (0, express_1.Router)();
router.post('/uploadImage', createProfile_1.uploadPicture);
exports.default = router;
