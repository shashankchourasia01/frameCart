import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOffers } from '../../hooks/useOffers';
import { CouponChip } from '../shared/CouponChip';
import { formatPrice } from '../../lib/utils';
import { getOfferBanner } from '../../constants/images';
import { LazyImage } from '../shared/LazyImage';

function useCountdown(end: string) {
  const diff = Math.max(0, new Date(end).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return { days, hours, mins };
}

export function FeaturedOffer() {
  const { data: offers } = useOffers();
  const featured = offers?.find((o) => o.is_featured && o.is_active);
  const countdown = useCountdown(featured?.valid_till ?? new Date().toISOString());

  if (!featured) return null;

  const sideImage = getOfferBanner(featured.banner_image_url);
  const discountLabel =
    featured.discount_type === 'percentage'
      ? `${featured.discount_value}% OFF`
      : `${formatPrice(Number(featured.discount_value))} OFF`;

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-brand-maroon/10 bg-white shadow-card-hover"
      >
        <div className="grid lg:grid-cols-2">
          {/* Content — full width mobile, left on desktop */}
          <div className="relative bg-gradient-to-br from-brand-maroon via-brand-maroon to-brand-maroon-dark p-8 sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-brand-gold/10 blur-3xl" />
            <span className="relative inline-block rounded-full bg-brand-gold/25 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-light">
              Limited Time
            </span>
            <h2 className="relative mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
              {featured.title}
            </h2>
            <p className="relative mt-3 max-w-md text-base leading-relaxed text-white/85">
              {featured.description}
            </p>

            <div className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
              <span className="text-2xl font-bold text-brand-gold">{discountLabel}</span>
              <span className="text-sm text-white/70">on your order</span>
            </div>

            {featured.coupon_code && (
              <div className="relative mt-5">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/60">
                  Use code at checkout
                </p>
                <CouponChip code={featured.coupon_code} />
              </div>
            )}

            <div className="relative mt-8 flex flex-wrap gap-3 sm:gap-4">
              {[
                { val: countdown.days, label: 'Days' },
                { val: countdown.hours, label: 'Hours' },
                { val: countdown.mins, label: 'Mins' },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="flex min-w-[4.5rem] flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
                    {String(val).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/offers"
              className="relative mt-8 inline-flex items-center justify-center rounded-btn bg-white px-8 py-3 text-sm font-semibold text-brand-maroon shadow-md transition hover:bg-brand-gold-light"
            >
              View All Offers
            </Link>
          </div>

          {/* Image panel — hidden on small screens, visible desktop */}
          <div className="relative hidden min-h-[320px] lg:block">
            <LazyImage
              src={sideImage}
              alt=""
              aspect="auto"
              className="absolute inset-0 h-full min-h-[320px] w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-maroon/20" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                Premium frames
              </p>
              <p className="mt-1 font-heading text-lg font-semibold text-brand-charcoal">
                Handcrafted since 1998
              </p>
              <p className="mt-1 text-sm text-brand-charcoal-light">
                Free preview before you order via WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Mobile image strip */}
        <div className="relative h-40 lg:hidden">
          <LazyImage src={sideImage} alt="" aspect="auto" className="h-40 w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
