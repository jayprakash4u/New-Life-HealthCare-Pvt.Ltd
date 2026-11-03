import { randomBytes, scryptSync } from 'node:crypto';
import { writeFileSync } from 'node:fs';

const username = process.argv[2] ?? 'admin';
if (!/^[a-zA-Z0-9._-]{1,120}$/.test(username)) {
  console.error(
    'Use 1–120 letters, numbers, dots, underscores or hyphens for the username.',
  );
  process.exit(1);
}
const password = randomBytes(24).toString('base64url');
const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');
const secret = randomBytes(32).toString('hex');

try {
  writeFileSync(
    '.env.local',
    `ADMIN_USERNAME=${username}\nADMIN_PASSWORD_HASH=${salt}:${hash}\nADMIN_SESSION_SECRET=${secret}\n`,
    { flag: 'wx', mode: 0o600 },
  );
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.error(
    '.env.local already exists. Configure the ADMIN variables in that file without overwriting its existing settings.',
  );
  process.exit(1);
}
console.log(
  `Username: ${username}\nPassword: ${password}\nSave this password in your password manager. Restart the website after setup.`,
);
