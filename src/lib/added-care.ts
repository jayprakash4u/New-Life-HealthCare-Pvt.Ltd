import { usesDatabase, listRecords, writeRecord } from './admin-database';
import { readdir, mkdir, writeFile, link, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import {
  adminPages,
  findAdminPage,
  type EditableCopy,
} from '@/config/admin-pages';
import { readPageOverride } from './admin-content';

const directory = path.resolve(process.env.ADMIN_DATA_DIR ?? '.admin-data');
const pattern = /^(service|treatment)-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getAdminPages() {
  const files: string[] = usesDatabase()
    ? (await listRecords<EditableCopy>('pages')).map(({ key }) => key + '.json')
    : await readdir(directory).catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
  const added = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const id = file.slice(0, -5);
        if (!pattern.test(id) || findAdminPage(id)) return null;
        const copy = await readPageOverride(id);
        if (!copy) return null;
        const service = id.startsWith('service-');
        return {
          ...copy,
          id,
          label: copy.title,
          group: service ? 'Services' : 'Treatments',
          path: `/${service ? 'services' : 'treatments'}/${id.slice(id.indexOf('-') + 1)}`,
        };
      }),
  );
  return [...adminPages, ...added.filter((entry) => entry !== null)];
}

export async function createCare(id: string, copy: EditableCopy) {
  if (!pattern.test(id) || findAdminPage(id)) return false;
  if (usesDatabase()) return writeRecord('pages', id, copy, true);
  await mkdir(directory, { recursive: true });
  const temporary = path.join(directory, randomUUID() + '.tmp');
  try {
    await writeFile(temporary, JSON.stringify(copy), {
      flag: 'wx',
      mode: 0o600,
    });
    await link(temporary, path.join(directory, id + '.json'));
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') return false;
    throw error;
  } finally {
    await rm(temporary, { force: true });
  }
}
