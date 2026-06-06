import { CouponChip } from '../shared/CouponChip';
import { getOfferBanner } from '../../constants/images';
import {
  formatOfferDate,
  getOfferDiscountLabel,
  getOfferScopeLabel,
  getOfferTypeLabel,
} from '../../lib/offerDisplay';
import { formatPrice, cn } from '../../lib/utils';
import type { Offer } from '../../types';

interface OfferCardProps {
  offer: Offer;
  categoryName?: string;
  variant?: 'default' | 'featured';
}

export function OfferCard({ offer, categoryName, variant = 'default' }: OfferCardProps) {
  const featured = variant === 'featured' || offer.is_featured;
  const banner = getOfferBanner(offer.banner_image_url);
  const isPercent = offer.discount_type === 'percentage';

  return (
    <article
      className={cn(
        'overflow-hidden rounded-card shadow-card transition hover:shadow-card-hover',
        featured ? 'ring-2 ring-brand-gold/40' : 'border border-neutral-100'
      )}
    >
      {banner ? (
        <div className="relative h-36 sm:h-40">
          <img
            src={banner}
            alt=""
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <OfferTypePill offer={offer} />
            {featured ? (
              <span className="rounded-full bg-brand-gold/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-maroon">
                Featured
              </span>
            ) : null}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">
              {getOfferDiscountLabel(offer)}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'relative px-6 py-8',
            featured
              ? 'bg-gradient-to-br from-brand-maroon via-brand-maroon to-brand-maroon-dark'
              : 'bg-gradient-to-br from-brand-ivory to-brand-ivory-dark'
          )}
        >
          <div className="flex flex-wrap gap-2">
            <OfferTypePill offer={offer} inverted={featured} />
            {featured ? (
              <span className="rounded-full bg-brand-gold/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold-light">
                Featured
              </span>
            ) : null}
          </div>
          <p
            className={cn(
              'mt-4 font-display text-3xl font-bold',
              featured ? 'text-white' : 'text-brand-maroon'
            )}
          >
            {getOfferDiscountLabel(offer)}
          </p>
        </div>
      )}

      <div className={cn('p-6', featured && !banner ? 'bg-white' : 'bg-white')}>
        <h2 className="font-heading text-xl font-semibold text-brand-charcoal">{offer.title}</h2>
        {offer.description ? (
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light">{offer.description}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <MetaPill>{getOfferScopeLabel(offer, categoryName)}</MetaPill>
          {offer.min_order_value > 0 ? (
            <MetaPill>Min {formatPrice(Number(offer.min_order_value))}</MetaPill>
          ) : null}
          <MetaPill>Valid till {formatOfferDate(offer.valid_till)}</MetaPill>
          {isPercent ? null : (
            <MetaPill className="bg-orange-50 text-orange-700">{getOfferTypeLabel(offer)}</MetaPill>
          )}
        </div>

        {offer.coupon_code ? (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-charcoal-light">
              Use code at checkout
            </p>
            <CouponChip code={offer.coupon_code} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function OfferTypePill({ offer, inverted }: { offer: Offer; inverted?: boolean }) {
  const isPercent = offer.discount_type === 'percentage';
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
        inverted
          ? 'bg-white/20 text-white'
          : isPercent
            ? 'bg-violet-100 text-violet-700'
            : 'bg-orange-100 text-orange-700'
      )}
    >
      {isPercent ? '% Off' : 'Flat ₹ Off'}
    </span>
  );
}

function MetaPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'rounded-full bg-neutral-100 px-2.5 py-1 font-medium text-brand-charcoal-light',
        className
      )}
    >
      {children}
    </span>
  );
}
