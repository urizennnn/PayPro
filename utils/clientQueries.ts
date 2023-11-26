import { queryAsync } from './helper'

export async function uploadClientDetails (fName:string,lName:string,Email:string,Address:string,Phone:string,pfp:string,date:string){
const insertQuery = `INSERT INTO ${process.env.Client_TABLE}(${process.env.PRI}, ${process.env.location},${process.env.Pfp},${process.env.Date},${process.env.fName},${process.env.lName},${process.env.number}) VALUES (?, ?, ?,?,?,?,?);`;

 try {
        const result = await queryAsync(insertQuery, [Email,  Address, pfp,date,fName,lName,Phone]);
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