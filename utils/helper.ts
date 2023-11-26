import { pool } from "../Database/SQLconnection";
import crypto from 'crypto';
import { v2 as cloudinary } from "cloudinary";


export function queryAsync(sql: string, values: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }

            connection.query(sql, values, (error: any, results: any) => {
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

export async function insertData(Email: any, Bname: string, special: string,date:string,token:string,fName:string,lName:string,country:string,type:string) {
           

    const insertQuery = `INSERT INTO ${process.env.TABLE}(${process.env.PRI}, ${process.env.Name},${process.env.Unique},${process.env.Date},${process.env.Token},${process.env.fName},${process.env.lName},${process.env.type},${process.env.country}) VALUES (?, ?, ?,?,?,?,?,?,?);`;
   
}

export function generateOTP():number {
  return Math.floor(100000 + Math.random() * 900000)
}

export function generateExpirationTime(minutes:number):Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

export async function findUser(email: string): Promise<void> {
    const query = `SELECT * FROM ${process.env.TABLE} WHERE ${process.env.PRI} = ?`;
    
    try {
        const result = await queryAsync(query, [email]);
        return result;
    } catch (error: any) {
        console.error('Error finding user:', error.message);
        throw new Error(error);
    }
}

export async function updateUser(email:string){
const query = `UPDATE ${process.env.TABLE} SET isVerified = true where ${process.env.TABLE}.${process.env.PRI} = ?`
try{
    const result = await queryAsync(query,[email])
    return result
}catch(error:any){
      console.error('Error finding user:', error.message);
        throw new Error(error);
}

}
export async function updateUserPassword(email: string, password: string) {
    const query = `UPDATE ${process.env.TABLE} SET Password = ? WHERE ${process.env.TABLE}.${process.env.PRI} = ?`;
    try {
        const result = await queryAsync(query, [password, email]);
        return result;
    } catch (error:any) {
        console.error('Error updating user password:', error.message);
        throw new Error(error);
    }
}

export async function LoginUser(email :string){
const query = `select ${process.env.TABLE}.${process.env.Unique} from ${process.env.TABLE} where ${process.env.TABLE}.${process.env.PRI} = ? `

try{
    const result = await queryAsync(query,[email])
    return result
}catch(error:any){
      console.error('Error finding user:', error.message);
        throw new Error(error);
}
}

export async function uploadtoCloud(path:string){
const  upload = await cloudinary.uploader.upload(path,{
    use_filename:true,
    folder:'PayProClient'
})
}