import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { ProductGridCompact } from '../product/ProductGridCompact';
import { HiArrowRight } from '../icons';
import { fadeUp } from '../../animations/variants';

const FRAMES_PER_CATEGORY = 4;
const FEATURED_CATEGORY_SLUGS = ['family-relationship', 'wedding-collection', 'baby-kids'] as const;

function SectionIntro() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-6xl xl:max-w-7xl"
    >
      <div className="relative overflow-hidden rounded-2xl border border-brand-maroon/10 bg-gradient-to-br from-white via-brand-ivory to-brand-maroon-light/50 shadow-card">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-gold/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-maroon/5 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-10">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-brand-maroon/15 bg-brand-maroon/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-maroon sm:text-xs">
              Shop by occasion
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-brand-charcoal sm:text-3xl lg:text-4xl">
              Choose Your Photo Frame
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-charcoal-light sm:text-base lg:mx-0">
              Turn your memories into premium wall decor — browse wedding, family, baby, festival
              and more collections below.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[15rem] lg:grid-cols-1">
            {[
              { value: '9', label: 'Categories' },
              { value: '50+', label: 'Frame designs' },
              { value: '100%', label: 'Custom photos' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-brand-maroon/10 bg-white/80 px-3 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4 lg:text-left"
              >
                <p className="font-display text-xl font-bold text-brand-maroon sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-charcoal-light sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryRow({ slug, name }: { slug: string; name: string }) {
  const { data: products, isLoading } = useProducts({ category: slug, limit: FRAMES_PER_CATEGORY });

  return (
    <section className="border-b border-brand-maroon/5 bg-white py-10 last:border-0 sm:py-12">
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
      <section className="bg-brand-ivory/40 py-10 sm:py-12">
        <SectionIntro />
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-6xl xl:max-w-7xl">
          <ProductGridCompact isLoading skeletonCount={4} />
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-ivory/40">
      <div className="pb-2 pt-10 sm:pt-14">
        <SectionIntro />
      </div>
      {(categories ?? [])
        .filter((cat) => FEATURED_CATEGORY_SLUGS.includes(cat.slug as (typeof FEATURED_CATEGORY_SLUGS)[number]))
        .map((cat) => (
          <CategoryRow key={cat.id} slug={cat.slug} name={cat.name} />
        ))}
    </div>
  );
}
