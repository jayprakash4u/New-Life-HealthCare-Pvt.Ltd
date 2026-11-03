import { AddedCarePage } from '@/components/care/added-care-page';
import { readPageOverride } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findServicePage, servicePages } from '@/config/service-pages';
import { ServiceOverview } from '@/components/services/service-overview';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findServicePage(slug);
  if (!service) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
    const added = await readPageOverride('service-' + slug);
    if (!added) notFound();
    return { title: added.title };
  }
  return {
    title: service.title,
    description: `${service.description} Enquire with New Life Health Care in Imadol, Lalitpur.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findServicePage(slug);
  if (!service) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
    const added = await readPageOverride('service-' + slug);
    if (!added) notFound();
    return <AddedCarePage copy={added} kind="service" />;
  }
  const copy = await readPageOverride(`service-${service.id}`);
  return (
    <ServiceOverview
      service={
        copy
          ? {
              ...service,
              ...copy.serviceDetails,
              imageAlt: copy.imageAlt ?? service.imageAlt,
              image: copy.image ?? service.image,
              headingLead: '',
              headingAccent: copy.title,
              overview: copy.body.split(/\n\s*\n/).filter(Boolean),
            }
          : service
      }
    />
  );
}
