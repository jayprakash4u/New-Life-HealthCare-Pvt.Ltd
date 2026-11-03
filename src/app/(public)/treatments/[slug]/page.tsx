import { AddedCarePage } from '@/components/care/added-care-page';
import { readPageOverride } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findTreatmentPage, treatmentPages } from '@/config/treatment-pages';
import { TreatmentOverview } from '@/components/treatments/treatment-overview';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatmentPages.map((treatment) => ({ slug: treatment.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = findTreatmentPage(slug);
  if (!treatment) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
    const added = await readPageOverride('treatment-' + slug);
    if (!added) notFound();
    return { title: added.title };
  }
  return {
    title: treatment.title,
    description: `${treatment.description} Visit New Life Health Care in Imadol, Lalitpur.`,
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const treatment = findTreatmentPage(slug);
  if (!treatment) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
    const added = await readPageOverride('treatment-' + slug);
    if (!added) notFound();
    return <AddedCarePage copy={added} kind="treatment" />;
  }
  const copy = await readPageOverride(`treatment-${treatment.id}`);
  return (
    <TreatmentOverview
      treatment={
        copy
          ? {
              ...treatment,
              imageAlt: copy.imageAlt ?? treatment.imageAlt,
              image: copy.image ?? treatment.image,
              headingLead: '',
              headingAccent: copy.title,
              overview: copy.body.split(/\n\s*\n/).filter(Boolean),
            }
          : treatment
      }
    />
  );
}
