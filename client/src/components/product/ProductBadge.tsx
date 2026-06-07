import { PRODUCT_BADGES, resolveProductBadge } from '../../constants/productBadges';
import type { Product } from '../../types';
import { cn } from '../../lib/utils';

interface ProductBadgeProps {
  product: Pick<Product, 'badge' | 'is_bestseller' | 'is_featured'>;
  className?: string;
  compact?: boolean;
}

export function ProductBadge({ product, className, compact = false }: ProductBadgeProps) {
  const badge = resolveProductBadge(product);
  if (!badge) return null;

  const config = PRODUCT_BADGES[badge];

  return (
    <span
      className={cn(
        'rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide shadow-sm lg:px-2 lg:text-[9px]',
        config.className,
        className
      )}
    >
      {compact ? config.shortLabel : config.label}
    </span>
  );
}
