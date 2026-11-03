import { createHmac, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const derive = promisify(scrypt);
const cookieName = 'new-life-admin';
const lifetime = 8 * 60 * 60;
let failures = 0;
let retryAt = 0;

function credentials() {
  const username = process.env.ADMIN_USERNAME;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH ?? '').split(':');
  if (
    !username ||
    !secret ||
    secret.length < 32 ||
    !/^[a-f0-9]{32}$/.test(salt ?? '') ||
    !/^[a-f0-9]{128}$/.test(hash ?? '')
  )
    return null;
  return { username, secret, salt, hash };
}

export function adminConfigured() {
  return credentials() !== null;
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export async function adminSignedIn() {
  const config = credentials();
  const token = (await cookies()).get(cookieName)?.value;
  if (!config || !token) return false;
  const [expires, signature] = token.split('.');
  if (
    !/^\d{10}$/.test(expires ?? '') ||
    Number(expires) <= Date.now() / 1000 ||
    !/^[a-f0-9]{64}$/.test(signature ?? '')
  )
    return false;
  const expected = sign(
    `${config.username}:${config.hash}:${expires}`,
    config.secret,
  );
  return timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex'),
  );
}

export async function requireAdmin() {
  if (!(await adminSignedIn())) redirect('/admin/login');
}

export async function startAdminSession(username: string, password: string) {
  const config = credentials();
  if (!config) return false;
  const now = Date.now();
  if (now >= retryAt) {
    failures = 0;
    retryAt = now + 5 * 60 * 1000;
  }
  if (failures >= 8 || password.length > 256 || username.length > 120)
    return false;
  failures += 1;
  const hash = (await derive(password, config.salt, 64)) as Buffer;
  if (
    !timingSafeEqual(hash, Buffer.from(config.hash, 'hex')) ||
    username !== config.username
  )
    return false;
  failures = 0;
  const expires = Math.floor(now / 1000) + lifetime;
  const signature = sign(
    `${config.username}:${config.hash}:${expires}`,
    config.secret,
  );
  (await cookies()).set(cookieName, `${expires}.${signature}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: lifetime,
  });
  return true;
}

export async function endAdminSession() {
  (await cookies()).set(cookieName, '', { path: '/admin', maxAge: 0 });
}
