import { Link } from 'react-router-dom';
import { SinceBadge } from '../shared/SinceBadge';
import { APP_NAME } from '../../constants';
import { IMAGES } from '../../constants/images';

export function Footer() {
  return (
    <footer id="about" className="relative overflow-hidden bg-brand-charcoal text-white">
      <img
        src={IMAGES.hero}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-brand-charcoal/90" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="font-display text-3xl font-bold text-white">{APP_NAME}</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Crafting premium custom photo frames for Indian families since 1998. Turn your cherished
            memories into timeless art — ordered easily via WhatsApp.
          </p>
          <div className="mt-5">
            <SinceBadge />
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition hover:text-white">
                Shop Frames
              </Link>
            </li>
            <li>
              <Link to="/offers" className="transition hover:text-white">
                Offers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>WhatsApp: +91 98765 43210</li>
            <li>Instagram: @framecraft.in</li>
            <li>Email: hello@framecraft.in</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {APP_NAME}. Made with care in India
      </div>
    </footer>
  );
}
