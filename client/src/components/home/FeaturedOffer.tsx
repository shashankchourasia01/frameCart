import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOffers } from '../../hooks/useOffers';
import { CouponChip } from '../shared/CouponChip';
import { formatPrice } from '../../lib/utils';
import { IMAGES } from '../../constants/images';

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

  const bgImage = featured.banner_image_url ?? IMAGES.offerBg;

  return (
    <section className="section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-card shadow-card-hover"
      >
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon/95 via-brand-maroon/85 to-brand-maroon/70" />

        <div className="relative p-8 sm:p-12 lg:p-14">
          <span className="inline-block rounded-full bg-brand-gold/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gold-light">
            Limited Time
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-lg text-white/80">{featured.description}</p>

          {featured.coupon_code && (
            <div className="mt-6">
              <CouponChip code={featured.coupon_code} />
            </div>
          )}

          <p className="mt-4 text-sm text-white/70">
            Save up to{' '}
            <span className="font-semibold text-brand-gold">
              {featured.discount_type === 'percentage'
                ? `${featured.discount_value}%`
                : formatPrice(Number(featured.discount_value))}
            </span>
          </p>

          <div className="mt-8 flex gap-6">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.mins, label: 'Mins' },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-card bg-white/10 backdrop-blur-sm"
              >
                <span className="font-display text-2xl font-bold text-white">
                  {String(val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <Link to="/offers" className="btn-primary mt-8 bg-white text-brand-maroon hover:bg-brand-gold-light">
            View All Offers
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
