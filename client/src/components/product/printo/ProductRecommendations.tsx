import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { getRecentlyViewed } from '../../../lib/recentlyViewed';
import { formatPrice } from '../../../lib/utils';
import { getProductCardImage } from '../../../constants/images';
import { ProductCardCompact } from '../ProductCardCompact';

interface ProductRecommendationsProps {
  categorySlug?: string;
  currentSlug: string;
}

export function ProductRecommendations({ categorySlug, currentSlug }: ProductRecommendationsProps) {
  const { data: similar } = useProducts(categorySlug ? { category: categorySlug, limit: 8 } : undefined);
  const similarList = (similar ?? []).filter((p) => p.slug !== currentSlug).slice(0, 6);
  const recent = getRecentlyViewed(currentSlug).slice(0, 6);

  return (
    <>
      {similarList.length > 0 && (
        <section className="border-t border-neutral-200 py-6">
          <h2 className="text-base font-bold text-brand-charcoal">You might be interested in</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {similarList.map((p) => (
              <ProductCardCompact key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="border-t border-neutral-200 py-6">
          <h2 className="text-base font-bold text-brand-charcoal">Recently viewed products</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {recent.map((r) => (
              <Link
                key={r.slug}
                to={`/product/${r.slug}`}
                className="block overflow-hidden rounded-md border border-neutral-200 bg-white"
              >
                <div className="flex h-[7.5rem] items-center justify-center bg-neutral-50 px-3 py-3">
                  <img
                    src={getProductCardImage(r.slug)}
                    alt=""
                    className="max-h-[5rem] w-full max-w-[88%] object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 text-center">
                  <p className="min-h-[2.25rem] text-xs font-semibold leading-snug text-brand-charcoal line-clamp-2">
                    {r.name}
                  </p>
                  <p className="mt-1 text-sm font-bold tabular-nums">{formatPrice(r.base_price)}</p>
                  <p className="text-[10px] text-brand-charcoal-light">for 1 piece</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
