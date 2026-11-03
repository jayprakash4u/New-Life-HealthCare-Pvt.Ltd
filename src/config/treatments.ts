// Public-post research and clinic-owner additions are recorded in docs/services-research.md.
export const treatments = [
  {
    id: 'general-consultations',
    title: 'General consultations',
    summary: 'Checkups and care for common illnesses.',
    description:
      'General checkups and consultations for fever, colds and infections.',
    icon: 'consultation',
  },
  {
    id: 'child-family-health',
    title: 'Child & family healthcare',
    summary: 'Consultations for children and families.',
    description:
      'Healthcare consultations for children and families at New Life.',
    icon: 'family',
  },
  {
    id: 'gynecology',
    title: 'Gynecology',
    summary: 'Women’s health consultations.',
    description: 'Gynecology consultations for women’s health concerns.',
    icon: 'gynecology',
  },
  {
    id: 'diabetes-bp-gastric-care',
    title: 'Diabetes, BP & gastric care',
    summary: 'Care for ongoing health concerns.',
    description:
      'Consultations for diabetes, blood-pressure and gastric concerns.',
    icon: 'heart',
  },
  {
    id: 'ent-care',
    title: 'ENT care',
    summary: 'Ear, nose and throat consultations.',
    description: 'Ear, nose and throat examinations and doctor consultations.',
    icon: 'hearing',
  },
  {
    id: 'gastroenterology',
    title: 'Gastroenterology',
    summary: 'Digestive health consultations.',
    description:
      'Enquire about consultations for stomach and digestive health concerns.',
    icon: 'digestive',
  },
] as const;
