import { pool } from "../Database/SQLconnection";
import crypto from 'crypto'

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


export function createVerificationToken(): string {
  return crypto.randomBytes(40).toString("hex");
}
export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString("hex");
}

export async function insertData(Email: any, Bname: string,date:string,token:string,special:string) {
   

    const insertQuery = `INSERT INTO ${process.env.TABLE}(${process.env.PRI}, ${process.env.Token}, ${process.env.Date},${process.env.Name},${process.env.Unique}) VALUES (?, ?,?, ?,?);`;
    try {
        const result = await queryAsync(insertQuery, [Email, Bname, token,date,Bname,special]);
        console.log('Data inserted successfully:', result);

    } catch (error: any) {
        if (error.message.includes('Out of range value for column')) {
            console.error(`Error inserting data: ${error.message}.`);
            throw new Error('Internal server Error');
        } else {
            console.error('Error inserting data:', error.message);
            throw new Error(error);
        }
    }
}