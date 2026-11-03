import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const directory = path.join(
  path.resolve(process.env.ADMIN_DATA_DIR ?? '.admin-data'),
  'images',
);
const mime = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
} as const;

export async function storeImage(file: File) {
  if (file.size > 4 * 1024 * 1024) throw new Error('Image exceeds 4 MB');
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]))
    ? 'jpg'
    : bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      ? 'png'
      : bytes.toString('ascii', 0, 4) === 'RIFF' &&
          bytes.toString('ascii', 8, 12) === 'WEBP'
        ? 'webp'
        : null;
  if (!extension) throw new Error('Unsupported image format');
  const name = randomUUID() + '.' + extension;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, name), bytes, { flag: 'wx' });
  return '/media-upload/' + name;
}

export async function readImage(name: string) {
  const match = /^[a-f0-9-]{36}\.(jpg|png|webp)$/.exec(name);
  if (!match) return null;
  try {
    return {
      bytes: await readFile(path.join(directory, name)),
      type: mime[match[1] as keyof typeof mime],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}
