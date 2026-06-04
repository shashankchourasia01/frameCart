import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useCategories';
import { CategoryIcon } from '../icons';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { cn } from '../../lib/utils';

interface CategoryIconGridProps {
  /** Max categories to show (default: all) */
  limit?: number;
  className?: string;
  columns?: '4' | '5';
}

export function CategoryIconGrid({ limit, className, columns = '4' }: CategoryIconGridProps) {
  const { data: categories, isLoading } = useCategories();
  const items = limit ? (categories ?? []).slice(0, limit) : (categories ?? []);

  const colClass =
    columns === '5'
      ? 'grid-cols-4 sm:grid-cols-5'
      : 'grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5';

  if (isLoading) {
    return (
      <div className={cn('grid gap-4 gap-y-8', colClass, className)}>
        {Array.from({ length: limit ?? 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2.5">
            <div className="h-[4.25rem] w-[4.25rem] animate-shimmer rounded-full bg-shimmer bg-[length:200%_100%] sm:h-[4.75rem] sm:w-[4.75rem]" />
            <div className="h-3 w-14 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={cn('grid gap-x-2 gap-y-7 sm:gap-x-4 sm:gap-y-9', colClass, className)}
    >
      {items.map((cat) => (
        <motion.div key={cat.id} variants={fadeUp}>
          <Link
            to={`/category/${cat.slug}`}
            className="group flex flex-col items-center gap-2.5 rounded-2xl px-1 py-2 transition hover:bg-brand-maroon/[0.04] active:scale-[0.98]"
          >
            <span className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-gradient-to-br from-brand-maroon/12 to-brand-maroon/6 text-brand-maroon shadow-sm ring-1 ring-brand-maroon/10 transition duration-300 group-hover:bg-brand-maroon group-hover:text-white group-hover:shadow-md group-hover:ring-brand-maroon sm:h-[4.75rem] sm:w-[4.75rem]">
              <CategoryIcon slug={cat.slug} size="lg" variant="solid" className="!bg-transparent !p-0 !text-inherit" />
            </span>
            <span className="max-w-[5.5rem] text-center text-[11px] font-semibold leading-tight text-brand-charcoal transition group-hover:text-brand-maroon sm:max-w-none sm:text-xs">
              {cat.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
