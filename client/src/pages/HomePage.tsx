import { HeroBanner } from '../components/home/HeroBanner';
import { HomeShopBanner } from '../components/home/HomeShopBanner';
import { CategoryFramesSection } from '../components/home/CategoryFramesSection';
import { BestsellerGrid } from '../components/home/BestsellerGrid';
import { FeaturedOffer } from '../components/home/FeaturedOffer';
import { Testimonials } from '../components/home/Testimonials';
import { HomeFaqSection } from '../components/home/HomeFaqSection';
import { HomeTrustSection } from '../components/home/HomeTrustSection';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryFramesSection />
      <BestsellerGrid />
      <HomeShopBanner />
      <FeaturedOffer />
      <Testimonials />
      <HomeFaqSection />
      <HomeTrustSection />
    </>
  );
}
