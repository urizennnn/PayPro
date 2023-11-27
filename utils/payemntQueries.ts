import { queryAsync } from "./helper";


export async function Payment(BankName: string, AccountNumber: string, AccountName: string, Url: string, Email: string) {
    const query = `
        INSERT INTO ${process.env.payment}(${process.env.Bank}, ${process.env.Number}, ${process.env.Beneficiary}, ${process.env.Url}, ${process.env.Email_Payment})
        VALUES (?, ?, ?, ?, ?)
    `;

    try {
        const result = await queryAsync(query, [BankName, AccountNumber, AccountName, Url, Email]);
        console.log('Payment data inserted successfully:', result);
        return result;  
    } catch (error: any) {
        console.error('Error inserting payment data:', error.message);
        if (error.message.includes('Out of range value for column')) {
            throw new Error('Internal server error: Out of range value for column');
        } else {
            throw new Error('Internal server error');
        }
    }
}



export async function updatePayment(BankName: string, AccountNumber: string, AccountName: string, Url: string, Email: string) {
    const query = `
        UPDATE ${process.env.payment}
        SET
            ${process.env.Bank} = ?,
            ${process.env.Number} = ?,
            ${process.env.Beneficiary} = ?,
            ${process.env.Url} = ?
        WHERE
            ${process.env.Email_Payment} = ?;
    `;

    try {
        const result = await queryAsync(query, [BankName, AccountNumber, AccountName, Url, Email]);
        console.log('Data updated successfully:', result);
    } catch (error: any) {
        console.error('Error updating data:', error.message);
        if (error.message.includes('Out of range value for column')) {
            throw new Error('Internal server Error: Out of range value for column');
        } else {
            throw new Error('Internal server error');
        }
    }
}


export async function findpayment(email:string){
    const query =`select * from ${process.env.payment} where  ${process.env.Email_Payment} = ?;`

    try {
        const result = await queryAsync(query, [email]);
        console.log('Data updated successfully:', result);
    } catch (error: any) {
        console.error('Error updating data:', error.message);
        if (error.message.includes('Out of range value for column')) {
            throw new Error('Internal server Error: Out of range value for column');
        } else {
            throw new Error('Internal server error');
        }
    }
}
