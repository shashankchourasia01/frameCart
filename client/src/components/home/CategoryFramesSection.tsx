import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../product/ProductCard';
import { ProductCardSkeleton } from '../product/ProductCardSkeleton';
import { CategoryIcon, HiArrowRight } from '../icons';
import { fadeUp, staggerContainer } from '../../animations/variants';

const FRAMES_PER_CATEGORY = 5;

function CategoryRow({ slug, name }: { slug: string; name: string }) {
  const { data: products, isLoading } = useProducts({ category: slug, limit: FRAMES_PER_CATEGORY });

  return (
    <section className="border-b border-brand-ivory-dark/80 py-12 last:border-0 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <CategoryIcon slug={slug} size="md" variant="solid" className="!bg-brand-maroon/10" />
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-charcoal sm:text-3xl">
                {name} Frames
              </h2>
              <p className="text-sm text-brand-charcoal-light">
                Handpicked designs for {name.toLowerCase()} moments
              </p>
            </div>
          </div>
          <Link
            to={`/category/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-maroon hover:text-brand-maroon-dark"
          >
            View all {name.toLowerCase()}
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-8"
        >
          <div
            className="-mx-4 flex gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-3 scrollbar-hide snap-x snap-mandatory sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-8 lg:px-8"
            aria-label={`${name} frames — scroll horizontally`}
          >
            {isLoading
              ? Array.from({ length: FRAMES_PER_CATEGORY }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="w-[min(72vw,13.5rem)] shrink-0 snap-start sm:w-52 md:w-56"
                  >
                    <ProductCardSkeleton />
                  </motion.div>
                ))
              : (products ?? []).map((p) => (
                  <motion.div
                    key={p.id}
                    variants={fadeUp}
                    className="w-[min(72vw,13.5rem)] shrink-0 snap-start sm:w-52 md:w-56"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
          </div>
          <p className="mt-1 text-center text-[11px] text-brand-charcoal-light/80 sm:hidden">
            Swipe to see more →
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function CategoryFramesSection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl -mx-4 flex gap-3 overflow-x-auto px-4 scrollbar-hide sm:-mx-6 sm:px-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[min(72vw,13.5rem)] shrink-0 sm:w-52">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">
      <div className="section-padding pb-0 pt-14 sm:pt-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="section-title">Frames for Every Occasion</h2>
          <p className="section-subtitle mx-auto mt-2">
            Browse curated collections — swipe through 5 designs per category
          </p>
        </div>
      </div>
      {(categories ?? []).map((cat) => (
        <CategoryRow key={cat.id} slug={cat.slug} name={cat.name} />
      ))}
    </div>
  );
}
