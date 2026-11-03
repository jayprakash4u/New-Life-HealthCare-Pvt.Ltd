import { treatments } from './treatments';

type TreatmentId = (typeof treatments)[number]['id'];
type TreatmentContent = {
  headingLead: string;
  headingAccent: string;
  overview: readonly string[];
  highlights: readonly string[];
  image: string;
  imageAlt: string;
};

// Service scope follows the public-post research and owner additions in docs/services-research.md.
const content: Record<TreatmentId, TreatmentContent> = {
  gastroenterology: {
    headingLead: '',
    headingAccent: 'Gastroenterology',
    overview: [
      'Gastroenterology focuses on digestive health. At New Life Health Care, you can enquire about consultations for stomach and digestive concerns and ask our team about the care available at our Imadol clinic.',
      'When arranging your visit, let our team know that you are enquiring about digestive health. They can help you confirm the relevant consultation, doctor availability and fees. If you would also like to ask about laboratory testing or ultrasound, please confirm those services separately.',
      'Choose Gastroenterology in the appointment form or contact the clinic by phone to begin your enquiry. Our team will help confirm the available consultation times before your visit.',
    ],
    highlights: ['Digestive health', 'Stomach-related concerns'],
    image: '/media/treatments/general-consultation-demo.jpg',
    imageAlt:
      'Illustrative consultation between a fictional doctor and patient',
  },
  'general-consultations': {
    headingLead: 'General',
    headingAccent: 'consultations',
    overview: [
      'General consultations at New Life Health Care cover routine checkups and common illnesses, including fever, colds and infections. They offer a starting point for discussing your health concerns with a doctor, whether you are arranging an everyday checkup or enquiring about a particular concern.',
      'Laboratory testing, ultrasound and pharmacy services are also listed at the clinic. If your enquiry includes one of these services, ask our team about its availability and charges when planning your consultation. Tests and other services should be confirmed separately rather than assumed to be included in a visit.',
      'Select General consultations in the appointment form to send an enquiry through WhatsApp, or call the clinic directly. Our team can help you check the available consultation times and confirm arrangements before you travel to Imadol.',
    ],
    highlights: ['General checkups', 'Common illnesses'],
    image: '/media/treatments/general-consultation-demo.jpg',
    imageAlt:
      'Illustrative consultation between a fictional doctor and patient',
  },
  'child-family-health': {
    headingLead: 'Child & family',
    headingAccent: 'healthcare',
    overview: [
      'New Life Health Care offers consultations for children and families at our Imadol clinic. This consultation area brings together enquiries about child health and family healthcare, giving you a place to ask about the care available for different members of your household.',
      'Alongside consultations, the clinic lists laboratory testing, ultrasound and pharmacy support. If you are planning visits for more than one family member, ask our team which consultations are available and whether separate visit arrangements are needed. You can also enquire about the charges for any additional services.',
      'Use the appointment form to select Child & family healthcare, or speak with our team by phone. Let the team know which consultation you are asking about so they can help you confirm the available times and plan your family’s visit.',
    ],
    highlights: ['Child health consultations', 'Family healthcare'],
    image: '/media/treatments/child-family-health-demo.jpg',
    imageAlt:
      'Illustrative family consultation with a fictional doctor, parents and child',
  },
  gynecology: {
    headingLead: '',
    headingAccent: 'Gynecology',
    overview: [
      'Gynecology consultations at New Life Health Care offer a place to discuss women’s health concerns with a doctor. You can contact the clinic to enquire about the consultation services available and arrange a visit that gives you an opportunity to raise your questions.',
      'New Life also lists breast-screening consultations, laboratory tests and ultrasound among its services. If your enquiry involves one of these options, ask our team which service is available and how it can be arranged. Availability and charges for separate services should be confirmed with the clinic.',
      'Choose Gynecology in the appointment form to begin your enquiry through WhatsApp. You can also call our team to ask about consultation fees, doctor timings and any visit arrangements you need to confirm before coming to the Imadol clinic.',
    ],
    highlights: ['Women’s health', 'Gynecology consultations'],
    image: '/media/treatments/gynecology-demo.jpg',
    imageAlt:
      'Illustrative women’s health consultation between a fictional doctor and adult patient',
  },
  'diabetes-bp-gastric-care': {
    headingLead: 'Diabetes, BP & gastric',
    headingAccent: 'care',
    overview: [
      'New Life Health Care provides consultations for diabetes, blood-pressure and gastric concerns. This consultation area is a starting point for enquiring about ongoing health concerns and finding out which consultation services are available at our Imadol clinic.',
      'If your enquiry also involves a laboratory test, ultrasound or medicine availability, you can ask the same team about those services at the clinic. Confirm the availability and charges for each service when arranging your visit, including whether you are enquiring about a consultation alone or additional services.',
      'Select Diabetes, BP & gastric care in the appointment form, or contact the clinic by phone. Our team can help you enquire about the relevant consultation, check the available doctor timings and confirm a suitable visit arrangement before you travel.',
    ],
    highlights: ['Diabetes & blood-pressure concerns', 'Gastric concerns'],
    image: '/media/treatments/diabetes-bp-gastric-care-demo.jpg',
    imageAlt:
      'Illustrative ongoing-health consultation between a fictional doctor and older patient',
  },
  'ent-care': {
    headingLead: 'ENT',
    headingAccent: 'care',
    overview: [
      'ENT care at New Life Health Care includes ear, nose and throat examinations and doctor consultations. Contact our team if you would like to discuss an ENT consultation or find out which related services are available at the Imadol clinic.',
      'Hearing checks and tests are also listed among New Life’s services. When making an enquiry, let our team know whether you are asking about an ENT consultation, a hearing test, or both. This helps you confirm the services, consultation times and charges relevant to your planned visit.',
      'Use the appointment form to select ENT care and send your request through WhatsApp, or call the clinic directly. Our team will help you check availability and confirm the visit details before you come to the clinic.',
    ],
    highlights: ['Ear, nose & throat consultations', 'Hearing-test enquiries'],
    image: '/media/treatments/ent-care-demo.jpg',
    imageAlt:
      'Illustrative ear, nose and throat consultation with a fictional doctor and patient',
  },
};

export const treatmentPages = treatments.map((treatment) => ({
  ...treatment,
  ...content[treatment.id],
}));
export type TreatmentPageData = (typeof treatmentPages)[number];

export function findTreatmentPage(slug: string) {
  return treatmentPages.find((treatment) => treatment.id === slug);
}
