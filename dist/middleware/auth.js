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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const custom_error_1 = __importDefault(require("../error/custom-error"));
const http_status_codes_1 = require("http-status-codes");
const helper_1 = require("../utils/helper");
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken } = req.signedCookies;
            const payload = (0, jwt_1.verifyJWT)(refreshToken);
            if (!payload) {
                throw new custom_error_1.default("Invalid JWT payload", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            console.log(payload);
            //@ts-ignore
            const existing = yield (0, helper_1.findUser)(payload === null || payload === void 0 ? void 0 : payload.Email);
            if (!existing) {
                throw new custom_error_1.default("Not found", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            //@ts-ignore
            (0, jwt_1.cookies)(res, existing, existing.refreshToken);
            //@ts-ignore
            req.user = payload;
            next();
        }
        catch (error) {
            throw new custom_error_1.default(error, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    });
}
exports.default = auth;
