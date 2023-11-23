"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectSQL = exports.pool = void 0;
const mysql_1 = __importDefault(require("mysql"));
exports.pool = mysql_1.default.createPool({
    connectionLimit: 10,
    host: 'br0fwignvvpehpqkutu6-mysql.services.clever-cloud.com',
    user: 'uqlyip0xqk4o6mfg',
    password: '5owQCvbPU5bbvYvZFggY',
    database: 'br0fwignvvpehpqkutu6',
});
function ConnectSQL() {
    exports.pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            throw err;
        }
        console.log('Connected to MySQL');
        connection.on('error', (error) => {
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Connection lost. Reconnecting...');
                ConnectSQL();
            }
            else {
                throw error;
            }
        });
        connection.release();
    });
}
exports.ConnectSQL = ConnectSQL;
