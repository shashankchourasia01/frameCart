import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { ProductCardCompact } from './ProductCardCompact';
import { ProductCardCompactSkeleton } from './ProductCardCompactSkeleton';

interface ProductGridCompactProps {
  products?: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
}

/** Responsive compact grid — 2 cols mobile, 4 cols desktop */
const GRID_CLASS =
  'grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4';

/** 2-column compact product grid (Printo-style) */
export function ProductGridCompact({
  products = [],
  isLoading,
  skeletonCount = 4,
  className = '',
}: ProductGridCompactProps) {
  if (isLoading) {
    return (
      <div className={`${GRID_CLASS} ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardCompactSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className={`${GRID_CLASS} ${className}`}
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={fadeUp} className="min-w-0">
          <ProductCardCompact product={p} />
        </motion.div>
      ))}
    </motion.div>
  );
}
