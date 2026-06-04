import { motion } from 'framer-motion';
import { CategoryIconGrid } from '../components/shop/CategoryIconGrid';

export function ShopPage() {
  return (
    <div className="min-h-screen bg-white pb-8">
      <section className="border-b border-brand-ivory-dark/80 bg-gradient-to-b from-brand-ivory/80 to-white px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-maroon"
          >
            FrameCraft Shop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-charcoal sm:text-4xl"
          >
            Explore Our{' '}
            <span className="bg-gradient-to-r from-brand-maroon to-brand-maroon-dark bg-clip-text text-transparent">
              Categories
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-charcoal-light sm:text-base"
          >
            Choose an occasion — each category has premium frame designs ready to customize and order on WhatsApp.
          </motion.p>
        </div>
      </section>

      <section className="section-padding pt-10 sm:pt-12">
        <div className="mx-auto max-w-2xl">
          <CategoryIconGrid columns="4" />
          <p className="mt-10 text-center text-xs text-brand-charcoal-light">
            Tap a category to view all frames in that collection
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl border-t border-neutral-100 px-4 py-8 text-center sm:px-6">
        <p className="text-xs text-brand-charcoal-light">
          Changes from admin appear on the shop within seconds when Supabase is connected.
        </p>
      </section>
    </div>
  );
}
