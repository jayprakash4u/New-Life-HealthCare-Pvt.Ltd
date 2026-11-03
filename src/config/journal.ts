// Original clinic posts; source notes are recorded in docs/journal-sources.md.
export type JournalItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
  imagePosition?: string;
  duration?: string;
};

type HealthArticle = JournalItem & {
  body: readonly string[];
  source?: { label: string; href: string };
};

export const healthArticles: readonly HealthArticle[] = [
  {
    id: 'breast-discomfort',
    title: 'Breast discomfort before your period: what to know',
    category: 'Women’s health',
    image: '/media/journal/breast-discomfort.jpg',
    href: '/blogs/breast-discomfort',
    imagePosition: 'center 20%',
    body: [
      'Breast discomfort can follow a menstrual pattern. It may feel dull, heavy or aching, affect both breasts, and ease when the period ends. Keeping track of when it starts and settles can help you describe the pattern at a consultation.',
      'Arrange a medical review if the pain persists. Seek prompt assessment if you notice a hard lump, nipple discharge, skin dimpling, a change in breast shape, or a red, hot or swollen area.',
    ],
    source: {
      label: 'NHS guidance on breast pain',
      href: 'https://www.nhs.uk/symptoms/breast-pain/',
    },
  },
  {
    id: 'kidney-health',
    title: 'Five everyday habits for kidney health',
    category: 'Everyday wellbeing',
    image: '/media/journal/kidney-health.jpg',
    href: '/blogs/kidney-health',
    imagePosition: 'center 20%',
    body: [
      'Choose balanced meals with fruit, vegetables and whole grains. Reduce foods high in salt or added sugar.',
      'Build regular physical activity into your week at a level that suits you.',
      'Make enough time for sleep and keep a regular routine.',
      'Work with your clinician to manage blood pressure and diabetes if either applies to you.',
      'Ask whether kidney testing is appropriate for you, especially if you have diabetes, high blood pressure or a family history of kidney failure.',
    ],
    source: {
      label: 'NIDDK guidance on preventing chronic kidney disease',
      href: 'https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/prevention',
    },
  },
  {
    id: 'health-checkups',
    title: 'Why a health check matters after Dashain',
    category: 'Health checkups',
    image: '/media/journal/health-checkups.jpg',
    href: '/blogs/health-checkups',
    imagePosition: 'center 16%',
    body: [
      'After Dashain, take a moment to return to your usual health routine. If travel or celebrations interrupted an existing follow-up, check when your next appointment is due.',
      'If you arrange a consultation, bring recent reports and a list of your medicines. Mention any ongoing changes in digestion, energy, blood pressure or blood sugar that you want to discuss.',
    ],
  },
  {
    id: 'kist-collaboration',
    title: 'New Life & KIST: a healthcare collaboration',
    category: 'Clinic news',
    image: '/media/journal/kist-collaboration.jpg',
    href: '/blogs/kist-collaboration',
    imagePosition: 'center 32%',
    body: [
      'New Life Health Care and KIST Teaching Hospital announced a collaboration at a memorandum of understanding signing ceremony.',
      'The announcement highlights the organisations’ aim of working together to strengthen health services and patient care. The photos below show moments from the signing.',
    ],
  },
];

export type ClinicVideo = JournalItem & { src: string };

export const clinicVideos: readonly ClinicVideo[] = [
  {
    id: 'clinic-tour',
    title: 'Take a look inside New Life Health Care',
    category: 'Our clinic',
    image: '/media/journal/clinic-tour.jpg',
    href: '/videos#clinic-tour',
    src: '/herosection%20video.mp4',
    duration: '0:52',
  },
];
