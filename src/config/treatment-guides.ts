export type TreatmentGuide = {
  heading: string;
  introduction: readonly string[];
  topics: readonly { title: string; paragraphs: readonly string[] }[];
  sources: readonly { label: string; href: string }[];
};

export const treatmentGuides: Record<string, TreatmentGuide> = {
  'ent-care': {
    heading: 'Understanding ear, nose and throat concerns',
    introduction: [
      'An earache that keeps returning, a blocked nose that makes the day uncomfortable, or a sore throat that affects meals can be difficult to ignore. These concerns may sound small when described on their own, but what matters is how they are affecting you and whether they are changing. An ENT consultation gives you an opportunity to explain that experience and have your concerns assessed.',
      'At New Life Health Care, ENT care includes ear, nose and throat examinations and doctor consultations. The discussion may focus on one area or several related concerns. You do not need to decide what is causing the problem before your visit; a clear account of your symptoms and any previous treatment is a useful place to start.',
    ],
    topics: [
      {
        title: 'Ear discomfort and changes in hearing',
        paragraphs: [
          'Ear problems are not always experienced as pain. You may notice that sounds seem less clear, feel pressure in an ear, or have discomfort that comes and goes. Tell the clinician whether one or both ears are affected, when the change started and whether you have noticed discharge, fever or other symptoms. These details help put the examination in context.',
          'Hearing tests are also listed among New Life’s services. If hearing is your main concern, mention this when arranging the consultation so our team can explain the available test options. An ENT consultation and a hearing test are separate services, and the appropriate next step depends on the assessment.',
        ],
      },
      {
        title: 'Nasal blockage and sinus-related concerns',
        paragraphs: [
          'A blocked or runny nose can occur alongside pressure around the cheeks or forehead and a reduced sense of smell. When explaining your symptoms, describe whether the problem is constant or comes in episodes, whether it affects one side, and how long it has been present. It is also helpful to mention any nasal sprays or medicines you have already used.',
          'The purpose of a consultation is to understand your particular concern, rather than assume that every blocked nose has the same cause. You can ask the doctor to explain the examination findings and whether further assessment is needed, especially if symptoms have been returning despite earlier care.',
        ],
      },
      {
        title: 'Recurring throat symptoms',
        paragraphs: [
          'A sore throat may make eating, drinking or speaking uncomfortable. If it keeps returning, explain how often it happens, how long each episode lasts and whether it occurs with fever, ear discomfort or other symptoms. Previous prescriptions and examination reports can help you describe what has already been tried.',
          'During your visit, ask about anything in the advice that is unclear, including what to watch for and when a review may be needed. Difficulty breathing or being unable to swallow needs emergency care; it should not be left waiting for a routine appointment or a WhatsApp reply.',
        ],
      },
    ],
    sources: [
      { label: 'NHS: earache', href: 'https://www.nhs.uk/symptoms/earache/' },
      {
        label: 'NHS: sinusitis',
        href: 'https://www.nhs.uk/conditions/sinusitis-sinus-infection/',
      },
      {
        label: 'NHS: sore throat',
        href: 'https://www.nhs.uk/symptoms/sore-throat/',
      },
    ],
  },
  'general-consultations': {
    heading: 'When you need to talk to a doctor',
    introduction: [
      'Sometimes the reason for a visit is straightforward: a fever, a cough or an illness that has interrupted your usual routine. At other times, you may simply know that something does not feel right. A general consultation is a place to explain what you have noticed, ask questions and discuss what should happen next, without having to choose a diagnosis yourself.',
      'New Life Health Care offers general checkups and consultations for common illnesses at our Imadol clinic. Your reason for visiting may be new, something that has returned, or a question left over from previous care. Giving the doctor the full story helps make the conversation more useful than looking at a single symptom or report in isolation.',
    ],
    topics: [
      {
        title: 'New symptoms and common illnesses',
        paragraphs: [
          'Coughs, colds, fever and feeling generally unwell are among the concerns people bring to a general consultation. It helps to explain what happened first, whether symptoms are improving or becoming worse, and what you have already done about them. Mention other health conditions and medicines you take, even if they do not seem directly related to the current problem.',
          'The consultation provides an opportunity to discuss an examination and the advice that follows it. If you are unsure why a medicine, test or review has been suggested, ask for an explanation. Understanding that advice matters as much as remembering the name of a condition.',
        ],
      },
      {
        title: 'Checkups and questions about your health',
        paragraphs: [
          'A checkup can also be a chance to raise a concern that you have been putting aside. You might have questions about a previous report, a change you have noticed, or whether another consultation would be appropriate. A short list of the main things you want to discuss can help you make the most of the visit.',
          'A general consultation does not automatically include a fixed set of investigations. Which tests, if any, are appropriate depends on your health history and the assessment. Laboratory testing and ultrasound are listed at New Life, but their availability and charges should be confirmed separately.',
        ],
      },
      {
        title: 'Following up on earlier care',
        paragraphs: [
          'If you have already seen a doctor for the same concern, bring the earlier prescription and relevant results. Explain what has changed since that visit and whether you were able to follow the advice. This gives the clinician a clearer picture than starting the account again from the most recent symptom.',
          'Before leaving, make sure you understand the next step: whether a review is needed, which results should be brought back, and whom to contact with questions about the arrangements. Our clinic team can help with visit enquiries and the services available at New Life.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: respiratory infections',
        href: 'https://www.nhs.uk/conditions/respiratory-tract-infection/',
      },
    ],
  },
  'child-family-health': {
    heading: 'Talking about your family’s health',
    introduction: [
      'When someone in the family is unwell, it is often the small changes that make you seek advice. A child may be sleeping differently, eating less or finding it difficult to explain where something hurts. An adult may have a concern that has been left unattended while caring for everyone else. A family-health consultation makes room to discuss the person behind those changes.',
      'New Life Health Care offers child and family healthcare consultations. When contacting the clinic, explain who the visit is for, their age and the main concern. This helps our team confirm an appropriate consultation. If more than one family member needs to be seen, ask about separate arrangements so each person’s concerns can be discussed properly.',
    ],
    topics: [
      {
        title: 'When your child is unwell',
        paragraphs: [
          'Coughs, colds and ear discomfort are familiar childhood concerns, but children do not always describe them clearly. Your observations are useful: when the illness began, whether there has been a fever, and what has changed in feeding, sleep, activity or behaviour. Tell the clinician about medicines already given and any other health conditions.',
          'Bring the child’s relevant health records and earlier prescriptions if you have them. You can also write down the questions you want answered, rather than trying to remember everything during the visit. The clinician can discuss the concern and explain whether a review or further assessment is needed.',
        ],
      },
      {
        title: 'Care for adults and other family members',
        paragraphs: [
          'Family healthcare also includes everyday concerns affecting adults in the household. Each person’s medical history, medicines and experience of symptoms may be different, even when family members appear to have a similar illness. Explain the concern for each individual rather than assuming the same advice will apply to everyone.',
          'If you are helping a relative arrange care, let our team know what consultation is being requested and what practical support they may need during the visit. Where possible, the person receiving care should have the opportunity to describe their own concerns and ask their own questions.',
        ],
      },
      {
        title: 'Keeping track of care over time',
        paragraphs: [
          'A simple record of prescriptions, test results and previous consultations can make later visits easier. Bring the information relevant to the current concern and explain what has happened since the last assessment. For a child, a parent or caregiver’s account of changes at home can add important context to that record.',
          'Before your visit ends, ask what the next step is and whether any follow-up has been advised. If a separate service is needed, our team can help you enquire about the options available at the clinic. Confirm the available clinician and visit arrangements before travelling.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: common childhood illnesses',
        href: 'https://www.nhs.uk/baby/health/colds-coughs-and-ear-infections-in-children/',
      },
    ],
  },
  gynecology: {
    heading: 'A conversation about women’s health',
    introduction: [
      'Changes in periods, discomfort or questions about menopause can be difficult to put into words. You may not be sure whether a change is important, or you may have lived with it for some time before deciding to seek advice. A gynecology consultation is an opportunity to explain what you are experiencing and how it affects your everyday life.',
      'At New Life Health Care, you can enquire about gynecology consultations and the related services listed at the clinic. Start with the concern that matters most to you. It is reasonable to ask what a consultation or examination involves and to request an explanation before any next step is discussed.',
    ],
    topics: [
      {
        title: 'Periods that have become difficult to manage',
        paragraphs: [
          'Painful, heavy or irregular periods can be reasons to speak with a doctor. Describe what is usual for you and what has changed, including the timing, discomfort and effect on work, sleep or other activities. If you keep a record of your cycle, bring it along; a description in your own words is useful too.',
          'Mention any current medicines, previous treatment and other relevant health history. Unusual bleeding, including bleeding between periods or after menopause, should be assessed by a doctor. An individual assessment is needed to understand the cause rather than treating every change in the same way.',
        ],
      },
      {
        title: 'Questions around menopause',
        paragraphs: [
          'Menopause and the time leading up to it can bring changes in periods and wellbeing. If changes are affecting you, explain which ones are most troublesome and how long they have been happening. The discussion should include your wider health history and any medicines or treatments you already use.',
          'You do not need to arrive with a preferred treatment in mind. A consultation gives you space to ask what the changes may mean and what further discussion or assessment is appropriate. Tell the doctor what you hope to understand, whether that is a particular symptom or how to make sense of several changes together.',
        ],
      },
      {
        title: 'Related consultations and screening enquiries',
        paragraphs: [
          'New Life also lists breast screening, laboratory testing and ultrasound. These services have different purposes and should not be assumed to be part of every gynecology visit. Explain your concern when enquiring so our team can help you confirm which consultation or service you are asking about.',
          'If you have earlier screening results, prescriptions or ultrasound reports relevant to your concern, bring them to the consultation. Ask about any recommendation you do not understand and confirm the arrangements for separate tests or a further review before leaving the clinic.',
        ],
      },
    ],
    sources: [
      { label: 'NHS: periods', href: 'https://www.nhs.uk/conditions/periods/' },
      {
        label: 'NHS: menopause',
        href: 'https://www.nhs.uk/conditions/menopause-and-perimenopause/',
      },
    ],
  },
  'diabetes-bp-gastric-care': {
    heading: 'Making sense of ongoing health concerns',
    introduction: [
      'Living with an ongoing health concern often means keeping track of reports, prescriptions and advice from more than one visit. It is easy for questions to build up between appointments: what a result means, whether a change matters, or what should be discussed at the next review. A consultation is a chance to bring those questions together.',
      'New Life Health Care lists consultations for diabetes, blood-pressure and gastric concerns. These are different areas of care, and your visit should focus on your own history and current needs. Bring relevant results and a list of the medicines you take so the clinician can understand the care you have received so far.',
    ],
    topics: [
      {
        title: 'Reviewing diabetes care',
        paragraphs: [
          'Diabetes care includes reviews to understand how the condition and its treatment are being managed. If you have recent blood-sugar results or a record of readings you were asked to take at home, bring them to the visit. Explain any changes in your routine and any questions or difficulties you have had with the advice you were given.',
          'The discussion should help you understand which reviews or investigations are relevant to you. It is also an opportunity to talk about practical concerns, such as remembering medicines or understanding a prescription. Decisions about treatment and follow-up need to reflect your individual circumstances.',
        ],
      },
      {
        title: 'Understanding blood-pressure concerns',
        paragraphs: [
          'If your concern is blood pressure, bring previous readings and prescriptions rather than relying only on memory. If you already record readings at home on a clinician’s advice, include those records and explain when they were taken. Tell the doctor about other health conditions and any medicines or supplements you use.',
          'You can ask the clinician to explain the assessment, the purpose of any recommended review and what information to bring next time. Discuss concerns about your prescription directly with them rather than changing or stopping treatment on your own.',
        ],
      },
      {
        title: 'Discussing recurring gastric discomfort',
        paragraphs: [
          'Indigestion can involve upper-abdominal discomfort, bloating, nausea or feeling full sooner than expected. Describe the pattern in your own words: when it happens, how long it lasts and whether it is associated with meals. Mention any medicines you have tried and whether they changed the symptoms.',
          'Similar symptoms can have different explanations, so a consultation is about understanding your history rather than assuming a cause. Bring previous results if you have already sought care. You can also ask about the separate gastroenterology consultation area if your main concern is digestive health.',
        ],
      },
    ],
    sources: [
      {
        label: 'NHS: diabetes care',
        href: 'https://www.nhs.uk/conditions/type-2-diabetes/treatment/',
      },
      {
        label: 'NICE: blood-pressure care',
        href: 'https://www.nice.org.uk/guidance/ng136/chapter/Recommendations',
      },
      {
        label: 'NIDDK: indigestion',
        href: 'https://www.niddk.nih.gov/health-information/digestive-diseases/indigestion-dyspepsia',
      },
    ],
  },
};
