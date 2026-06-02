import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOffers } from '../../hooks/useOffers';

const DISMISS_KEY = 'framecraft-offer-dismissed';

export function OfferBanner() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(DISMISS_KEY) === 'true'
  );
  const { data: offers } = useOffers();
  const active = offers?.filter((o) => o.is_featured) ?? [];

  if (dismissed || active.length === 0) return null;

  const text =
    active.map((o) => `${o.title}${o.coupon_code ? ` — Use ${o.coupon_code}` : ''}`).join('   •   ') ||
    'Special offers available — Shop now!';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative overflow-hidden bg-brand-maroon text-brand-gold-light"
      >
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex-1 overflow-hidden md:text-center">
            <p className="animate-marquee whitespace-nowrap md:animate-none md:whitespace-normal">
              <span className="md:hidden inline-block min-w-[200%] animate-marquee">{text}   •   {text}</span>
              <span className="hidden md:inline">{text}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, 'true');
              setDismissed(true);
            }}
            className="ml-4 shrink-0 p-1 text-brand-gold hover:text-white"
            aria-label="Dismiss offer banner"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
