import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRUST_SIGNALS } from '../../constants';
import { TrustIcon } from '../icons';

const FEATURE_INTERVAL_MS = 2000;

export function OfferBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TRUST_SIGNALS.length);
    }, FEATURE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const feature = TRUST_SIGNALS[index];

  return (
    <div
      className="relative overflow-hidden border-b border-brand-gold/20 bg-brand-maroon text-white"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4 sm:h-11 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={feature.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex items-center justify-center gap-2.5"
          >
            <TrustIcon name={feature.icon} size="sm" className="shrink-0 text-brand-gold-light" />
            <span className="text-sm font-medium">{feature.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
