import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../animations/variants';
import { SinceBadge } from '../shared/SinceBadge';
import { IMAGES } from '../../constants/images';

const words = ['Turn', 'Memories', 'Into', 'Art'];

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden lg:min-h-[92vh]">
      <img
        src={IMAGES.hero}
        alt="Premium photo frames on a gallery wall"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/85 via-brand-charcoal/60 to-brand-charcoal/30" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[92vh] lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SinceBadge />
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {words.map((word, i) => (
              <motion.span
                key={word}
                variants={fadeUp}
                className="mr-3 inline-block last:mr-0"
                style={{ display: i === 2 ? 'block' : 'inline-block' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            Handcrafted premium frames for weddings, families & every milestone — ordered easily via WhatsApp.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Link to="/category/wedding" className="btn-primary">
              Shop Frames
            </Link>
            <Link to="/#about" className="btn-outline border-white/30 text-white hover:border-white hover:bg-white/10">
              Our Story
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/20 pt-8"
          >
            {[
              { value: '10K+', label: 'Frames Delivered' },
              { value: '4.9★', label: 'Customer Rating' },
              { value: '1998', label: 'Crafting Since' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-brand-gold">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
