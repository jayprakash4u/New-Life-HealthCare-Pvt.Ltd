import type { ClinicalImage } from '@/components/treatments/clinical-image-gallery';

type ReferenceImage = {
  id: string;
  title: string;
  description: string;
  file: string;
  sourceFile: string;
  author: string;
  authorHref?: string;
  license:
    'CC BY-SA 3.0' | 'CC BY-SA 4.0' | 'CC BY 2.0' | 'CC0' | 'Public domain';
};

function referenceImage(item: ReferenceImage): ClinicalImage {
  const source = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(item.sourceFile.replaceAll(' ', '_'))}`;
  const licenses = {
    'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
    'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
    'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
    CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
    'Public domain': `${source}#Licensing`,
  };
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    alt: item.description,
    image: `/media/treatments/${item.file}`,
    author: item.author,
    authorHref: item.authorHref,
    source,
    license: item.license,
    licenseHref: licenses[item.license],
  };
}

const conjunctivitis = referenceImage({
  id: 'conjunctivitis',
  title: 'Conjunctivitis',
  description:
    'Clinical photograph showing redness of the eye in conjunctivitis.',
  file: 'clinical-conjunctivitis.jpg',
  sourceFile: 'Conjunctivitis disease.jpg',
  author: 'Banswalhemant',
  license: 'CC BY-SA 4.0',
});
const dermatitis = referenceImage({
  id: 'dermatitis',
  title: 'Dermatitis',
  description: 'Clinical photograph of a mild dermatitis rash.',
  file: 'clinical-dermatitis.jpg',
  sourceFile: 'Dermatitis.jpg',
  author: 'Topbanana / Wikimedia Commons',
  license: 'CC BY-SA 3.0',
});
const tonsillitis: ClinicalImage = {
  id: 'tonsillitis',
  title: 'Tonsillitis',
  description: 'Clinical photograph showing inflammation in the tonsil area.',
  alt: 'Clinical reference photograph of tonsillitis',
  image: '/media/treatments/ent-tonsillitis.jpg',
  author: 'CDC / PHIL 6323',
  source: 'https://commons.wikimedia.org/wiki/File:Tonsillitis_-_cdc_6323.jpg',
  license: 'Public domain',
  licenseHref:
    'https://commons.wikimedia.org/wiki/File:Tonsillitis_-_cdc_6323.jpg#Licensing',
};
const chickenpox = referenceImage({
  id: 'chickenpox',
  title: 'Chickenpox rash',
  description: 'Clinical photograph of chickenpox on an adult’s back.',
  file: 'clinical-chickenpox.jpg',
  sourceFile: 'Chickenpox Adult back.jpg',
  author: 'F malan',
  license: 'CC BY-SA 3.0',
});
const handFootMouth = referenceImage({
  id: 'hand-foot-mouth',
  title: 'Hand, foot & mouth disease',
  description: 'Clinical photograph of blisters on an adult’s hand.',
  file: 'clinical-hand-foot-mouth.jpeg',
  sourceFile: 'Hand, Foot and Mouth Disease Blisters.jpeg',
  author: 'Mrradiostar82',
  license: 'CC BY-SA 3.0',
});
const fibroid = referenceImage({
  id: 'uterine-fibroid',
  title: 'Uterine fibroid',
  description: 'Ultrasound image showing a subserosal uterine fibroid.',
  file: 'clinical-uterine-fibroid.png',
  sourceFile: 'Subserosal uterine fibroid.png',
  author: 'Mikael Häggström',
  license: 'CC0',
});
const ovarianCyst = referenceImage({
  id: 'ovarian-cyst',
  title: 'Ovarian cyst',
  description: 'Ultrasound image of a haemorrhagic ovarian cyst.',
  file: 'clinical-ovarian-cyst.jpg',
  sourceFile: 'Haemorrhagic ovarian cyst ultrasound.jpg',
  author: 'Mme Mim',
  license: 'CC BY-SA 3.0',
});
const ovarianMass = referenceImage({
  id: 'ovarian-mass',
  title: 'Ovarian mass',
  description:
    'Ultrasound image described by its source as a suspected ovarian fibroma.',
  file: 'clinical-ovarian-mass.jpg',
  sourceFile: 'Fibroma 0001.jpg',
  author: 'Mme Mim',
  license: 'CC BY-SA 4.0',
});
const gastritis = referenceImage({
  id: 'gastritis',
  title: 'Stomach inflammation',
  description: 'Clinical reference photograph showing erosive gastritis.',
  file: 'clinical-gastritis.jpg',
  sourceFile: 'Gastritis erosiva.2278.jpg',
  author: 'Amadalvarez',
  license: 'CC BY-SA 4.0',
});
const gastricUlcer = referenceImage({
  id: 'gastric-ulcer',
  title: 'Gastric ulcer',
  description: 'Endoscopic image of ulcers in the lower part of the stomach.',
  file: 'clinical-gastric-ulcer.jpg',
  sourceFile: 'Gastric Ulcer Antrum.jpg',
  author: 'Med_Chaos',
  license: 'Public domain',
});
const stricture = referenceImage({
  id: 'peptic-stricture',
  title: 'Oesophageal narrowing',
  description:
    'Endoscopic image showing a peptic stricture near the stomach junction.',
  file: 'clinical-peptic-stricture.png',
  sourceFile: 'Peptic stricture.png',
  author: 'Samir धर्म',
  license: 'Public domain',
});
const glucose = referenceImage({
  id: 'glucose-monitor',
  title: 'Low blood-sugar reading',
  description:
    'Clinical reference photograph of a glucose monitor displaying a low reading.',
  file: 'clinical-glucose-monitor.jpg',
  sourceFile: 'Low Blood Sugar - Glucose Monitor - 50191694906.jpg',
  author: 'Formulate Health',
  authorHref: 'https://www.formulatehealth.com/',
  license: 'CC BY 2.0',
});
const bloodPressure = referenceImage({
  id: 'blood-pressure',
  title: 'Blood-pressure assessment',
  description: 'Clinical photograph showing a blood-pressure measurement.',
  file: 'clinical-blood-pressure.jpg',
  sourceFile: 'Blood pressure measurement.jpg',
  author: 'Jesse K. Alwin / U.S. Marine Corps',
  license: 'Public domain',
});

export const treatmentClinicalImages: Record<string, readonly ClinicalImage[]> =
  {
    'general-consultations': [conjunctivitis, dermatitis, tonsillitis],
    'child-family-health': [chickenpox, handFootMouth, dermatitis],
    gynecology: [fibroid, ovarianCyst, ovarianMass],
    'diabetes-bp-gastric-care': [glucose, bloodPressure, gastritis],
    gastroenterology: [gastritis, gastricUlcer, stricture],
  };
