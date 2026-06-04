import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { ProductGridCompact } from '../product/ProductGridCompact';
import { HiArrowRight } from '../icons';

const BESTSELLER_LIMIT = 6;

export function BestsellerGrid() {
  const { data: products, isLoading } = useProducts({ bestseller: true, limit: BESTSELLER_LIMIT });

  return (
    <section className="section-padding bg-neutral-50">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-brand-charcoal sm:text-3xl"
          >
            Our Bestsellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-2 text-sm text-brand-charcoal-light"
          >
            Most loved frames across India
          </motion.p>
        </div>

        <div className="mt-8">
          <ProductGridCompact
            products={products}
            isLoading={isLoading}
            skeletonCount={6}
          />
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-maroon hover:underline"
          >
            View all categories
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
