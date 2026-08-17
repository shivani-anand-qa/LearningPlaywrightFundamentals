import mysql from 'mysql2/promise';

export interface RegistrationData {
    description: string;
    name: string;
    username: string;
    password: string;
    confirmPassword: string | null;
    shouldPass: boolean;
    expectedError: string;
}

export async function readFromMySQL(): Promise<RegistrationData[]> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'playwright_ddt',
    });

    const [rows] = await connection.query('SELECT * FROM registration_data');
    await connection.end();

    return (rows as any[]).map(row => ({
        description: row.description,
        name: row.name,
        username: row.username,
        password: row.password,
        confirmPassword: row.confirm_password,
        shouldPass: !!row.should_pass,
        expectedError: row.expected_error,
    }));
}
