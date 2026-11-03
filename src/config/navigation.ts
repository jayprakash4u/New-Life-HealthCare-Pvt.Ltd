import { services } from './services';
import { treatments } from './treatments';

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Doctors', href: '/doctors' },
  {
    label: 'About us',
    href: '/about',
    children: [
      {
        label: 'About New Life',
        href: '/about',
        description: 'Get to know our clinic.',
      },
      {
        label: 'Our team',
        href: '/team',
        description: 'The people behind your care.',
      },
      {
        label: 'Gallery',
        href: '/gallery',
        description: 'A look inside New Life.',
      },
    ],
  },
  {
    label: 'Treatments',
    href: '/#plan-your-visit',
    menuLayout: 'wide',
    children: treatments.map((item) => ({
      label: item.title,
      href: `/treatments/${item.id}`,
      description: item.summary,
      illustration: item.icon,
      detail: item.description,
    })),
  },
  {
    label: 'Services',
    href: '/#plan-your-visit',
    menuLayout: 'wide',
    children: services.map((item) => ({
      label: item.title,
      href: `/services/${item.id}`,
      description: item.summary,
      illustration: item.icon,
      detail: item.description,
    })),
  },
  { label: 'Our location', href: '/our-location' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Videos', href: '/videos' },
] as const;

export type AddedCareLink = {
  label: string;
  href: string;
  description: string;
  illustration: 'consultation';
  detail: string;
};

export function withAddedCare(
  items: readonly (typeof navigation)[number][],
  additions: readonly AddedCareLink[],
) {
  return items.map((item) => {
    if (!('menuLayout' in item)) return item;
    const prefix = item.label === 'Services' ? '/services/' : '/treatments/';
    return {
      ...item,
      children: [
        ...item.children,
        ...additions.filter(({ href }) => href.startsWith(prefix)),
      ],
    };
  });
}

const utilityLabels = new Set(['Doctors', 'Blogs', 'Videos', 'Gallery']);
export const utilityNavigation = ['Doctors', 'Blogs', 'Videos', 'Gallery'].map(
  (label) => navigation.find((item) => item.label === label)!,
);
export const primaryNavigation = navigation.filter(
  (item) => !utilityLabels.has(item.label),
);

export const contactLink = { label: 'Contact us', href: '/contact' } as const;

export function isNavigationActive(pathname: string, href: string) {
  // Section links are resolved on the home page; pathname alone cannot identify a hash.
  if (href.includes('#')) return false;
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);
}
