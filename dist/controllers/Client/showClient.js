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
exports.showclients = void 0;
const clientQueries_1 = require("../../utils/clientQueries");
const showclients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Owner } = req.body;
        const result = yield (0, clientQueries_1.showClients)(Owner);
        res.status(200).json({ success: true, message: result });
    }
    catch (error) {
        console.error('Error uploading client details:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
});
exports.showclients = showclients;
