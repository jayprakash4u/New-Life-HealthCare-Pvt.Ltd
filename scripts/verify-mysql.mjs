import { readFile } from 'node:fs/promises';
import mysql from 'mysql2/promise';

async function verify() {
  const {
    DB_HOST,
    DB_PORT = '3306',
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
    DB_CA_FILE,
  } = process.env;
  if (!DB_HOST || !DB_USER || !DB_NAME || !DB_PASSWORD) {
    throw new Error('Set DB_HOST, DB_USER, DB_NAME and DB_PASSWORD.');
  }
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    connectTimeout: 5000,
    ssl:
      DB_HOST === '127.0.0.1' && !DB_CA_FILE
        ? undefined
        : {
            ca: DB_CA_FILE ? await readFile(DB_CA_FILE) : undefined,
            rejectUnauthorized: true,
            verifyIdentity: true,
          },
  });
  try {
    await connection.query('SELECT 1');
    console.log('MySQL connection verified.');
  } finally {
    await connection.end();
  }
}

verify().catch((error) => {
  console.error('MySQL verification failed.', error.message);
  process.exitCode = 1;
});
