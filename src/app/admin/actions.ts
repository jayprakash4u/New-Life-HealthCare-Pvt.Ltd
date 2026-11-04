'use server';

import { homepageSections } from '@/config/homepage-sections';

import {
  setHomepageVisibility,
  type HomepageKind,
} from '@/lib/homepage-visibility';
import { getPublishedArticles } from '@/lib/admin-content';

import { randomUUID } from 'node:crypto';
import { treatments } from '@/config/treatments';
import { resolveEnquiry } from '@/lib/enquiries';
import {
  getLibraryItems,
  saveLibraryItem,
  type LibraryKind,
} from '@/lib/content-library';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { storeImage } from '@/lib/admin-images';
import { getAdminPages, createCare } from '@/lib/added-care';
import { hasEditableImage } from '@/config/admin-pages';
import {
  endAdminSession,
  requireAdmin,
  startAdminSession,
} from '@/lib/admin-auth';
import {
  isArticleDeleted,
  markArticleDeleted,
  savePageCopy,
  getPageCopy,
  readPageOverride,
} from '@/lib/admin-content';

export async function loginAdmin(form: FormData) {
  const username = form.get('username');
  const password = form.get('password');
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !(await startAdminSession(username.trim(), password))
  ) {
    redirect('/admin/login?error=1');
  }
  redirect('/admin');
}

export async function logoutAdmin() {
  await endAdminSession();
  redirect('/admin/login');
}

export async function publishPage(id: string, form: FormData) {
  await requireAdmin();
  const page = (await getAdminPages()).find((entry) => entry.id === id);
  if (!page) redirect('/admin');
  if (page.group === 'Articles' && (await isArticleDeleted(id)))
    redirect('/admin/blogs');
  const draft = form.get('intent') === 'draft';
  const title = form.get('title');
  const body = form.get('body');
  const imageAlt = form.get('imageAlt');
  const highlights = form.get('highlights');
  const action = form.get('actionLabel');
  const question = form.get('faqQuestion');
  const answer = form.get('faqAnswer');
  const serviceDetails =
    page.group === 'Services' &&
    typeof highlights === 'string' &&
    highlights.length <= 500 &&
    typeof action === 'string' &&
    action.trim() &&
    action.length <= 80 &&
    typeof question === 'string' &&
    question.trim() &&
    question.length <= 200 &&
    typeof answer === 'string' &&
    answer.trim() &&
    answer.length <= 2000
      ? {
          highlights: highlights
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean),
          action: action.trim(),
          question: question.trim(),
          answer: answer.trim(),
        }
      : undefined;
  const editor = `/admin/pages/${page.id}`;
  if (
    (page.group === 'Services' && !serviceDetails) ||
    (typeof imageAlt === 'string' && imageAlt.length > 200) ||
    typeof title !== 'string' ||
    !title.trim() ||
    title.length > 160 ||
    typeof body !== 'string' ||
    body.length > 12000
  ) {
    redirect(`${editor}?status=invalid`);
  }
  try {
    const upload = form.get('image');
    let { image } =
      (await readPageOverride(page.id, true)) ?? (await getPageCopy(page.id));
    if (hasEditableImage(page) && upload instanceof File && upload.size) {
      image = await storeImage(upload);
    }
    await savePageCopy(
      page.id,
      {
        title: title.trim(),
        body: body.trim(),
        image,
        imageAlt: typeof imageAlt === 'string' ? imageAlt.trim() : undefined,
        serviceDetails,
      },
      draft,
    );
  } catch (error) {
    console.error('Could not publish page', error);
    redirect(`${editor}?status=error`);
  }
  if (draft) redirect(`${editor}?status=draft`);
  revalidatePath(page.path);
  if (page.group === 'Services' || page.group === 'Treatments')
    revalidatePath('/', 'layout');
  if (page.group === 'Articles') {
    revalidatePath('/blogs');
    revalidatePath('/');
  }
  redirect(`${editor}?status=saved`);
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const page = (await getAdminPages()).find((entry) => entry.id === id);
  if (page?.group !== 'Articles') redirect('/admin/blogs');
  try {
    await markArticleDeleted(id);
  } catch (error) {
    console.error('Could not delete article', error);
    redirect('/admin/blogs?status=error');
  }
  revalidatePath(page.path);
  revalidatePath('/blogs');
  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin/blogs?status=deleted');
}

export async function closeEnquiry(id: string, inProgress = false) {
  await requireAdmin();
  await resolveEnquiry(id, inProgress);
  revalidatePath('/admin/enquiries');
}

