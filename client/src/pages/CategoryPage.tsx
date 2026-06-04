import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useCategory } from '../hooks/useCategories';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton';
import { EmptyState } from '../components/shared/EmptyState';
import { Breadcrumbs } from '../components/shared/Breadcrumbs';
import { fadeUp, staggerContainer } from '../animations/variants';
import { getCategoryBanner } from '../constants/images';
import { CategoryIcon, HiArrowRight } from '../components/icons';

type SortKey = 'latest' | 'price-asc' | 'price-desc' | 'bestseller';

const SORT_LABELS: Record<SortKey, string> = {
  latest: 'Latest',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  bestseller: 'Bestsellers',
};

export function CategoryPage() {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const { data: category } = useCategory(slug);
  const { data: products, isLoading } = useProducts({ category: slug });
  const [sort, setSort] = useState<SortKey>('latest');

  const banner = getCategoryBanner(slug, category?.banner_url);
  const categoryName = category?.name ?? slug;

  const sorted = useMemo(() => {
    const list = [...(products ?? [])];
    if (sort === 'price-asc') list.sort((a, b) => Number(a.base_price) - Number(b.base_price));
    if (sort === 'price-desc') list.sort((a, b) => Number(b.base_price) - Number(a.base_price));
    if (sort === 'bestseller') list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    return list;
  }, [products, sort]);

  return (
    <div className="min-h-screen bg-brand-ivory/30">
      <div className="relative h-48 sm:h-56 lg:h-64">
        <img
          src={banner}
          alt={categoryName}
          referrerPolicy="no-referrer"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/85 via-brand-charcoal/45 to-brand-charcoal/20" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Breadcrumbs
              className="mb-4 text-white/70 [&_a]:text-white/90 [&_a:hover]:text-white [&_span]:text-white"
              items={[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: categoryName },
              ]}
            />
            <div className="flex items-end gap-4">
              <CategoryIcon slug={slug} size="lg" className="shrink-0 bg-white/20" />
              <div>
                <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{categoryName}</h1>
                {category?.description && (
                  <p className="mt-1 max-w-lg text-sm text-white/80">{category.description}</p>
                )}
                {!isLoading && products && (
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/60">
                    {products.length} design{products.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-[65px] z-20 border-b border-brand-ivory-dark bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-maroon hover:text-brand-maroon-dark"
          >
            <HiArrowRight className="h-4 w-4 rotate-180" />
            All categories
          </Link>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(SORT_LABELS) as SortKey[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition sm:px-4 sm:text-xs ${
                  sort === s
                    ? 'bg-brand-maroon text-white shadow-sm'
                    : 'bg-brand-ivory-dark text-brand-charcoal hover:bg-brand-ivory'
                }`}
              >
                {SORT_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <EmptyState
            title="No frames in this category yet"
            description="Browse other occasions or return to the shop."
            actionLabel="Back to shop"
            onAction={() => navigate('/shop')}
          />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
          >
            {sorted.map((p) => (
              <motion.div key={p.id} variants={fadeUp}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
