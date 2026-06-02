import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { AnimatedCounter } from '../shared/AnimatedCounter';
import { MobileMenu } from './MobileMenu';
import { APP_NAME } from '../../constants';
import { cn } from '../../lib/utils';
import { openWhatsApp } from '../../lib/whatsapp';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/category/wedding', label: 'Frames' },
  { to: '/offers', label: 'Offers' },
  { to: '/#about', label: 'About' },
];

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h15l-1.5 9h-12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6L5 3H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setOpen } = useCartStore();
  const count = totalItems();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          transparent
            ? 'bg-gradient-to-b from-brand-charcoal/45 via-brand-charcoal/20 to-transparent'
            : 'border-b border-brand-ivory-dark/80 bg-white/90 shadow-sticky-header backdrop-blur-lg'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className={cn(
              'font-display text-2xl font-bold tracking-tight transition',
              transparent ? 'text-white' : 'text-brand-maroon'
            )}
            style={transparent ? { textShadow: '0 2px 10px rgba(0,0,0,0.35)' } : undefined}
          >
            {APP_NAME}
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  transparent
                    ? location.pathname === link.to
                      ? 'bg-white/15 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                    : location.pathname === link.to
                      ? 'bg-brand-maroon-light text-brand-maroon'
                      : 'text-brand-charcoal hover:bg-brand-ivory-dark'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                'relative rounded-full p-2.5 transition',
                transparent
                  ? 'border border-white/25 bg-black/15 text-white hover:bg-black/25'
                  : 'text-brand-charcoal hover:bg-brand-ivory-dark'
              )}
              aria-label={`Cart, ${count} items`}
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-maroon px-1 text-[10px] font-bold text-white">
                  <AnimatedCounter value={count} />
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => openWhatsApp('Hi! I need help with a frame order.')}
              className="hidden rounded-btn bg-brand-whatsapp px-4 py-2 text-sm font-semibold text-white md:block hover:bg-brand-whatsapp-dark"
            >
              WhatsApp
            </button>
            <button
              type="button"
              className={cn(
                'rounded-full p-2.5 md:hidden',
                transparent
                  ? 'border border-white/25 bg-black/15 text-white hover:bg-black/25'
                  : 'text-brand-charcoal hover:bg-brand-ivory-dark'
              )}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
