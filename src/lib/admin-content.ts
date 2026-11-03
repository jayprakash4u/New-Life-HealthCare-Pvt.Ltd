import {
  usesDatabase,
  readRecord,
  writeRecord,
  publishRecord,
} from './admin-database';
import { randomUUID } from 'node:crypto';
import {
  access,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { findAdminPage, type EditableCopy } from '@/config/admin-pages';
import { healthArticles } from '@/config/journal';

const directory = path.resolve(
  /* turbopackIgnore: true */ process.env.ADMIN_DATA_DIR ?? '.admin-data',
);

function contentFile(id: string) {
  if (
    !findAdminPage(id) &&
    !/^(service|treatment)-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)
  )
    throw new Error('Unknown content page');
  return path.join(directory, `${id}.json`);
}

export async function readPageOverride(
  id: string,
  draft = false,
): Promise<EditableCopy | null> {
  if (usesDatabase())
    return readRecord<EditableCopy>(draft ? 'drafts' : 'pages', id);
  try {
    return JSON.parse(
      await readFile(contentFile(id) + (draft ? '.draft' : ''), 'utf8'),
    ) as EditableCopy;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export async function getPageCopy(id: string): Promise<EditableCopy> {
  const page = findAdminPage(id);
  const copy = await readPageOverride(id);
  if (copy) return copy;
  if (!page) throw new Error('Unknown content page');
  return { title: page.title, body: page.body };
}

export async function savePageCopy(
  id: string,
  copy: EditableCopy,
  draft = false,
) {
  if (usesDatabase()) {
    if (draft) await writeRecord('drafts', id, copy);
    else await publishRecord(id, copy);
    return;
  }
  const destination = contentFile(id) + (draft ? '.draft' : '');
  await mkdir(directory, { recursive: true });
  const temporary = `${destination}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, JSON.stringify(copy), {
      flag: 'wx',
      mode: 0o600,
    });
    await rename(temporary, destination);
    if (!draft) await rm(contentFile(id) + '.draft', { force: true });
  } finally {
    await rm(temporary, { force: true });
  }
}

export async function getPublishedArticles() {
  const articles = await Promise.all(
    healthArticles.map(async (article) => {
      const id = `blog-${article.id}`;
      if (await isArticleDeleted(id)) return null;
      const copy = await getPageCopy(id);
      return {
        ...article,
        title: copy.title,
        image: copy.image ?? article.image,
      };
    }),
  );
  return articles.filter((article) => article !== null);
}

function deletionFile(id: string) {
  if (findAdminPage(id)?.group !== 'Articles')
    throw new Error('Unknown article');
  return `${contentFile(id)}.deleted`;
}

export async function isArticleDeleted(id: string) {
  if (usesDatabase())
    return (await readRecord('deleted-articles', id)) === true;
  try {
    await access(deletionFile(id));
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return false;
    throw error;
  }
}

export async function markArticleDeleted(id: string) {
  const file = deletionFile(id);
  if (usesDatabase()) {
    await writeRecord('deleted-articles', id, true);
    return;
  }
  await mkdir(directory, { recursive: true });
  try {
    await writeFile(file, '', { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
  }
}
