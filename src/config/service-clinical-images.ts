import type { ClinicalImage } from '@/components/treatments/clinical-image-gallery';
import { treatmentClinicalImages } from './treatment-clinical-images';
import type { services } from './services';

type ServiceId = (typeof services)[number]['id'];

function image(
  id: string,
  title: string,
  description: string,
  file: string,
  sourceFile: string,
  author: string,
  license:
    | 'CC BY-SA 3.0'
    | 'CC BY-SA 4.0'
    | 'CC BY 2.0'
    | 'CC BY 4.0'
    | 'Public domain',
): ClinicalImage {
  const source = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(sourceFile.replaceAll(' ', '_'))}`;
  const licenses = {
    'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
    'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
    'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
    'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
    'Public domain': `${source}#Licensing`,
  };
  return {
    id,
    title,
    description,
    alt: description,
    image: `/media/services/${file}`,
    author,
    source,
    license,
    licenseHref: licenses[license],
  };
}

const cataract = image(
  'cataract',
  'Changes in eyesight',
  'Clinical photograph showing a cataract in a human eye.',
  'clinical-cataract.png',
  'Cataract in human eye.png',
  'Rakesh Ahuja, MD',
  'CC BY-SA 3.0',
);
const arthritis = image(
  'hand-osteoarthritis',
  'Joint stiffness and pain',
  'Clinical photograph of osteoarthritis affecting an older adult’s index finger.',
  'clinical-hand-osteoarthritis.jpg',
  'Osteoarthritis in the left hand index finger.jpg',
  'Whoisjohngalt',
  'CC BY-SA 4.0',
);
const breastCyst = image(
  'breast-cyst',
  'Breast cyst',
  'Ultrasound reference showing simple breast cysts.',
  'clinical-breast-cyst.jpg',
  'Breast ultrasound 110302093640 0942031.jpg',
  'Nevit Dilmen',
  'CC BY-SA 3.0',
);
const fibroadenoma = image(
  'fibroadenoma',
  'Fibroadenoma',
  'Ultrasound reference showing a fibroadenoma of the breast.',
  'clinical-breast-fibroadenoma.jpg',
  'Breast US Fibroadenoma 0531092046875 Nevit.jpg',
  'Nevit Dilmen',
  'CC BY-SA 3.0',
);
const calcifiedFibroadenoma = image(
  'calcified-fibroadenoma',
  'Calcified fibroadenoma',
  'Diagnostic reference image described by its source as a calcified fibroadenoma.',
  'clinical-calcified-fibroadenoma.jpg',
  'Calcified fibroadenoma 123647250.jpg',
  'Nevit Dilmen',
  'CC BY-SA 3.0',
);
const bloodCount = image(
  'blood-count',
  'Blood count and sample',
  'Reference image of a blood specimen alongside complete blood count results.',
  'clinical-blood-count.jpg',
  'Complete blood count and differential.jpg',
  'SpicyMilkBoy',
  'CC BY-SA 4.0',
);
const medicine = image(
  'medicine-packaging',
  'Medicine packaging',
  'Reference photograph of medicines in their packaging; not a stock list.',
  'medicine-packaging.jpg',
  'Medicine Health.jpg',
  'SarKaLay စာကလေး',
  'CC BY-SA 4.0',
);
const inhaler = image(
  'inhaler',
  'Using a medicine device',
  'Reference photograph of an inhaler device; instructions depend on the prescribed product.',
  'inhaler-device.jpg',
  'Inhaler - 3230581981.jpg',
  'penreyes',
  'CC BY 2.0',
);
const organiser = image(
  'pill-organiser',
  'Organising a medicine routine',
  'Reference photograph of a pill organiser. Check suitability with a pharmacist before using one.',
  'pill-organiser.jpg',
  '2023 Kasetka z lekami.jpg',
  'Jacek Halicki',
  'CC BY-SA 4.0',
);
const h7n9 = image(
  'influenza-h7n9',
  'Influenza under a microscope',
  'Electron micrograph of influenza A (H7N9), showing virus particles.',
  'influenza-h7n9.png',
  'Electron micrograph of Influenza A H7N9.png',
  'CDC / Cynthia S. Goldsmith and Thomas Rowe',
  'Public domain',
);
const h1n1 = image(
  'influenza-h1n1',
  'Influenza A virus particles',
  'Colourised electron micrograph of influenza A (H1N1), an influenza subtype associated with seasonal outbreaks.',
  'influenza-h1n1.jpg',
  'Influenza A Virus (H1N1)-1.jpg',
  'NIAID / NIH; John Gallagher and Audray Harris',
  'Public domain',
);
const vaccination = image(
  'vaccination',
  'Vaccination in practice',
  'Reference still from CDC footage showing a vaccination injection, not a New Life patient.',
  'vaccination-reference.jpg',
  'Needle injection stock footage.webm',
  'CDC',
  'Public domain',
);

const earwax: ClinicalImage = {
  id: 'earwax',
  title: 'Impacted earwax',
  description: 'Clinical view of an earwax plug in the ear canal.',
  alt: 'Clinical view of an earwax plug in the ear canal.',
  image: '/media/treatments/ent-impacted-earwax.jpg',
  author: 'Didier Descouens',
  source: 'https://commons.wikimedia.org/wiki/File:BouchonCerumen.jpg',
  license: 'CC BY-SA 3.0',
  licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
};
const eardrum: ClinicalImage = {
  id: 'eardrum',
  title: 'Perforated eardrum',
  description:
    'Clinical otoscopy photograph showing a perforation in the eardrum.',
  alt: 'Clinical otoscopy photograph showing a perforation in the eardrum.',
  image: '/media/treatments/ent-perforated-eardrum.jpg',
  author: 'Michael Hawke, MD',
  source:
    'https://commons.wikimedia.org/wiki/File:Traumatic_Perforation_of_the_Tympanic_Membrane.jpg',
  license: 'CC BY 4.0',
  licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
};
const earInfection: ClinicalImage = {
  id: 'outer-ear-infection',
  title: 'Outer-ear infection',
  description: 'Clinical photograph of an ear affected by otitis externa.',
  alt: 'Clinical photograph of an ear affected by otitis externa.',
  image: '/media/treatments/ent-otitis-externa.jpg',
  author: 'James Heilman, MD',
  source: 'https://commons.wikimedia.org/wiki/File:OtitisExterna10.JPG',
  license: 'CC BY 3.0',
  licenseHref: 'https://creativecommons.org/licenses/by/3.0/',
};

export const serviceClinicalImages: Record<
  ServiceId,
  readonly ClinicalImage[]
> = {
  'senior-health-checkups': [
    treatmentClinicalImages['diabetes-bp-gastric-care'][1],
    arthritis,
    cataract,
  ],
  'breast-screening': [breastCyst, fibroadenoma, calcifiedFibroadenoma],
  'hearing-tests': [earwax, eardrum, earInfection],
  laboratory: [
    bloodCount,
    image(
      'blood-smear',
      'Blood cells under a microscope',
      'Microscopy photograph of a peripheral blood smear, showing blood cells.',
      'clinical-blood-smear.jpg',
      'Кров людини.jpg',
      'Степанюк Ярослав / Борис Максим',
      'CC BY 4.0',
    ),
    treatmentClinicalImages['diabetes-bp-gastric-care'][0],
  ],
  ultrasound: treatmentClinicalImages.gynecology,
  pharmacy: [medicine, inhaler, organiser],
  'flu-vaccination': [vaccination, h1n1, h7n9],
};
