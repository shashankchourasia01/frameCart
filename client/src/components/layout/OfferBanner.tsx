import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRUST_SIGNALS } from '../../constants';
import { TrustIcon } from '../icons';

const FEATURE_DISPLAY_MS = 3000;
const SLIDE_DURATION_S = 0.5;

export function OfferBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TRUST_SIGNALS.length);
    }, FEATURE_DISPLAY_MS);
    return () => window.clearInterval(id);
  }, []);

  const feature = TRUST_SIGNALS[index];

  return (
    <div
      className="relative overflow-hidden border-b border-brand-gold/20 bg-brand-maroon text-white"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex h-10 w-full items-center justify-center px-6 sm:h-11 sm:px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: SLIDE_DURATION_S, ease: 'easeInOut' }}
            className="flex w-full max-w-none items-center justify-center gap-3"
          >
            <TrustIcon
              name={feature.icon}
              size="md"
              className="shrink-0 text-brand-gold-light"
            />
            <span className="text-sm font-medium tracking-wide sm:text-base">
              {feature.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
