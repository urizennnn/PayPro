"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../Bot/config");
const router = (0, express_1.Router)();
router.get('/:prompt', config_1.main);
exports.default = router;
