import { queryAsync } from './helper';

export async function uploadClientDetails(fName: string, lName: string, Email: string, Address: string, Phone: string, pfp: string, date: string, id: string,owner:string) {
    const insertQuery = `INSERT INTO ${process.env.Client_TABLE}(${process.env.PRI_Client}, ${process.env.location},${process.env.Pfp},${process.env.Date_Client},${process.env.Client_FName},${process.env.Client_LName},${process.env.number},${process.env.ID},${process.env.OWNER}) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);`;

    try {
        const result = await queryAsync(insertQuery, [Email, Address, pfp, date, fName, lName, Phone, id,owner]);
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


export async function findClient(email:string) {
    const query=`select * from ${process.env.Client_TABLE} where ${process.env.Client_TABLE}.${process.env.PRI_Client}=?`
     try {
        const result = await queryAsync(query, [email]);
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

export async function showClients(owner:string){
const query=`select * from ${process.env.Client_TABLE} where ${process.env.OWNER} =? `
     try {
        const result = await queryAsync(query, [owner]);
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



export async function showClientsCount(owner:string){
const query=`select count(*) from ${process.env.Client_TABLE} where ${process.env.OWNER} =? `
     try {
        const result = await queryAsync(query, [owner]);
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