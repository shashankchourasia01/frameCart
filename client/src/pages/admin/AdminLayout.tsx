import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import type { AdminLayoutContext } from '../../components/admin/AdminHeader';

export function AdminLayout() {
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (!mobileNav) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNav(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileNav]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-neutral-50">
      {/* Desktop: fixed sidebar + padded main */}
      <AdminSidebar />

      <AnimatePresence>
        {mobileNav ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-neutral-900/25 lg:hidden"
              onClick={() => setMobileNav(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(280px,88vw)] lg:hidden"
            >
              <AdminSidebar
                mobile
                onNavigate={() => setMobileNav(false)}
                onClose={() => setMobileNav(false)}
              />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Main panel — offset for fixed sidebar on lg+ */}
      <div className="flex min-h-screen w-full min-w-0 flex-col bg-neutral-50 lg:pl-60">
        <Outlet
          context={{ openMobileNav: () => setMobileNav(true) } satisfies AdminLayoutContext}
        />
      </div>
    </div>
  );
}
