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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const SQLconnection_1 = require("./Database/SQLconnection");
const regist_1 = __importDefault(require("./Router/regist"));
const server = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
server.use(express_1.default.json());
server.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
server.use((0, morgan_1.default)('dev'));
server.use('/user', regist_1.default);
server.all('/', (req, res) => {
    res.send('Working');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, SQLconnection_1.ConnectSQL)();
        const app = server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        process.on('SIGINT', () => {
            console.log('Shutting down...');
            app.close(() => {
                console.log('Server closed.');
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}))();
