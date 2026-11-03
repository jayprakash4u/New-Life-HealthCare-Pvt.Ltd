import {
  readFile,
  readdir,
  mkdir,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { galleryPhotos } from '@/config/gallery';
import { clinicVideos } from '@/config/journal';
import { doctors, type Doctor } from '@/config/doctors';
import { listRecords, usesDatabase, writeRecord } from './admin-database';

export type LibraryKind = 'gallery' | 'team' | 'videos';
type Override = {
  title: string;
  detail: string;
  image: string;
  deleted?: boolean;
  doctor?: Pick<Doctor, 'careId' | 'interests'>;
};
const directory = path.resolve(
  process.env.ADMIN_DATA_DIR ?? '.admin-data',
  'library',
);

async function overrides(kind: LibraryKind) {
  if (usesDatabase())
    return new Map(
      (await listRecords<Override>('library-' + kind)).map(({ key, value }) => [
        key,
        value,
      ]),
    );
  const files: string[] = await readdir(directory).catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    },
  );
  const prefix = kind + '-';
  return new Map(
    await Promise.all(
      files
        .filter((file) => file.startsWith(prefix) && file.endsWith('.json'))
        .map(
          async (file) =>
            [
              file.slice(prefix.length, -5),
              JSON.parse(
                await readFile(path.join(directory, file), 'utf8'),
              ) as Override,
            ] as const,
        ),
    ),
  );
}

export async function getGalleryPhotos() {
  const changes = await overrides('gallery');
  return galleryPhotos.flatMap((photo) => {
    const id = photo.id;
    const change = changes.get(id);
    return change?.deleted
      ? []
      : [
          {
            ...photo,
            id,
            title: change?.title ?? photo.title,
            alt: change?.detail ?? photo.alt,
            src: change?.image ?? photo.src,
          },
        ];
  });
}

export async function getClinicVideos() {
  const changes = await overrides('videos');
  return clinicVideos.flatMap((video) => {
    const change = changes.get(video.id);
    return change?.deleted
      ? []
      : [
          {
            ...video,
            title: change?.title ?? video.title,
            category: change?.detail ?? video.category,
            image: change?.image ?? video.image,
          },
        ];
  });
}

export async function getDoctors() {
  const changes = await overrides('team');
  const roster: Doctor[] = [...doctors];
  for (const [id, change] of changes) {
    if (change.doctor && !doctors.some((doctor) => doctor.id === id)) {
      roster.push({
        id,
        name: change.title,
        specialty: change.detail,
        image: change.image,
        ...change.doctor,
        publishedByClinic: true,
      });
    }
  }
  return roster.flatMap((doctor) => {
    const change = changes.get(doctor.id);
    return change?.deleted
      ? []
      : [
          {
            ...doctor,
            name: change?.title ?? doctor.name,
            specialty: change?.detail ?? doctor.specialty,
            image: change?.image ?? doctor.image,
          },
        ];
  });
}

export async function getLibraryItems(kind: LibraryKind) {
  if (kind === 'gallery')
    return (await getGalleryPhotos()).map(({ id, title, alt, src }) => ({
      id,
      title,
      detail: alt,
      image: src,
      href: '/gallery#' + id,
    }));
  if (kind === 'videos')
    return (await getClinicVideos()).map(
      ({ id, title, category, image, href }) => ({
        id,
        title,
        detail: category,
        image,
        href,
      }),
    );
  return (await getDoctors()).map(({ id, name, specialty, image }) => ({
    id,
    title: name,
    detail: specialty,
    image,
    href: '/team#' + id,
  }));
}

export async function saveLibraryItem(
  kind: LibraryKind,
  id: string,
  value: Override,
) {
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error('Invalid library item');
  if (kind === 'team' && !value.doctor) {
    const existing = (await overrides(kind)).get(id);
    value = { ...value, doctor: existing?.doctor };
  }
  if (usesDatabase()) {
    await writeRecord('library-' + kind, id, value);
    return;
  }
  await mkdir(directory, { recursive: true });
  const destination = path.join(directory, kind + '-' + id + '.json');
  const temporary = destination + '.' + randomUUID();
  try {
    await writeFile(temporary, JSON.stringify(value), { flag: 'wx' });
    await rename(temporary, destination);
  } finally {
    await rm(temporary, { force: true });
  }
}
