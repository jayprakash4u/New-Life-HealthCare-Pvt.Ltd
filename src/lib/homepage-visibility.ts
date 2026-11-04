import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { listRecords, usesDatabase, writeRecord } from './admin-database';

export type HomepageKind = 'blog' | 'video' | 'doctor' | 'section';
const directory = path.resolve(
  process.env.ADMIN_DATA_DIR ?? '.admin-data',
  'homepage',
);

export async function getHomepageVisibility(
  kind: HomepageKind,
  ids: readonly string[],
) {
  if (usesDatabase()) {
    const records = await listRecords<boolean>('homepage-' + kind);
    return new Map(records.map(({ key, value }) => [key, value]));
  }
  return new Map(
    await Promise.all(
      ids.map(async (id) => {
        try {
          return [
            id,
            (await readFile(path.join(directory, kind + '-' + id), 'utf8')) ===
              'true',
          ] as const;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
          return [id, true] as const;
        }
      }),
    ),
  );
}

export async function setHomepageVisibility(
  kind: HomepageKind,
  id: string,
  visible: boolean,
) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Invalid homepage item');
  if (usesDatabase()) {
    await writeRecord('homepage-' + kind, id, visible);
    return;
  }
  await mkdir(directory, { recursive: true });
  const destination = path.join(directory, kind + '-' + id);
  const temporary = destination + '.' + randomUUID();
  try {
    await writeFile(temporary, String(visible), { flag: 'wx' });
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
}
