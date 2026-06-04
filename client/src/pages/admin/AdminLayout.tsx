import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import type { AdminLayoutContext } from '../../components/admin/AdminHeader';

export function AdminLayout() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <AnimatePresence>
        {mobileNav ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileNav(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(280px,85vw)] lg:hidden"
            >
              <AdminSidebar mobile onNavigate={() => setMobileNav(false)} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Outlet
          context={{ openMobileNav: () => setMobileNav(true) } satisfies AdminLayoutContext}
        />
      </div>
    </div>
  );
}
