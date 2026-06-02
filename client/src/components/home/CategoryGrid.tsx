import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useCategories';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { getCategoryThumb } from '../../constants/images';

export function CategoryGrid() {
  const { data: categories, isLoading } = useCategories();

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Shop by Occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-subtitle mx-auto"
          >
            Find the perfect frame for every chapter of your life
          </motion.p>
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-shimmer rounded-card bg-shimmer bg-[length:200%_100%]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
          >
            {(categories ?? []).map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link to={`/category/${cat.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-card shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
                    <img
                      src={getCategoryThumb(cat.slug, cat.image_url)}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="image-overlay" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="text-2xl" aria-hidden>
                        {cat.emoji ?? '🖼️'}
                      </span>
                      <p className="mt-1 font-heading text-sm font-semibold text-white sm:text-base">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
