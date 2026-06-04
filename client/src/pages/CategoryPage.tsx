import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useCategory } from '../hooks/useCategories';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { fadeUp, staggerContainer } from '../animations/variants';
import { getCategoryBanner } from '../constants/images';
import { CategoryIcon } from '../components/icons';

type SortKey = 'latest' | 'price-asc' | 'price-desc' | 'bestseller';

export function CategoryPage() {
  const { slug = '' } = useParams();
  const { data: category } = useCategory(slug);
  const { data: products, isLoading } = useProducts({ category: slug });
  const [sort, setSort] = useState<SortKey>('latest');
  const [limit, setLimit] = useState(8);

  const banner = getCategoryBanner(slug, category?.banner_url);

  const sorted = useMemo(() => {
    const list = [...(products ?? [])];
    if (sort === 'price-asc') list.sort((a, b) => Number(a.base_price) - Number(b.base_price));
    if (sort === 'price-desc') list.sort((a, b) => Number(b.base_price) - Number(a.base_price));
    if (sort === 'bestseller') list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    return list.slice(0, limit);
  }, [products, sort, limit]);

  return (
    <div>
      <div className="relative h-56 sm:h-72 lg:h-80">
        <img
          src={banner}
          alt={category?.name ?? slug}
          referrerPolicy="no-referrer"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-10 text-center">
          <CategoryIcon slug={slug} size="xl" className="bg-white/20" />
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {category?.name ?? slug}
          </h1>
          {category?.description && (
            <p className="mt-2 max-w-md text-sm text-white/75">{category.description}</p>
          )}
        </div>
      </div>

      <div className="sticky top-[65px] z-20 border-b border-brand-ivory-dark bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {(['latest', 'price-asc', 'price-desc', 'bestseller'] as SortKey[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                sort === s
                  ? 'bg-brand-maroon text-white shadow-sm'
                  : 'bg-brand-ivory-dark text-brand-charcoal hover:bg-brand-ivory'
              }`}
            >
              {s === 'latest' ? 'Latest' : s === 'price-asc' ? 'Price ↑' : s === 'price-desc' ? 'Price ↓' : 'Bestsellers'}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState
            title="No frames found"
            description="Try another category or check back soon."
            actionLabel="Browse all"
            onAction={() => setSort('latest')}
          />
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {sorted.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
            {(products?.length ?? 0) > limit && (
              <button
                type="button"
                onClick={() => setLimit((l) => l + 8)}
                className="btn-outline mx-auto mt-10 block"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
