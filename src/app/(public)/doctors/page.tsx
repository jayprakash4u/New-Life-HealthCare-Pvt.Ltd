import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { DoctorDirectory } from '@/components/doctors/doctor-directory';
import { getDoctors } from '@/lib/content-library';

export const metadata: Metadata = {
  title: 'Find a doctor',
  description:
    'Explore consultation areas and plan your visit to New Life Health Care in Imadol, Lalitpur.',
  robots: { index: false, follow: false },
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();
  const copy = await getPageCopy('doctors');
  return (
    <>
      <h1
        className={
          copy.title === 'Find a doctor'
            ? 'sr-only'
            : 'mx-auto max-w-6xl px-5 pt-6 text-3xl font-medium'
        }
      >
        {copy.title}
      </h1>
      {copy.body && (
        <p className="mx-auto max-w-6xl px-5 pt-4 text-muted whitespace-pre-line">
          {copy.body}
        </p>
      )}
      <DoctorDirectory doctors={doctors} />
    </>
  );
}
