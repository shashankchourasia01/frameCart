import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { StarRating } from '../shared/StarRating';
import { TESTIMONIAL_AVATARS } from '../../constants/images';

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    city: 'Mumbai',
    quote: 'Beautiful frame for our wedding photos. WhatsApp ordering was so easy!',
    rating: 5,
  },
  {
    name: 'Rahul & Ananya',
    city: 'Bangalore',
    quote: 'Premium quality and fast delivery. Highly recommend FrameCraft.',
    rating: 5,
  },
  {
    name: 'Meera K.',
    city: 'Chennai',
    quote: 'The personalization options made our anniversary gift perfect.',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="section-title">Loved by Families Across India</h2>
          <p className="section-subtitle mx-auto">
            Real stories from customers who turned memories into art
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              variants={fadeUp}
              className="glass-card flex flex-col p-7"
            >
              <StarRating rating={t.rating} size="sm" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-charcoal">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-brand-ivory-dark pt-5">
                <img
                  src={TESTIMONIAL_AVATARS[i]}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-brand-gold/30"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-brand-charcoal-light">{t.city}</p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
