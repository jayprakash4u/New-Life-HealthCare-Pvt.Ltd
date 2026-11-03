import { homepageSections } from '@/config/homepage-sections';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import { getPageCopy, getPublishedArticles } from '@/lib/admin-content';
import { HeroSection } from '@/components/home/hero-section';
import { HealthJournal } from '@/components/home/health-journal';
import { ClinicIntroduction } from '@/components/home/clinic-introduction';
import { LifeAtNewLife } from '@/components/home/life-at-new-life';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { HomeFaq } from '@/components/home/home-faq';

export default async function Home() {
  const [copy, articles] = await Promise.all([
    getPageCopy('home'),
    getPublishedArticles(),
  ]);
  const sections = await getHomepageVisibility(
    'section',
    homepageSections.map(({ id }) => id),
  );
  const visibility = await getHomepageVisibility(
    'blog',
    articles.map(({ id }) => id),
  );
  const featuredArticles = articles.filter(
    ({ id }) => visibility.get(id) !== false,
  );
  return (
    <>
      <HeroSection copy={copy} />
      {sections.get('introduction') !== false && <ClinicIntroduction />}
      {sections.get('videos') !== false && <LifeAtNewLife />}
      {sections.get('why-choose-us') !== false && <WhyChooseUs />}
      {sections.get('blog') !== false && featuredArticles.length > 0 && (
        <HealthJournal items={featuredArticles} />
      )}
      {sections.get('faq') !== false && <HomeFaq />}
    </>
  );
}
