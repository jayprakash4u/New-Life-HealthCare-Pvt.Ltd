'use client';

import { Container } from '@/components/ui/container';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ClinicalImageGallery } from './clinical-image-gallery';
import { treatmentClinicalImages } from '@/config/treatment-clinical-images';

const topics: Array<{
  id: string;
  label: string;
  title: string;
  items: Array<{ title: string; text: string; detail?: string }>;
}> = [
  {
    id: 'concerns',
    label: 'Common concerns',
    title: 'Digestive concerns you can discuss',
    items: [
      {
        title: 'Acid reflux',
        text: 'Stomach contents can flow back into the food pipe, causing heartburn or a sour taste. Repeated or persistent symptoms deserve a medical review.',
        detail:
          'When describing this concern, explain how often it happens and whether it is related to meals or lying down. Mention anything you have already tried and whether it helped. The doctor can consider that history alongside your other symptoms rather than assuming that every episode has the same explanation.',
      },
      {
        title: 'Indigestion',
        text: 'Upper-abdominal discomfort, feeling full early, bloating or nausea may occur together. Indigestion and heartburn are different concerns, even when they happen at the same time.',
        detail:
          'People use the word “gastric” to describe quite different experiences. Try to explain where the discomfort is, what it feels like and how it affects eating or daily activities. You do not need medical terms; a description of what happens to you is more useful than choosing a condition name in advance.',
      },
      {
        title: 'Changes in bowel habits',
        text: 'Constipation, diarrhoea or recurring abdominal discomfort are reasons to discuss your symptoms with a doctor, especially when they persist.',
        detail:
          'Describe what has changed from your usual pattern and when you first noticed it. If you have already had an assessment, bring the relevant results and prescriptions. This can help the clinician understand whether the current problem is new, recurring or part of a concern that has already been investigated.',
      },
    ],
  },
  {
    id: 'causes',
    label: 'Causes & factors',
    title: 'Understanding what may be contributing',
    items: [
      {
        title: 'Different symptoms, different causes',
        text: 'Abdominal discomfort may relate to indigestion, constipation or a stomach infection. Symptoms alone do not establish the cause.',
        detail:
          'Two people may describe their symptoms in similar words and still need different assessments. A consultation brings together the history of the problem, other health conditions and examination findings. It also gives you a chance to ask why a particular next step is being suggested.',
      },
      {
        title: 'Medicines and health history',
        text: 'Some medicines and digestive conditions can contribute to indigestion. Share your current medicines and any previous diagnoses with your doctor.',
        detail:
          'Include prescribed medicines, products bought without a prescription and supplements. If you are unsure of a name, bring the packaging or an earlier prescription. Discuss concerns about a medicine with your clinician rather than stopping prescribed treatment on your own.',
      },
      {
        title: 'Your symptom pattern',
        text: 'Note when symptoms began, how often they occur and whether they follow meals. These details help a clinician understand your concern.',
        detail:
          'A short written account can be easier to refer to than trying to remember every episode during the visit. Include what has changed recently, whether the concern interrupts sleep or meals, and which question you most want the consultation to answer.',
      },
    ],
  },
  {
    id: 'symptoms',
    label: 'Symptoms',
    title: 'When to seek medical advice',
    items: [
      {
        title: 'Symptoms that keep returning',
        text: 'Arrange a medical review for stomach pain, bloating or indigestion that does not settle or keeps coming back.',
        detail:
          'Explain whether the problem is happening more often or affecting your usual routine. Bring information about earlier care, including any tests you have already had. This helps the discussion move beyond describing the latest episode alone.',
      },
      {
        title: 'Difficulty swallowing or repeated vomiting',
        text: 'These symptoms need prompt medical assessment, particularly alongside ongoing digestive discomfort.',
        detail:
          'When contacting a healthcare professional, describe the symptoms clearly and say when they started. A routine booking form is intended for visit requests and should not delay getting medical attention for a concern that needs prompt assessment.',
      },
      {
        title: 'Severe or sudden symptoms',
        text: 'Seek emergency care for sudden severe abdominal pain, vomiting blood, or black, sticky stools. Do not wait for an online appointment response.',
      },
    ],
  },
  {
    id: 'consultation',
    label: 'Consultation & care',
    title: 'A clear starting point for your care',
    items: [
      {
        title: 'Talk through your concerns',
        text: 'Describe your symptoms, their duration and any previous care. Bring a list of medicines and relevant medical reports to your consultation.',
        detail:
          'Start with the concern that is troubling you most. You may want to know what could be contributing, why symptoms keep returning or what a previous result means. Writing down those questions beforehand can help you cover them during the appointment.',
      },
      {
        title: 'Discuss the next step',
        text: 'A clinician can assess your symptoms and discuss appropriate next steps. Further assessment or referral depends on your individual needs.',
        detail:
          'Ask what any recommendation is intended to clarify and what information you should bring to a review. Before leaving, make sure you understand whether a follow-up has been advised and how any further assessment would be arranged.',
      },
      {
        title: 'Plan your visit to New Life',
        text: 'Contact our team to confirm consultation availability and fees. Laboratory testing and ultrasound enquiries can be discussed separately with the clinic.',
      },
    ],
  },
];

