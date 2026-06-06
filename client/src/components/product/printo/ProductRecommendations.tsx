import { Link } from 'react-router-dom';
import { useProducts } from '../../../hooks/useProducts';
import { getRecentlyViewed } from '../../../lib/recentlyViewed';
import { formatPrice } from '../../../lib/utils';
import { getProductCardImage } from '../../../constants/images';
import { ProductGridCompact } from '../ProductGridCompact';

interface ProductRecommendationsProps {
  categorySlug?: string;
  currentSlug: string;
}

const RECOMMEND_GRID =
  'mt-4 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4';

export function ProductRecommendations({ categorySlug, currentSlug }: ProductRecommendationsProps) {
  const { data: similar } = useProducts(categorySlug ? { category: categorySlug, limit: 8 } : undefined);
  const similarList = (similar ?? []).filter((p) => p.slug !== currentSlug).slice(0, 8);
  const recent = getRecentlyViewed(currentSlug).slice(0, 8);

  return (
    <>
      {similarList.length > 0 && (
        <section className="border-t border-neutral-200 py-6 lg:py-8">
          <h2 className="text-base font-bold text-brand-charcoal lg:text-lg">
            You might be interested in
          </h2>
          <div className="mt-4">
            <ProductGridCompact products={similarList} />
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="border-t border-neutral-200 py-6 lg:py-8">
          <h2 className="text-base font-bold text-brand-charcoal lg:text-lg">Recently viewed products</h2>
          <div className={RECOMMEND_GRID}>
            {recent.map((r) => (
              <Link
                key={r.slug}
                to={`/product/${r.slug}`}
                className="block overflow-hidden rounded-md border border-neutral-200 bg-white transition hover:border-brand-maroon/30 hover:shadow-sm lg:rounded-lg"
              >
                <div className="aspect-square overflow-hidden bg-neutral-50">
                  <img
                    src={getProductCardImage(r.slug)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 text-center lg:px-2.5 lg:py-2.5">
                  <p className="min-h-[2.25rem] text-xs font-semibold leading-snug text-brand-charcoal line-clamp-2 lg:text-[12px]">
                    {r.name}
                  </p>
                  <p className="mt-1 text-sm font-bold tabular-nums lg:text-sm">{formatPrice(r.base_price)}</p>
                  <p className="text-[10px] text-brand-charcoal-light lg:text-[9px]">for 1 piece</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
