import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffers } from '../../hooks/useOffers';

const DISMISS_KEY = 'framecraft-offer-dismissed';

export function OfferBanner() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === 'true'
  );
  const { data: offers } = useOffers();
  const featured = offers?.find((o) => o.is_featured && o.is_active);

  if (dismissed || !featured) return null;

  const codeLabel = featured.coupon_code ? `Code: ${featured.coupon_code}` : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative overflow-hidden border-b border-brand-gold/20 bg-brand-maroon text-white"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          {/* Mobile: marquee */}
          <div className="min-w-0 flex-1 overflow-hidden md:hidden">
            <p className="inline-block min-w-[200%] animate-marquee whitespace-nowrap text-sm">
              {featured.title}
              {codeLabel ? ` — ${codeLabel}` : ''} — {featured.description}
              {'   •   '}
              {featured.title}
              {codeLabel ? ` — ${codeLabel}` : ''}
            </p>
          </div>

          {/* Desktop: balanced layout */}
          <div className="hidden min-w-0 flex-1 items-center gap-4 md:flex">
            <span className="shrink-0 rounded-full bg-brand-gold/25 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold-light">
              Offer
            </span>
            <p className="truncate text-sm font-medium">{featured.title}</p>
            <span className="hidden text-white/50 lg:inline">|</span>
            <p className="hidden max-w-md truncate text-sm text-white/80 lg:block">
              {featured.description}
            </p>
            {featured.coupon_code && (
              <span className="shrink-0 rounded-md border border-brand-gold/40 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-brand-gold-light">
                {featured.coupon_code}
              </span>
            )}
            <Link
              to="/offers"
              className="shrink-0 text-xs font-semibold text-brand-gold-light underline-offset-2 hover:underline"
            >
              View details
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, 'true');
              setDismissed(true);
            }}
            className="shrink-0 rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Dismiss offer banner"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
