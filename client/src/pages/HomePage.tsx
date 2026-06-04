import { HeroBanner } from '../components/home/HeroBanner';
import { TrustBar } from '../components/home/TrustBar';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { CategoryFramesSection } from '../components/home/CategoryFramesSection';
import { BestsellerGrid } from '../components/home/BestsellerGrid';
import { FeaturedOffer } from '../components/home/FeaturedOffer';
import { Testimonials } from '../components/home/Testimonials';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <CategoryFramesSection />
      <BestsellerGrid />
      <FeaturedOffer />
      <Testimonials />
    </>
  );
}
