import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../product/ProductCard';
import { ProductCardSkeleton } from '../product/ProductCardSkeleton';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { HiArrowRight } from '../icons';

const BESTSELLER_LIMIT = 8;

export function BestsellerGrid() {
  const { data: products, isLoading } = useProducts({ bestseller: true, limit: BESTSELLER_LIMIT });

  return (
    <section className="section-padding bg-brand-ivory-dark/40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Our Bestsellers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-subtitle"
            >
              Most loved by families across India
            </motion.p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 text-sm font-semibold text-brand-maroon transition hover:text-brand-maroon-dark"
          >
            <span className="inline-flex items-center gap-1">
              View All
              <HiArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-4 lg:gap-4"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="w-[min(72vw,13.5rem)] shrink-0 snap-start sm:w-auto"
                >
                  <ProductCardSkeleton />
                </motion.div>
              ))
            : (products ?? []).map((p) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  className="w-[min(72vw,13.5rem)] shrink-0 snap-start sm:w-auto"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}
