import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { cardHover } from '../../animations/variants';
import { LazyImage } from '../shared/LazyImage';
import { StarRating } from '../shared/StarRating';
import { ProductBadge } from './ProductBadge';
import { getProductImage } from '../../constants/images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = getProductImage(product.slug, product.images);

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.article
        {...cardHover}
        className="group overflow-hidden rounded-card bg-white shadow-card"
      >
        <div className="overflow-hidden">
          <LazyImage
            src={image}
            alt={product.name}
            className="w-full transition duration-500 group-hover:scale-105"
            aspect="square"
          />
        </div>
        <div className="p-3">
          <ProductBadge product={product} className="mb-2 inline-block rounded-full normal-case" />
          <h3 className="font-heading text-xs font-semibold text-brand-charcoal line-clamp-2 sm:text-sm">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="mt-1 text-xs text-brand-charcoal-light line-clamp-1">{product.tagline}</p>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold tabular-nums text-brand-maroon">
              {formatPrice(Number(product.base_price))}
            </span>
            <StarRating rating={Number(product.avg_rating)} size="sm" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
