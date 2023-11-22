"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const SQLconnection_1 = require("./Database/SQLconnection");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
server.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
server.use((0, morgan_1.default)('dev'));
server.all('/', (req, res) => {
    res.send('Working');
});
server.listen(PORT, () => {
    (0, SQLconnection_1.ConnectSQL)();
    console.log(`Server listening on localhost:${PORT}`);
});
