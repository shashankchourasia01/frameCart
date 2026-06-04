import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOME_FAQ } from '../../constants/faq';
import { HiPlus, HiMinus } from '../icons';

export function HomeFaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-2xl font-bold text-brand-charcoal sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <ul className="mt-8 divide-y divide-neutral-200 border border-neutral-200 bg-white">
          {HOME_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold text-brand-charcoal hover:bg-neutral-50 sm:px-5"
                >
                  <span>{item.q}</span>
                  <span className="shrink-0 text-brand-charcoal">
                    {isOpen ? <HiMinus className="h-5 w-5" /> : <HiPlus className="h-5 w-5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-neutral-100 px-4 pb-4 text-sm leading-relaxed text-brand-charcoal-light sm:px-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
