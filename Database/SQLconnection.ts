import mysql from 'mysql';

export const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.HOST as string || 'bwkddf84plde7tumpffh-mysql.services.clever-cloud.com',
    user: process.env.DB_USER as string || 'ual3zzhsksisf9dy',
    password: process.env.PASSWORD as string || 'isRdV3O72e58gJHp2mq',
    database: process.env.DATABASE as string || 'bwkddf84plde7tumpffh',
});

export function ConnectSQL() {
   
    pool.getConnection((err:any, connection:any) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            throw err;
        }

        console.log('Connected to MySQL');
        
        connection.on('error', (error:any) => {
            if (error.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Connection lost. Reconnecting...');
                ConnectSQL();
            } else {
                throw error;
            }
        });

        connection.release();
    });
}