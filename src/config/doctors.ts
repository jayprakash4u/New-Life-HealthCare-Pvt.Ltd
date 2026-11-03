// Owner requested Nepali sample names. Replace these with approved clinic profiles.
// These are design samples, not a verified roster of New Life clinicians.
export type Doctor = {
  id: string;
  publishedByClinic?: boolean;
  name: string;
  specialty: string;
  careId: string;
  interests: readonly string[];
  image: string;
};

export const doctors: readonly Doctor[] = [
  {
    id: 'aarav-sharma',
    name: 'Dr. Aarav Sharma',
    specialty: 'General consultations',
    careId: 'general-consultations',
    interests: ['General checkups', 'Everyday health'],
    image: '/media/doctors/aarav-sharma.jpg',
  },
  {
    id: 'anisha-shrestha',
    name: 'Dr. Anisha Shrestha',
    specialty: 'Gynecology',
    careId: 'gynecology',
    interests: ['Women’s health', 'Consultations'],
    image: '/media/doctors/anisha-shrestha.jpg',
  },
  {
    id: 'suman-adhikari',
    name: 'Dr. Suman Adhikari',
    specialty: 'ENT care',
    careId: 'ent-care',
    interests: ['Ear, nose & throat', 'ENT consultations'],
    image: '/media/doctors/suman-adhikari.jpg',
  },
  {
    id: 'pratima-karki',
    name: 'Dr. Pratima Karki',
    specialty: 'Child & family healthcare',
    careId: 'child-family-health',
    interests: ['Child health', 'Family care'],
    image: '/media/doctors/pratima-karki.jpg',
  },
  {
    id: 'nabin-thapa',
    name: 'Dr. Nabin Thapa',
    specialty: 'Diabetes, BP & gastric care',
    careId: 'diabetes-bp-gastric-care',
    interests: ['Blood pressure', 'Ongoing health concerns'],
    image: '/media/doctors/nabin-thapa.jpg',
  },
  {
    id: 'sneha-gurung',
    name: 'Dr. Sneha Gurung',
    specialty: 'General consultations',
    careId: 'general-consultations',
    interests: ['General checkups', 'Family wellbeing'],
    image: '/media/doctors/sneha-gurung.jpg',
  },
];
