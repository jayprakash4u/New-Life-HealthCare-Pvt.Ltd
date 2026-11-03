import { setTimeout } from 'node:timers/promises';
import mysql, { type RowDataPacket } from 'mysql2/promise';

let pool: ReturnType<typeof mysql.createPool> | undefined;
let initialized: Promise<unknown> | undefined;

export function usesDatabase() {
  return process.env.ADMIN_STORAGE === 'mysql';
}

async function database() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error(
      'MySQL storage requires DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.',
    );
  }
  const local = ['127.0.0.1', 'localhost', '::1'].includes(DB_HOST);
  const development =
    process.env.NODE_ENV === 'development' &&
    process.env.DB_DEV_SELF_SIGNED === '1';
  pool ??= mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT ?? 3306),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectTimeout: 10000,
    connectionLimit: 10,
    maxIdle: 5,
    idleTimeout: 15000,
    enableKeepAlive: true,
    ssl: local
      ? undefined
      : { rejectUnauthorized: !development, verifyIdentity: !development },
  });
  initialized ??= pool
    .query(
      `
    CREATE TABLE IF NOT EXISTS new_life_admin_records (
      namespace VARCHAR(32) CHARACTER SET ascii NOT NULL,
      record_key VARCHAR(220) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
      payload LONGTEXT CHARACTER SET utf8mb4 NOT NULL,
      PRIMARY KEY (namespace, record_key)
    ) ENGINE=InnoDB
  `,
    )
    .catch((error) => {
      initialized = undefined;
      throw error;
    });
  await initialized;
  return pool;
}

type RecordRow = RowDataPacket & { record_key: string; payload: string };

const retryableReadErrors = new Set([
  'ECONNRESET',
  'EPIPE',
  'ETIMEDOUT',
  'PROTOCOL_CONNECTION_LOST',
]);

async function selectRecords(sql: string, parameters: string[]) {
  try {
    return await (await database()).execute<RecordRow[]>(sql, parameters);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (!code || !retryableReadErrors.has(code)) throw error;
    await setTimeout(150);
    return (await database()).execute<RecordRow[]>(sql, parameters);
  }
}

export async function readRecord<T>(
  namespace: string,
  key: string,
): Promise<T | null> {
  const [rows] = await selectRecords(
    'SELECT payload FROM new_life_admin_records WHERE namespace = ? AND record_key = ?',
    [namespace, key],
  );
  return rows[0] ? (JSON.parse(rows[0].payload) as T) : null;
}

export async function listRecords<T>(namespace: string) {
  const [rows] = await selectRecords(
    'SELECT record_key, payload FROM new_life_admin_records WHERE namespace = ? ORDER BY record_key',
    [namespace],
  );
  return rows.map((row) => ({
    key: row.record_key,
    value: JSON.parse(row.payload) as T,
  }));
}

export async function writeRecord(
  namespace: string,
  key: string,
  value: unknown,
  create = false,
) {
  const payload = JSON.stringify(value);
  const sql =
    'INSERT INTO new_life_admin_records (namespace, record_key, payload) VALUES (?, ?, ?)';
  try {
    await (
      await database()
    ).execute(
      create ? sql : sql + ' ON DUPLICATE KEY UPDATE payload = ?',
      create ? [namespace, key, payload] : [namespace, key, payload, payload],
    );
    return true;
  } catch (error) {
    if (create && (error as { code?: string }).code === 'ER_DUP_ENTRY')
      return false;
    throw error;
  }
}

export async function publishRecord(key: string, value: unknown) {
  const connection = await (await database()).getConnection();
  const payload = JSON.stringify(value);
  try {
    await connection.beginTransaction();
    await connection.execute(
      'INSERT INTO new_life_admin_records (namespace, record_key, payload) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE payload = ?',
      ['pages', key, payload, payload],
    );
    await connection.execute(
      'DELETE FROM new_life_admin_records WHERE namespace = ? AND record_key = ?',
      ['drafts', key],
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
