import mysql from 'mysql';

export const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'br0fwignvvpehpqkutu6-mysql.services.clever-cloud.com',
    user: 'uqlyip0xqk4o6mfg',
    password: '5owQCvbPU5bbvYvZFggY',
    database: 'br0fwignvvpehpqkutu6',
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