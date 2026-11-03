import type { services } from './services';

type ServiceId = (typeof services)[number]['id'];
type ServiceGuide = {
  heading: string;
  introduction: readonly string[];
  topics: readonly { title: string; paragraphs: readonly string[] }[];
  sources: readonly { label: string; href: string }[];
};

export const serviceGuides: Record<ServiceId, ServiceGuide> = {
  'senior-health-checkups': {
    heading: 'A checkup that looks at everyday life, too',
    introduction: [
      'An older person may come for a blood-pressure check but also be struggling with painful knees, poor sleep or difficulty hearing a conversation. These concerns belong in the same discussion. A useful checkup starts with how someone is managing at home: walking, eating, remembering medicines and doing the things that matter to them. Getting older does not mean that every new difficulty should simply be accepted.',
      'At New Life, you can arrange a general health consultation for yourself or an older family member. The areas below are useful things to discuss with a clinician, rather than a fixed package of tests included in every visit. The assessment and any investigations should reflect the person’s symptoms, medical history, existing care and preferences.',
    ],
    topics: [
      {
        title: 'Blood pressure, diabetes and ongoing conditions',
        paragraphs: [
          'People who already take treatment for blood pressure or diabetes may need a review even when they feel reasonably well. Bring recent readings, earlier reports and the medicines actually being taken. Explain changes such as dizziness when standing, unusual thirst, reduced appetite or difficulty following the prescribed routine. A record from home can help the doctor understand what happens between visits.',
          'A checkup may include a blood-pressure measurement and a discussion about glucose, cholesterol, kidney function or other tests when appropriate. Age alone is not a reason to order every investigation. Ask what each suggested test is intended to find, how to prepare and who will explain the result. Laboratory services and their charges should be confirmed separately.',
        ],
      },
      {
        title: 'Joint pain, walking and the risk of falling',
        paragraphs: [
          'Stiff fingers, aching knees and reduced balance can make dressing, cooking or leaving the house more difficult. Mention a fall or near fall, even if it did not cause an injury. Describe whether pain limits walking, whether stairs are becoming harder and whether a walking aid is already used. The aim is to understand the effect on independence, not just name a painful joint.',
          'A clinician may consider strength, balance, footwear, vision and medicines when reviewing falls risk. Bone-health assessment may also be appropriate depending on the person’s history. Ask what can be assessed during the consultation and whether a separate specialist review is needed. Bring a family member if that would make getting to the clinic or explaining these changes easier.',
        ],
      },
      {
        title: 'Hearing, eyesight, memory and wellbeing',
        paragraphs: [
          'Turning up the television, struggling to follow speech or avoiding conversations can be signs that hearing needs attention. Blurred vision and difficulty seeing steps can also affect safety. Changes in memory, mood, sleep, appetite or bladder control are worth mentioning. A relative’s observations can be helpful, while keeping the older person involved in decisions about their own care.',
          'The doctor can discuss which concerns need further assessment. An eye examination, hearing test or more detailed memory assessment may require a separate appointment or referral; these are not automatically included in a general checkup. New Life lists hearing-test enquiries, and our team can explain the available arrangements.',
        ],
      },
      {
        title: 'Bring the full medicine list',
        paragraphs: [
          'Include prescription medicines, painkillers bought without a prescription, supplements and herbal products. If remembering the names is difficult, bring the packets. Tell the clinician about missed doses, unwanted effects, swallowing difficulties or having more than one person prescribe treatment. Do not stop or change regular medicines on your own in preparation for the visit.',
          'Before leaving, ask for the next steps in a form the person can follow: which reports to bring back, whether another appointment is needed and whom to contact about the arrangements. Tell our team in advance if help with mobility or communication is needed so they can discuss what is available at the clinic.',
        ],
      },
    ],
    sources: [
      {
        label: 'NIH: healthy aging',
        href: 'https://health.nih.gov/health-topics-a-z/healthy-aging',
      },
      {
        label: 'CDC: preventing falls',
        href: 'https://www.cdc.gov/falls/prevention/',
      },
      {
        label: 'Healthdirect: checkups for older adults',
        href: 'https://www.healthdirect.gov.au/procedures/health-screenings/manage-your-health-in-your-70s-and-older',
      },
    ],
  },
  'breast-screening': {
    heading: 'Understanding a change in your breast',
    introduction: [
      'Finding a lump or noticing a change can leave you with many questions before you have spoken to anyone. A consultation gives you a place to describe what has changed and discuss an examination. Many breast lumps have a non-cancerous cause, but a new lump should be assessed rather than judged from its appearance or from a photograph online.',
      'New Life lists breast examinations and screening consultations. When contacting the clinic, say whether you have a new symptom or are asking about a routine check without symptoms. These are different reasons for a visit, and the team can help confirm the appropriate arrangements. The reference scans below illustrate breast findings; they cannot establish the cause of an individual person’s symptoms.',
    ],
    topics: [
      {
        title: 'Lumps, nipple changes and skin changes',
        paragraphs: [
          'Arrange a medical assessment for a new lump in the breast or armpit. Also mention an unusual change in breast shape, skin dimpling, a newly inward-turning nipple or bloodstained nipple discharge. Tell the clinician when it began, whether it has changed and whether there is pain. Do not wait for a routine screening appointment to raise a new concern.',
          'Fluid-filled cysts and non-cancerous growths such as fibroadenomas are among the possible causes of lumps. An examination and, when needed, further tests help distinguish between causes. The images on this page show examples of findings, not a guide for diagnosing yourself.',
        ],
      },
      {
        title: 'Screening and investigating a symptom are different',
        paragraphs: [
          'Screening looks for changes before they can be felt or noticed. A mammogram is a breast X-ray used in many screening programmes. Investigating a symptom, on the other hand, begins with the particular concern you bring to the clinician. Ultrasound or other tests may be recommended depending on the assessment; one test does not replace every other type of breast investigation.',
          'The choice and timing of screening depend on personal risk and clinical guidance. New Life’s listed services do not establish that mammography or biopsy is available on site. Ask the team which examinations or scans can be arranged locally and which may require another facility.',
        ],
      },
      {
        title: 'Making the consultation more useful',
        paragraphs: [
          'Bring any earlier breast scan reports and explain relevant previous treatment or family history. Write down the questions you most want answered, especially if you are worried you may forget them during the visit. You can ask about privacy, a chaperone and the examination arrangements when booking.',
          'Before leaving, clarify whether another investigation is needed, who will discuss its result and how follow-up will be arranged. Contact the clinic about availability and charges for the specific service recommended, rather than assuming that every investigation is included in the consultation.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: breast lumps',
        href: 'https://www.nhs.uk/symptoms/breast-lump/',
      },
      {
        label: 'NHS: breast screening',
        href: 'https://www.nhs.uk/tests-and-treatments/breast-screening-mammogram/',
      },
    ],
  },
  'hearing-tests': {
    heading: 'When hearing starts to affect a conversation',
    introduction: [
      'You may hear someone speaking but struggle to make out the words, particularly when other people are talking nearby. Family members may notice a louder television, repeated questions or a child not responding as expected. These are useful observations to bring to a hearing appointment, even if you are not sure when the change began.',
      'New Life offers hearing-test enquiries alongside ENT consultations. An examination of the ear and a hearing test answer different questions: looking into the ear may show a physical problem, while hearing tests assess how well sound is heard. Tell our team whether you need a test, a doctor’s review or advice about both.',
    ],
    topics: [
      {
        title: 'Blocked ears, infection and changes in hearing',
        paragraphs: [
          'Wax build-up, ear infection and problems with the eardrum can be relevant to a change in hearing. The clinical photographs below show some visible ear conditions, but a normal-looking outer ear does not tell you whether hearing is normal. Explain any blocked sensation, ringing, discharge or pain as well as the hearing difficulty.',
          'Sudden hearing loss, or hearing that becomes worse quickly, needs urgent medical assessment rather than waiting for a routine test. Tell the clinician promptly if hearing loss comes with earache or discharge. Do not use the pictures to decide whether it is safe to put something into the ear.',
        ],
      },
      {
        title: 'What to ask about a hearing assessment',
        paragraphs: [
          'There are different ways to assess hearing, and the choice depends on age and the reason for testing. When arranging the visit, describe who the test is for and the main concern. Ask which test is available, whether an ENT examination is also needed and how the findings will be explained.',
          'If a child is attending, share what has been noticed at home or school and ask about the appropriate assessment for their age. Confirm the appointment and charges with New Life before travelling; this page does not promise that every specialist hearing investigation is provided at the clinic.',
        ],
      },
      {
        title: 'Bring the history, not just the last report',
        paragraphs: [
          'Earlier hearing reports, ear operations, recent infections and hearing-aid use may all be relevant to the conversation. Bring previous reports if you have them, and mention regular medicines. It can help to describe an everyday situation that has become difficult, such as understanding a phone call or following a lesson.',
          'Ask what the result means for the next step and whether another review is needed. Let the team know if written communication or a family member’s support would make the appointment easier. Clear communication during the visit matters just as much as the test itself.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: hearing tests',
        href: 'https://www.nhs.uk/tests-and-treatments/hearing-tests/',
      },
      {
        label: 'NIH: age-related hearing loss',
        href: 'https://health.nih.gov/health-topics-a-z/age-related-hearing-loss',
      },
    ],
  },
  laboratory: {
    heading: 'Understanding your laboratory test',
    introduction: [
      'A laboratory request can be a short line on a prescription, but it often comes with practical questions: do I need to fast, which report should I bring and who will explain the result? The most useful starting point is the exact test requested and the reason the clinician suggested it. Different tests answer different questions, even when they use the same type of sample.',
      'Contact New Life with the complete request so the team can check the tests available, preparation and charges. The clinical images below show a blood specimen, blood cells under a microscope and a glucose monitor. They are educational examples, not a complete laboratory test menu or results from New Life patients.',
    ],
    topics: [
      {
        title: 'Blood tests and the questions they answer',
        paragraphs: [
          'A full blood count looks at blood cells, while a glucose test measures blood sugar. Other blood tests may be used to assess cholesterol, thyroid function or kidney-related measurements. Which investigation is appropriate depends on symptoms, existing conditions and treatment. A finger-prick glucose reading and a laboratory investigation are not interchangeable in every situation.',
          'Bring the complete request rather than choosing tests from the photographs on this page. If you have previous results, bring those too. Ask the clinician what each investigation is intended to check and confirm the availability of the requested tests with our team before making the trip.',
        ],
      },
      {
        title: 'Preparing for sample collection',
        paragraphs: [
          'Some blood tests require fasting, while many do not. Follow the instructions for your particular test and ask if they are unclear. Do not skip food or change regular medicines simply because you are having a blood test. Tell the clinician about any medicines you take so the instructions can be considered in context.',
          'When contacting the clinic, mention whether the request includes more than one test or a particular sample. Ask about the collection arrangements and any preparation that applies. A consultation and a laboratory investigation may involve separate charges, so check the details of the services you need.',
        ],
      },
      {
        title: 'Collecting the report and arranging a review',
        paragraphs: [
          'Ask when the report is expected, how it can be collected and who will discuss it with you. Keep the report with your prescription and any earlier results so it is available at the next consultation. If another doctor requested the investigation, ask how the report should be taken back to that clinician.',
          'A result needs to be considered alongside your history and examination, rather than interpreted from one number alone. Before leaving, clarify whether a follow-up appointment is needed. Ultrasound scans are listed separately on this website, with their own information and enquiry option.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: blood tests',
        href: 'https://www.nhs.uk/tests-and-treatments/blood-tests/',
      },
    ],
  },
  ultrasound: {
    heading: 'Understanding the scan you have been asked to arrange',
    introduction: [
      'An ultrasound request usually asks a specific question about an organ, a symptom or a condition already being followed. Ultrasound uses sound waves to create images inside the body. It is a different service from laboratory testing, and the examination and preparation depend on the area being scanned.',
      'Tell our team the exact scan requested so they can confirm availability and appointment arrangements at New Life. The reference images below illustrate pelvic ultrasound findings. They do not describe an individual patient’s diagnosis, advertise every specialist scan or replace the explanation of your own report.',
    ],
    topics: [
      {
        title: 'Different scans look at different areas',
        paragraphs: [
          'A clinician may request ultrasound to investigate pain or a lump, assess an organ or monitor a known condition. The request should identify the examination needed. If the wording is unfamiliar, show the complete referral to the clinic instead of trying to select the scan from an image online.',
          'An ultrasound image can show a finding such as a cyst or fibroid, but the meaning depends on the full examination and clinical context. The educational examples on this page are not a way to diagnose yourself. Ask which examinations can be arranged at New Life and whether a particular specialist scan needs another facility.',
        ],
      },
      {
        title: 'Preparation, privacy and the appointment',
        paragraphs: [
          'Some scans need a full bladder, and preparation can differ between examinations. Follow the instructions supplied for your scan rather than assuming that every ultrasound requires the same preparation. If you have questions about food, fluids or regular medicines, ask before the visit.',
          'Bring your request and any earlier scan reports. You can ask about the examination arrangements, privacy and a chaperone when booking. Let the team know about any mobility or communication needs so they can discuss the available support. Confirm the appointment time and charges before travelling.',
        ],
      },
      {
        title: 'Understanding the report and the next step',
        paragraphs: [
          'Ask when the report will be available and how to collect it. A scan report describes findings, but the clinician reviewing your care needs to consider those findings with your symptoms and medical history. Keep the report and any images provided together for that discussion.',
          'If the scan was requested by another clinician, ask how to arrange the follow-up with them. A laboratory test suggested alongside a scan is a separate investigation; use the Laboratory service option to ask our team about those arrangements.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: ultrasound scans',
        href: 'https://www.nhs.uk/tests-and-treatments/ultrasound-scan/',
      },
    ],
  },
  pharmacy: {
    heading: 'Understanding the medicines you take home',
    introduction: [
      'Collecting a medicine is often the last part of a clinic visit, when you may already have several instructions to remember. It is worth checking anything that is unclear before you leave. Bring the prescription or the original pack when asking about an item; a colour, shape or remembered brand name may not be enough to identify it correctly.',
      'New Life has pharmacy services at the clinic. Our team can help you check the availability and charges for the item you are enquiring about. The photographs below show examples of medicine packaging and devices, not products advertised as in stock or recommendations for a particular person.',
    ],
    topics: [
      {
        title: 'Check the name, strength and instructions',
        paragraphs: [
          'When a prescription is being discussed, show the complete prescription rather than only a cropped medicine name. If you already have the packaging, bring that too. Ask for an explanation of anything you cannot read or understand, including how the supplied item relates to the prescription.',
          'Tell the pharmacist or prescriber about other medicines, supplements and known allergies. If an item is unavailable, ask how to contact the prescribing clinician about the next step. Do not choose a substitute based on a similar-looking packet or on a photograph from this website.',
        ],
      },
      {
        title: 'Questions about a new medicine or a device',
        paragraphs: [
          'A pharmacist can help explain medicine instructions and discuss worries about unwanted effects. If a medicine uses a device, such as an inhaler, ask for an explanation of its use rather than assuming that every device works in the same way. Seek advice if you are unsure about taking a medicine alongside existing treatment.',
          'There is no dosing advice on this page because the right instructions depend on the prescribed product and the person taking it. Take questions about missed doses, side effects or changes in treatment to a qualified professional. Confirm which advice services are available at New Life when making your enquiry.',
        ],
      },
      {
        title: 'Planning a refill or helping a family member',
        paragraphs: [
          'Before travelling, ask the clinic about the exact item and strength you need. Keep the prescription and any relevant earlier instructions together, especially when collecting for an older relative who takes several medicines. A current written list can make the conversation easier for everyone involved.',
          'Ask how the supplied medicine should be stored and what to do with medicines you no longer use. A pill organiser may be useful for some routines, but whether a medicine can be removed from its original packaging needs checking first. The organiser pictured here is a reference example, not a personalised recommendation.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: advice from a pharmacist',
        href: 'https://www.nhs.uk/nhs-services/pharmacies/how-pharmacies-can-help/',
      },
    ],
  },
  'flu-vaccination': {
    heading: 'Planning ahead for flu protection',
    introduction: [
      'Flu vaccination is a preventive service, so the conversation is different from a visit for an illness you already have. You may be asking for yourself, an older parent or someone with an ongoing health condition. Start by telling the clinic who the enquiry is for and asking about the vaccine currently available, rather than assuming that the same product is suitable for everyone.',
      'Contact New Life to confirm current availability, charges and appointment arrangements. The reference photographs show vaccination and influenza-related images from public educational sources. They are not photographs of vaccination at New Life and do not identify the vaccine product supplied by the clinic.',
    ],
    topics: [
      {
        title: 'Who should discuss flu vaccination?',
        paragraphs: [
          'Flu can be more serious for older adults, pregnant people and people with certain long-term conditions. A clinician can discuss vaccination in the context of the person’s age, health and previous vaccine history. Advice for a child may differ from advice for an adult, so include the age when you contact the team.',
          'Vaccination helps protect against influenza; it is not treatment for a current flu illness and does not prevent every cough or cold. Ask a qualified clinician about the appropriate vaccine and timing for you. Recommendations and the products available locally should guide the decision.',
        ],
      },
      {
        title: 'Tell the clinician about previous reactions',
        paragraphs: [
          'Mention a serious previous reaction to a vaccine, relevant allergies, pregnancy and ongoing treatment. If you are currently unwell, ask whether the appointment should go ahead. These details allow the clinician to consider suitability rather than making a decision from a general information page.',
          'You can ask what the vaccine is called, what effects to expect afterwards and whom to contact with a concern. Bring any vaccination record you have so the discussion does not rely only on memory. Do not assume that another person’s vaccine instructions apply to your own situation.',
        ],
      },
      {
        title: 'Confirm the visit before making the trip',
        paragraphs: [
          'Tell our team how many people the enquiry is for and whether you are also requesting a consultation. Ask the team to confirm availability for the intended visit, the charges and any arrangements you need to know about before coming to Imadol.',
          'An enquiry through this website opens a request for the clinic to review; it does not reserve a vaccine or confirm an appointment automatically. Wait for the team’s response and keep any instructions they provide with your visit details.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: flu vaccination',
        href: 'https://www.nhs.uk/vaccinations/flu-vaccine/',
      },
    ],
  },
};
