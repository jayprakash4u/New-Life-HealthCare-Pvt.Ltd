import { healthArticles } from './journal';
import { servicePages } from './service-pages';
import { treatmentPages } from './treatment-pages';

export type EditableCopy = {
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  serviceDetails?: {
    highlights: string[];
    action: string;
    question: string;
    answer: string;
  };
};

export type AdminPage = EditableCopy & {
  id: string;
  label: string;
  path: string;
  group: string;
};

export const homeHeroCopy = {
  title: 'A new day.\nA healthier you.',
  body: 'Take the next step in your health with New Life Health Care. Here for you in Imadol, Lalitpur.',
};

export const adminPages: readonly AdminPage[] = [
  {
    id: 'home',
    path: '/',
    label: 'Home',
    group: 'Pages',
    ...homeHeroCopy,
  },
  {
    id: 'home-introduction',
    path: '/',
    label: 'Clinic introduction',
    group: 'Pages',
    title: 'Care that starts with listening.',
    body: 'New Life Health Care is a polyclinic in Imadol, Lalitpur. We bring consultations and everyday health services together in one place, so it’s easier to take the next step in your care.\n\nFrom family health and gynecology consultations to laboratory tests, ultrasound and pharmacy support, our team can help you explore the care available and plan your visit.',
  },
  {
    id: 'about',
    path: '/about',
    label: 'About us',
    group: 'Pages',
    title: 'Message from Director',
    body: 'Welcome to New Life Health Care. We believe good care begins with listening, understanding your concerns and helping you feel comfortable about the next step. Here in Imadol, Lalitpur, our focus is on bringing everyday healthcare closer to you and your family.\n\nBy bringing consultations, laboratory testing, ultrasound and pharmacy support together, we aim to make your visit easier to navigate. Whether you are visiting for a routine checkup or a health concern, we want you to have the time to ask questions and understand the care available to you.\n\nThank you for considering New Life for your care. We look forward to welcoming you and your family.',
  },
  {
    id: 'team',
    path: '/team',
    label: 'Our Team',
    group: 'Pages',
    title: 'Our Team',
    body: 'Get to know our clinic leadership and explore consultation profiles.',
  },
  {
    id: 'doctors',
    path: '/doctors',
    label: 'Doctors',
    group: 'Pages',
    title: 'Find a doctor',
    body: '',
  },
  {
    id: 'gallery',
    path: '/gallery',
    label: 'Gallery',
    group: 'Pages',
    title: 'Gallery',
    body: 'A look inside our clinic and moments from New Life Health Care.',
  },
  {
    id: 'videos',
    path: '/videos',
    label: 'Videos',
    group: 'Pages',
    title: 'Videos',
    body: 'Take a look inside New Life Health Care.',
  },
  {
    id: 'blogs',
    path: '/blogs',
    label: 'Blogs',
    group: 'Pages',
    title: 'Blogs',
    body: 'Health articles and clinic news from New Life Health Care.',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'Contact us',
    group: 'Pages',
    title: 'Let’s talk\nabout your care.',
    body: 'A question before your visit? Get in touch with our team at New Life Health Care.',
  },
  {
    id: 'location',
    path: '/our-location',
    label: 'Our location',
    group: 'Pages',
    title: 'Our location',
    body: 'Find New Life Health Care in Imadol, Lalitpur.',
  },
  ...servicePages.map((page) => ({
    id: `service-${page.id}`,
    label: page.title,
    path: `/services/${page.id}`,
    group: 'Services',
    title: page.title,
    body: page.overview.join('\n\n'),
  })),
  ...treatmentPages.map((page) => ({
    id: `treatment-${page.id}`,
    label: page.title,
    path: `/treatments/${page.id}`,
    group: 'Treatments',
    title: page.title,
    body: page.overview.join('\n\n'),
  })),
  ...healthArticles.map((article) => ({
    id: `blog-${article.id}`,
    label: article.title,
    path: article.href,
    group: 'Articles',
    title: article.title,
    body: article.body.join('\n\n'),
  })),
];

export const findAdminPage = (id: string) =>
  adminPages.find((page) => page.id === id);

export function hasEditableImage(page: AdminPage) {
  return (
    ['about', 'team', 'home-introduction'].includes(page.id) ||
    ['Services', 'Treatments', 'Articles'].includes(page.group)
  );
}
