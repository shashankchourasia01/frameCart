import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { ProductGridCompact } from '../product/ProductGridCompact';
import { HiArrowRight } from '../icons';

const FRAMES_PER_CATEGORY = 4;
const FEATURED_CATEGORY_SLUGS = ['wedding', 'anniversary', 'couple'] as const;

function CategoryRow({ slug, name }: { slug: string; name: string }) {
  const { data: products, isLoading } = useProducts({ category: slug, limit: FRAMES_PER_CATEGORY });

  return (
    <section className="border-b border-neutral-100 py-10 last:border-0 sm:py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-6xl xl:max-w-7xl">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold text-brand-charcoal sm:text-2xl">{name} Frames</h2>
          <p className="mt-1 text-sm text-brand-charcoal-light">
            Premium designs for {name.toLowerCase()} moments
          </p>
        </div>

        <div className="mt-6">
          <ProductGridCompact products={products} isLoading={isLoading} skeletonCount={4} />
        </div>

        <div className="mt-5 text-center">
          <Link
            to={`/category/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-maroon hover:underline"
          >
            View all {name.toLowerCase()} frames
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CategoryFramesSection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-white py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-6xl xl:max-w-7xl">
          <ProductGridCompact isLoading skeletonCount={4} />
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <div className="px-4 pb-2 pt-12 text-center sm:pt-16">
        <h2 className="font-display text-2xl font-bold text-brand-charcoal sm:text-3xl">
          Choose Your Photo Frame
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-charcoal-light">
          Turn your memories into premium wall decor — browse by occasion below
        </p>
      </div>
      {(categories ?? [])
        .filter((cat) => FEATURED_CATEGORY_SLUGS.includes(cat.slug as (typeof FEATURED_CATEGORY_SLUGS)[number]))
        .map((cat) => (
          <CategoryRow key={cat.id} slug={cat.slug} name={cat.name} />
        ))}
    </div>
  );
}