export async function addCare(kind: 'service' | 'treatment', form: FormData) {
  await requireAdmin();
  const title = String(form.get('title') ?? '').trim();
  const body = String(form.get('body') ?? '').trim();
  const slug = title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const id = kind + '-' + slug;
  const upload = form.get('image');
  if (!slug || title.length > 160 || !body || body.length > 12000)
    redirect('/admin/care/' + kind + '?status=invalid');
  if (
    id === 'service-lab-ultrasound' ||
    (await getAdminPages()).some((entry) => entry.id === id)
  )
    redirect('/admin/care/' + kind + '?status=duplicate');
  let created: boolean;
  try {
    const image =
      upload instanceof File && upload.size
        ? await storeImage(upload)
        : undefined;
    created = await createCare(id, {
      title,
      body,
      image,
      imageAlt: String(form.get('imageAlt') ?? '')
        .trim()
        .slice(0, 200),
      serviceDetails:
        kind === 'service'
          ? {
              highlights: [],
              action: 'Enquire about this service',
              question: 'How do I arrange a visit?',
              answer:
                'Send an enquiry or call our team to confirm availability and arrange a visit.',
            }
          : undefined,
    });
  } catch {
    redirect('/admin/care/' + kind + '?status=error');
  }
  if (!created) redirect('/admin/care/' + kind + '?status=duplicate');
  revalidatePath('/', 'layout');
  redirect('/admin/pages/' + id + '?status=saved');
}

export async function updateLibraryItem(
  kind: LibraryKind,
  id: string,
  remove: boolean,
  fromDoctors: boolean,
  form: FormData,
) {
  await requireAdmin();
  if (!['gallery', 'team', 'videos'].includes(kind)) redirect('/admin');
  const url =
    '/admin/library/' + (kind === 'team' && fromDoctors ? 'doctors' : kind);
  const item = (await getLibraryItems(kind)).find((entry) => entry.id === id);
  if (!item) redirect(url);
  const title = remove ? item.title : String(form.get('title') ?? '').trim();
  const detail = remove ? item.detail : String(form.get('detail') ?? '').trim();
  if (!title || title.length > 160 || detail.length > 240)
    redirect(url + '?edit=' + id + '&status=error');
  try {
    const upload = form.get('image');
    const image =
      !remove && upload instanceof File && upload.size
        ? await storeImage(upload)
        : item.image;
    await saveLibraryItem(kind, id, { title, detail, image, deleted: remove });
  } catch {
    redirect(url + '?status=error');
  }
  revalidatePath('/', 'layout');
  redirect(url + '?status=' + (remove ? 'deleted' : 'saved'));
}

export async function addDoctor(fromDoctors: boolean, form: FormData) {
  await requireAdmin();
  const url = '/admin/library/' + (fromDoctors ? 'doctors' : 'team');
  const title = String(form.get('title') ?? '').trim();
  const detail = String(form.get('detail') ?? '').trim();
  const careId = String(form.get('careId') ?? '');
  const upload = form.get('image');
  const interests = String(form.get('interests') ?? '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (
    !title ||
    title.length > 160 ||
    !detail ||
    detail.length > 240 ||
    !treatments.some(({ id }) => id === careId) ||
    !(upload instanceof File) ||
    !upload.size ||
    interests.join('').length > 500
  ) {
    redirect(url + '?add=1&status=error');
  }
  try {
    const id = randomUUID();
    await saveLibraryItem('team', id, {
      title,
      detail,
      image: await storeImage(upload),
      doctor: { careId, interests },
    });
    await setHomepageVisibility('doctor', id, form.get('homepage') === 'on');
  } catch {
    redirect(url + '?add=1&status=error');
  }
  revalidatePath('/', 'layout');
  redirect(url + '?status=saved');
}

export async function updateHomepageVisibility(
  kind: HomepageKind,
  id: string,
  form: FormData,
) {
  await requireAdmin();
  if (!['blog', 'video', 'doctor', 'section'].includes(kind))
    redirect('/admin');
  const url =
    kind === 'section'
      ? '/admin/home'
      : kind === 'blog'
        ? '/admin/blogs'
        : kind === 'doctor'
          ? '/admin/library/team'
          : '/admin/library/videos';
  const items =
    kind === 'section'
      ? homepageSections.filter((section) => !('required' in section))
      : kind === 'blog'
        ? await getPublishedArticles()
        : await getLibraryItems(kind === 'doctor' ? 'team' : 'videos');
  if (!items.some((item) => item.id === id)) redirect(url);
  try {
    await setHomepageVisibility(kind, id, form.get('homepage') === 'on');
  } catch {
    redirect(url + '?status=homepage-error');
  }
  revalidatePath('/');
  redirect(url + '?status=homepage-saved');
}
