import { motion } from 'framer-motion';
import { useOffers } from '../hooks/useOffers';
import { useCategories } from '../hooks/useCategories';
import { OfferCard } from '../components/offers/OfferCard';
import { pageTransition } from '../animations/variants';
import { IMAGES } from '../constants/images';

export function OffersPage() {
  const { data: offers, isLoading } = useOffers();
  const { data: categories } = useCategories();

  const categoryName = (slug: string) => categories?.find((c) => c.slug === slug)?.name;

  const featured = offers?.filter((o) => o.is_featured) ?? [];
  const regular = offers?.filter((o) => !o.is_featured) ?? [];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="pb-24"
    >
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img src={IMAGES.offerBg} alt="" aria-hidden className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-brand-maroon/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Deals & Offers</h1>
          <p className="mt-2 max-w-md text-sm text-white/85">
            Active coupons and seasonal discounts on custom photo frames
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {isLoading && <p className="text-brand-charcoal-light">Loading offers...</p>}

        {!isLoading && (!offers || offers.length === 0) && (
          <div className="rounded-card border border-dashed border-neutral-200 bg-white p-10 text-center">
            <p className="font-medium text-brand-charcoal">No active offers right now</p>
            <p className="mt-1 text-sm text-brand-charcoal-light">
              Check back soon — new deals are added from the admin panel.
            </p>
          </div>
        )}

        {featured.length > 0 && (
          <section className="space-y-5">
            <h2 className="font-heading text-lg font-semibold text-brand-charcoal">Featured deals</h2>
            {featured.map((o) => (
              <OfferCard
                key={o.id}
                offer={o}
                variant="featured"
                categoryName={
                  o.applicable_to !== 'all' ? categoryName(o.applicable_to) : undefined
                }
              />
            ))}
          </section>
        )}

        {regular.length > 0 && (
          <section className={featured.length > 0 ? 'mt-12 space-y-5' : 'space-y-5'}>
            {featured.length > 0 ? (
              <h2 className="font-heading text-lg font-semibold text-brand-charcoal">More offers</h2>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              {regular.map((o) => (
                <OfferCard
                  key={o.id}
                  offer={o}
                  categoryName={
                    o.applicable_to !== 'all' ? categoryName(o.applicable_to) : undefined
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
