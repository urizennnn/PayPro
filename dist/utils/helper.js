"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAsync = void 0;
const SQLconnection_1 = require("../Database/SQLconnection");
function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        SQLconnection_1.pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release();
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    });
}
exports.queryAsync = queryAsync;
