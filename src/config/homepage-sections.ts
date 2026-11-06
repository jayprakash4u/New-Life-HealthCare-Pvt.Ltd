export const homepageSections = [
  {
    id: 'hero',
    label: 'Hero banner and appointment form',
    href: '/admin/pages/home',
    required: true,
  },
  { id: 'doctors', label: 'Our Doctors', href: '/admin/library/team' },
  { id: 'specialties', label: 'Specialties & services' },
  {
    id: 'introduction',
    label: 'Clinic introduction',
    href: '/admin/pages/home-introduction',
  },
  { id: 'videos', label: 'Life at New Life', href: '/admin/library/videos' },
  { id: 'gallery', label: 'Photo gallery', href: '/admin/library/gallery' },
  { id: 'why-choose-us', label: 'Why choose us' },
  { id: 'blog', label: 'Health journal', href: '/admin/blogs' },
  { id: 'faq', label: 'Frequently asked questions' },
] as const;
