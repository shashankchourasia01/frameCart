import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategory } from '../hooks/useCategories';
import { ProductGridCompact } from '../components/product/ProductGridCompact';
import { EmptyState } from '../components/shared/EmptyState';
import { Breadcrumbs } from '../components/shared/Breadcrumbs';
import { HiArrowRight } from '../components/icons';

type SortKey = 'latest' | 'price-asc' | 'price-desc' | 'bestseller';

const SORT_LABELS: Record<SortKey, string> = {
  latest: 'Latest',
  'price-asc': 'Price ↑',
  'price-desc': 'Price ↓',
  bestseller: 'Bestsellers',
};

export function CategoryPage() {
  const navigate = useNavigate();
  const { slug = '' } = useParams();
  const { data: category } = useCategory(slug);
  const { data: products, isLoading } = useProducts({ category: slug });
  const [sort, setSort] = useState<SortKey>('latest');

  const categoryName = category?.name ?? slug;

  const sorted = useMemo(() => {
    const list = [...(products ?? [])];
    if (sort === 'price-asc') list.sort((a, b) => Number(a.base_price) - Number(b.base_price));
    if (sort === 'price-desc') list.sort((a, b) => Number(b.base_price) - Number(a.base_price));
    if (sort === 'bestseller') list.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
    return list;
  }, [products, sort]);

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="border-b border-neutral-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl lg:max-w-6xl xl:max-w-7xl">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
              { label: categoryName },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-6 text-center sm:px-6 lg:max-w-6xl xl:max-w-7xl">
        <h1 className="font-display text-2xl font-bold text-brand-charcoal sm:text-3xl">
          {categoryName} Frames
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-brand-charcoal-light">
          {category?.description ?? 'Turn your memories into premium wall decor or gifts'}
        </p>
        {!isLoading && products && (
          <p className="mt-2 text-xs font-medium text-brand-charcoal-light">
            {products.length} design{products.length !== 1 ? 's' : ''} available
          </p>
        )}
      </div>

      <div className="sticky top-[65px] z-20 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:max-w-6xl xl:max-w-7xl">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-maroon"
          >
            <HiArrowRight className="h-3.5 w-3.5 rotate-180" />
            Categories
          </Link>
          <div className="flex flex-wrap justify-end gap-1.5">
            {(Object.keys(SORT_LABELS) as SortKey[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:text-[11px] ${
                  sort === s
                    ? 'border-brand-maroon bg-brand-maroon text-white'
                    : 'border-neutral-200 bg-white text-brand-charcoal'
                }`}
              >
                {SORT_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-6xl xl:max-w-7xl">
        {sorted.length === 0 && !isLoading ? (
          <EmptyState
            title="No frames in this category yet"
            description="Browse other occasions or return to the shop."
            actionLabel="Back to shop"
            onAction={() => navigate('/shop')}
          />
        ) : (
          <ProductGridCompact products={sorted} isLoading={isLoading} skeletonCount={6} />
        )}
      </div>
    </div>
  );
}
