import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const tabs = [
  { to: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/shop', label: 'Shop', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { to: '/offers', label: 'Offers', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
  { to: '/#about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export function BottomNav() {
  const { pathname } = useLocation();
  const activeIndex = tabs.findIndex(
    (t) =>
      t.to === pathname ||
      (t.to === '/shop' && (pathname === '/shop' || pathname.startsWith('/category')))
  );
  const idx = activeIndex >= 0 ? activeIndex : 0;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-ivory-dark bg-white/95 shadow-up backdrop-blur-lg md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="flex">
        {tabs.map((tab, i) => {
          const active =
            i === idx ||
            (tab.to === '/shop' && (pathname === '/shop' || pathname.startsWith('/category')));
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition',
                active ? 'text-brand-maroon' : 'text-brand-charcoal-light'
              )}
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  className="absolute inset-x-3 top-1 bottom-1 rounded-xl bg-brand-maroon-light"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">
                <NavIcon d={tab.icon} />
              </span>
              <span className="relative">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
