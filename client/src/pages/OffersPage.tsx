import { motion } from 'framer-motion';
import { useOffers } from '../hooks/useOffers';
import { CouponChip } from '../components/shared/CouponChip';
import { formatPrice } from '../lib/utils';
import { pageTransition } from '../animations/variants';
import { IMAGES } from '../constants/images';

export function OffersPage() {
  const { data: offers, isLoading } = useOffers();
  const now = Date.now();
  const active = offers?.filter((o) => new Date(o.valid_till).getTime() > now) ?? [];
  const expired = offers?.filter((o) => new Date(o.valid_till).getTime() <= now) ?? [];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="pb-24"
    >
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img
          src={IMAGES.offerBg}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-maroon/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Deals & Offers</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {isLoading && <p className="text-brand-charcoal-light">Loading offers...</p>}

        <div className="space-y-5">
          {active.map((o) => (
            <div
              key={o.id}
              className={`overflow-hidden rounded-card shadow-card ${
                o.is_featured ? 'ring-2 ring-brand-gold/40' : ''
              }`}
            >
              {o.banner_image_url && (
                <div className="relative h-36">
                  <img src={o.banner_image_url} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <div className={`p-6 ${o.is_featured ? 'bg-gold-gradient' : 'bg-white'}`}>
                {o.is_featured && (
                  <span className="mb-2 inline-block rounded-full bg-brand-maroon/10 px-3 py-0.5 text-xs font-semibold text-brand-maroon">
                    Featured
                  </span>
                )}
                <h2 className="font-heading text-xl font-semibold">{o.title}</h2>
                <p className="mt-2 text-sm text-brand-charcoal-light">{o.description}</p>
                {o.coupon_code && (
                  <div className="mt-4">
                    <CouponChip code={o.coupon_code} />
                  </div>
                )}
                <p className="mt-3 text-sm font-medium text-brand-maroon">
                  {o.discount_type === 'percentage'
                    ? `${o.discount_value}% off`
                    : `${formatPrice(Number(o.discount_value))} off`}
                  {o.min_order_value > 0 && (
                    <span className="font-normal text-brand-charcoal-light">
                      {' '}
                      · Min order {formatPrice(Number(o.min_order_value))}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {expired.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-lg text-brand-charcoal-light">Expired</h2>
            <div className="mt-4 space-y-3 opacity-60">
              {expired.map((o) => (
                <div key={o.id} className="rounded-card bg-brand-ivory-dark p-4">
                  <span className="rounded-full bg-brand-charcoal-light px-2 py-0.5 text-xs text-white">
                    Expired
                  </span>
                  <p className="mt-2 font-medium">{o.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
}
