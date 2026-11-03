import { services } from './services';

type ServiceId = (typeof services)[number]['id'];
type ServiceContent = {
  headingLead: string;
  headingAccent: string;
  overview: readonly string[];
  highlights: readonly string[];
  image: string;
  imageAlt: string;
  action: string;
  question: string;
  answer: string;
};

// Scope follows docs/services-research.md. Availability and prices require confirmation.
const content: Record<ServiceId, ServiceContent> = {
  'breast-screening': {
    headingLead: 'Breast',
    headingAccent: 'screening',
    overview: [
      'New Life Health Care offers breast examinations and breast-screening consultations at the Imadol clinic. You can speak with our team about the screening services available, ask how a consultation can be arranged and confirm the details of the visit you would like to request.',
      'Ultrasound, laboratory tests and gynecology consultations are also listed at New Life. If your enquiry involves one of these services, ask the clinic which options are available and whether they require separate arrangements. The team can clarify the service you are asking about and the associated charges.',
      'Use the screening enquiry button to open the form with Breast screening selected, or call the clinic directly. Confirm the available consultation time and any specific visit requirements with our team before coming to the clinic.',
    ],
    highlights: ['Breast examinations', 'Screening consultations'],
    image: '/media/treatments/gynecology-demo.jpg',
    imageAlt: 'Illustrative women’s health consultation with fictional people',
    action: 'Enquire about screening',
    question: 'How do I arrange a breast-screening consultation?',
    answer:
      'Contact our team by phone or WhatsApp to ask about the screening options and consultation times available. Our team will help you plan your visit.',
  },
  'hearing-tests': {
    headingLead: 'Hearing',
    headingAccent: 'tests',
    overview: [
      'Hearing checks and tests are available at New Life Health Care. This service page gives you a way to enquire about hearing-test availability, find out how a visit can be arranged and contact the team at our Imadol clinic.',
      'The clinic also lists ENT examinations and doctor consultations. If you are enquiring about both a hearing test and an ENT consultation, mention both when contacting our team. The team can help you confirm which services are available and explain the visit arrangements and charges for each.',
      'Select Hearing tests in the enquiry form to send a request through WhatsApp, or call the clinic. Please confirm the service availability, suitable visit time and whether any specific arrangements are needed before you travel.',
    ],
    highlights: ['Hearing checks', 'Hearing-test enquiries'],
    image: '/media/treatments/ent-care-demo.jpg',
    imageAlt:
      'Illustrative ear-care consultation with a fictional doctor and patient',
    action: 'Enquire about hearing tests',
    question: 'Can I also enquire about an ENT consultation?',
    answer:
      'Yes. Ear, nose and throat consultations are listed among our treatments. Ask our team about the consultation and hearing-test services available for your visit.',
  },
  laboratory: {
    headingLead: '',
    headingAccent: 'Laboratory',
    overview: [
      'Laboratory testing at New Life Health Care supports the investigation of symptoms and the review of ongoing health conditions. At our Imadol clinic, you can enquire about a requested test and discuss the arrangements before coming in.',
      'A test may be requested as part of a consultation or follow-up. Bring the complete request and any relevant earlier reports so the team can check which tests are available. Ask about preparation, charges and when you can expect the report for the specific investigation you need.',
      'Use the laboratory enquiry button to open the form with Laboratory selected. Ultrasound scans have their own service page and enquiry option, so you can contact the team about each service separately.',
    ],
    highlights: [
      'Test availability enquiries',
      'Preparation and report arrangements',
    ],
    image: '/media/services/lab-ultrasound-demo.jpg',
    imageAlt:
      'Illustrative laboratory professional working with testing equipment',
    action: 'Enquire about laboratory tests',
    question: 'How can I check preparation requirements for a test?',
    answer:
      'Tell our team the exact laboratory test requested. Ask whether it requires fasting or other preparation and follow the instructions for that particular test.',
  },
  ultrasound: {
    headingLead: '',
    headingAccent: 'Ultrasound',
    overview: [
      'New Life Health Care lists ultrasound (USG) services at the Imadol clinic. Ultrasound uses sound waves to make images of structures inside the body, helping a clinician investigate a concern or review a known condition.',
      'The scan requested depends on the question your clinician is trying to answer. Tell our team the exact examination on your referral, and ask which scans are available, what preparation is needed and how the appointment is arranged. A general ultrasound enquiry does not confirm every specialist type of scan.',
      'Use the ultrasound enquiry option to contact our team about availability, charges and report arrangements. Bring the request and relevant previous scans or reports so the reason for the examination can be understood clearly.',
    ],
    highlights: ['Ultrasound (USG) enquiries', 'Scan-specific preparation'],
    image: '/media/treatments/clinical-uterine-fibroid.png',
    imageAlt: 'Educational ultrasound image showing a uterine fibroid',
    action: 'Enquire about an ultrasound',
    question: 'Do I need to prepare for an ultrasound?',
    answer:
      'Preparation depends on the examination requested. Ask our team about your particular scan before visiting; do not assume every scan requires fasting or a full bladder.',
  },
  pharmacy: {
    headingLead: '',
    headingAccent: 'Pharmacy',
    overview: [
      'Pharmacy services are available at New Life Health Care, alongside the consultations and other health services listed at the clinic. You can contact our team to ask about pharmacy availability and the items you are enquiring about before visiting Imadol.',
      'When making an enquiry, tell our team the name of the item you want to ask about so they can help you check its current availability and charges. Confirm the details directly with the clinic rather than assuming that a particular medicine or pharmacy item is in stock.',
      'Choose Pharmacy in the enquiry form to contact the team through WhatsApp, or call the clinic directly. If your visit also involves a consultation or another service, ask about those arrangements separately so you can plan your visit with the relevant details confirmed.',
    ],
    highlights: ['On-site pharmacy', 'Availability enquiries'],
    image: '/media/services/pharmacy-demo.jpg',
    imageAlt:
      'Illustrative pharmacy conversation with a fictional pharmacist and customer',
    action: 'Check pharmacy availability',
    question: 'How can I check whether an item is available?',
    answer:
      'Call or message our team before your visit to ask about the item you need. Our team can confirm the current pharmacy availability and charges.',
  },
  'senior-health-checkups': {
    headingLead: 'Senior citizen health',
    headingAccent: 'checkups',
    overview: [
      'New Life Health Care offers general health checkups for older adults at our neighbourhood clinic in Imadol, Lalitpur. You can enquire for yourself or help an older family member find out which checkup and consultation services are available.',
      'The clinic also lists consultations for diabetes, blood-pressure and gastric concerns, as well as laboratory testing, ultrasound and pharmacy support. If your enquiry includes one of these services, ask our team about its availability and charges. The contents of a checkup and any additional services should be confirmed directly with the clinic.',
      'Select Senior citizen health checkups in the enquiry form, or call our team to discuss a visit. Confirm the consultation times and any specific arrangements needed for the person attending before travelling to the clinic.',
    ],
    highlights: ['General health checkups', 'Care for older adults'],
    image: '/media/treatments/diabetes-bp-gastric-care-demo.jpg',
    imageAlt:
      'Illustrative consultation between a fictional doctor and older adult',
    action: 'Request a checkup',
    question: 'Can I help an older family member arrange a visit?',
    answer:
      'Yes. You can contact our team to enquire about a health checkup for an older family member. Ask about consultation times and the services available before you visit.',
  },
  'flu-vaccination': {
    headingLead: 'Flu',
    headingAccent: 'vaccination',
    overview: [
      'Contact New Life Health Care to enquire about flu vaccination availability at the Imadol clinic. Our team can help you check the current availability and charges, and explain how a visit can be arranged when the service is available.',
      'Availability is confirmed by the clinic, so please check with our team before making a trip. You can also ask which consultation or visit arrangements apply to your enquiry. If you are enquiring for more than one person, let the team know so the relevant arrangements can be discussed.',
      'Use the availability button to open the enquiry form with Flu vaccination selected, then review and send your request through WhatsApp. You can also call the clinic to confirm the details and ask any questions about arranging your visit.',
    ],
    highlights: ['Availability enquiries', 'Visit arrangements'],
    image: '/media/services/flu-vaccination-demo.jpg',
    imageAlt:
      'Illustrative vaccination enquiry with a fictional nurse and adult',
    action: 'Check vaccine availability',
    question: 'Is flu vaccination currently available?',
    answer:
      'Please call or message the clinic to confirm the current availability before visiting. Our team will explain the available arrangements and consultation options.',
  },
};

export const servicePages = services.map((service) => ({
  ...service,
  ...content[service.id],
}));
export type ServicePageData = (typeof servicePages)[number];

export function findServicePage(slug: string) {
  return servicePages.find((service) => service.id === slug);
}
