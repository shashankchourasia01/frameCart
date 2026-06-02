import { motion } from 'framer-motion';
import { TRUST_SIGNALS } from '../../constants';
import { fadeUp, staggerContainer } from '../../animations/variants';

export function TrustBar() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="border-y border-brand-ivory-dark bg-white py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {TRUST_SIGNALS.map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="flex items-center gap-2.5 rounded-full bg-brand-ivory px-5 py-2.5"
          >
            <span className="text-lg" aria-hidden>
              {item.icon}
            </span>
            <span className="text-xs font-medium text-brand-charcoal sm:text-sm">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
