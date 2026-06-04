import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CategoryIconGrid } from '../shop/CategoryIconGrid';
import { HiArrowRight } from '../icons';

/** Compact category icons on home — full catalog on /shop */
export function HomeCategoryTeaser() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Shop by Occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="section-subtitle mx-auto"
          >
            Quick picks — open the shop for every category
          </motion.p>
        </div>

        <div className="mt-8">
          <CategoryIconGrid limit={8} />
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-brand-maroon px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-maroon-dark hover:shadow-md active:scale-[0.98]"
          >
            View all categories
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
