import {
  usesDatabase,
  readRecord,
  writeRecord,
  listRecords,
} from './admin-database';
import { randomUUID } from 'node:crypto';
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';

const directory = path.join(
  path.resolve(process.env.ADMIN_DATA_DIR ?? '.admin-data'),
  'enquiries',
);

type Enquiry = {
  id: string;
  received: string;
  source: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
};

export async function saveEnquiry(fields: Omit<Enquiry, 'id' | 'received'>) {
  const enquiry = {
    ...fields,
    id: randomUUID(),
    received: new Date().toISOString(),
  };
  if (usesDatabase()) {
    await writeRecord('enquiries', enquiry.id, enquiry, true);
    return;
  }
  await mkdir(directory, { recursive: true });
  const destination = path.join(directory, enquiry.id + '.json');
  const temporary = destination + '.tmp';
  try {
    await writeFile(temporary, JSON.stringify(enquiry), {
      flag: 'wx',
      mode: 0o600,
    });
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
}

export async function listEnquiries() {
  if (usesDatabase()) {
    const [records, statuses] = await Promise.all([
      listRecords<Enquiry>('enquiries'),
      listRecords<boolean>('enquiry-status'),
    ]);
    const markers = new Set(statuses.map(({ key }) => key));
    return records
      .map(({ key, value }) => ({
        ...value,
        resolved: markers.has(key + '.resolved'),
        inProgress: markers.has(key + '.working'),
      }))
      .sort((a, b) => b.received.localeCompare(a.received));
  }
  const files: string[] = await readdir(directory).catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    },
  );
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const data = JSON.parse(
          await readFile(path.join(directory, file), 'utf8'),
        ) as Enquiry;
        return {
          ...data,
          resolved: files.includes(data.id + '.resolved'),
          inProgress: files.includes(data.id + '.working'),
        };
      }),
  );
  return entries.sort((a, b) => b.received.localeCompare(a.received));
}

export async function resolveEnquiry(id: string, inProgress = false) {
  if (!/^[a-f0-9-]{36}$/.test(id)) return;
  if (usesDatabase()) {
    if (await readRecord('enquiries', id))
      await writeRecord(
        'enquiry-status',
        id + (inProgress ? '.working' : '.resolved'),
        true,
      );
    return;
  }
  await readFile(path.join(directory, id + '.json'));
  await writeFile(
    path.join(directory, id + (inProgress ? '.working' : '.resolved')),
    '',
    { mode: 0o600 },
  );
}
