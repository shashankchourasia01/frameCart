import type { Product } from '../../types';
import { ProductCardCompact } from './ProductCardCompact';
import { ProductCardCompactSkeleton } from './ProductCardCompactSkeleton';

/** Matches ProductGridCompact column widths — 2 / 3 / 4 visible per viewport */
const CARD_SLOT =
  'w-[calc(50%-0.375rem)] shrink-0 snap-start md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.75rem)]';

interface ProductHorizontalScrollProps {
  products?: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  className?: string;
}

/** Horizontally scrollable row of compact product cards */
export function ProductHorizontalScroll({
  products = [],
  isLoading,
  skeletonCount = 4,
  className = '',
}: ProductHorizontalScrollProps) {
  const trackClass = `flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-1 ${className}`;

  if (isLoading) {
    return (
      <div className={trackClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className={CARD_SLOT}>
            <ProductCardCompactSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={trackClass}>
      {products.map((p) => (
        <div key={p.id} className={CARD_SLOT}>
          <ProductCardCompact product={p} />
        </div>
      ))}
    </div>
  );
}
