import { healthArticles, type JournalItem } from '@/config/journal';
import { Container } from '@/components/ui/container';
import { ContentRail } from './content-rail';

export function HealthJournal({
  items = healthArticles,
}: {
  items?: readonly JournalItem[];
}) {
  return (
    <div
      id="health-journal"
      className="scroll-mt-36 bg-canvas py-12 sm:py-14 lg:scroll-mt-48 lg:py-16"
    >
      <Container className="grid gap-10 lg:gap-14">
        <ContentRail
          id="health-updates"
          title="Explore our blogs"
          viewAllHref="/blogs"
          items={items}
        />
      </Container>
    </div>
  );
}
