import { pool } from "../Database/SQLconnection";

export function queryAsync(sql: string, values: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, values, (error:any, results:any) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}