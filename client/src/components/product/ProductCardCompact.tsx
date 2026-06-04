import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { getProductCardImage } from '../../constants/images';
import { LazyImage } from '../shared/LazyImage';
import { cn } from '../../lib/utils';

interface ProductCardCompactProps {
  product: Product;
  className?: string;
}

/** Printo-style compact card — full image in grid; detail page shows smaller preview */
export function ProductCardCompact({ product, className }: ProductCardCompactProps) {
  const image = getProductCardImage(product.slug, product.images);
  const price = Number(product.base_price);

  return (
    <Link to={`/product/${product.slug}`} className={cn('block h-full', className)}>
      <article className="flex h-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-white transition hover:border-brand-maroon/30 hover:shadow-sm">
        <div className="relative overflow-hidden bg-neutral-50">
          <LazyImage src={image} alt={product.name} className="w-full" aspect="square" />
          {product.is_bestseller && (
            <span className="absolute left-1.5 top-1.5 rounded-sm bg-brand-maroon px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white shadow-sm">
              Bestseller
            </span>
          )}
          {product.is_featured && !product.is_bestseller && (
            <span className="absolute right-1.5 top-1.5 rounded-sm bg-violet-600 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white">
              New
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col border-t border-neutral-100 px-2 py-2.5 text-center sm:px-3 sm:py-3">
          <h3 className="min-h-[2.5rem] text-[12px] font-semibold leading-snug text-brand-charcoal line-clamp-2 sm:text-[13px]">
            {product.name}
          </h3>
          <p className="mt-1.5 text-sm font-bold tabular-nums text-brand-charcoal sm:text-base">
            {formatPrice(price)}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-brand-charcoal-light">for 1 piece</p>
        </div>
      </article>
    </Link>
  );
}