export function DigestiveHealthGuide() {
  return (
    <section
      id="digestive-health-guide"
      aria-labelledby="digestive-guide-heading"
      className="scroll-mt-40 border-t border-line bg-canvas py-12 sm:py-16 lg:scroll-mt-48"
    >
      <Container>
        <div className="max-w-5xl">
          <h2
            id="digestive-guide-heading"
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink"
          >
            Understanding your digestive health
          </h2>
          <div aria-hidden="true" className="mt-4 h-px w-12 bg-accent" />
          <div className="mt-6 space-y-4 text-[15px] leading-[1.9] text-muted sm:text-base">
            <p>
              Digestive discomfort can change the way you eat, work and go about
              the day. You may have a clear symptom, such as heartburn, or a
              less specific feeling that meals are no longer comfortable. When a
              concern keeps returning, a consultation gives you time to explain
              the pattern and discuss what should happen next.
            </p>
            <p>
              Gastroenterology concerns the digestive system, but you do not
              need to know which condition to ask about before seeking advice.
              At New Life Health Care, you can enquire about a digestive-health
              consultation and bring previous reports or prescriptions relevant
              to your symptoms. The information below explains common concerns
              and the kinds of questions that can help you prepare for that
              conversation.
            </p>
          </div>
          <ClinicalImageGallery
            items={treatmentClinicalImages.gastroenterology}
            id="gastroenterology-clinical-images"
          />
          <Tabs
            defaultValue="concerns"
            activationMode="manual"
            className="mt-8 min-w-0"
          >
            <TabsList
              aria-label="Digestive health information"
              className="justify-start gap-x-5 gap-y-0 sm:gap-x-8"
            >
              {topics.map((topic) => (
                <TabsTrigger
                  key={topic.id}
                  value={topic.id}
                  className="rounded-none px-0 py-4 text-sm data-[state=active]:border-action"
                >
                  {topic.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {topics.map((topic) => (
              <TabsContent
                key={topic.id}
                value={topic.id}
                className="pt-7 pb-0"
              >
                <h3 className="sr-only">{topic.title}</h3>
                <ul className="space-y-8">
                  {topic.items.map((item) => (
                    <li key={item.title} className="min-w-0">
                      <h4 className="text-lg leading-snug font-semibold text-ink sm:text-xl">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-[15px] leading-[1.9] text-muted sm:text-base">
                        {item.text}
                      </p>
                      {item.detail && (
                        <p className="mt-3 text-[15px] leading-[1.9] text-muted sm:text-base">
                          {item.detail}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-7 border-t border-line pt-4 text-[11px] leading-5 text-muted">
            Health information:{' '}
            <a
              href="https://www.niddk.nih.gov/health-information/digestive-diseases/indigestion-dyspepsia"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              NIDDK
            </a>{' '}
            ·{' '}
            <a
              href="https://www.nhs.uk/symptoms/stomach-ache/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              NHS
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
