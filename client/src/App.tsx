import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { OfferBanner } from './components/layout/OfferBanner';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { cn } from './lib/utils';
import { CartDrawer } from './components/cart/CartDrawer';
import { WhatsAppFAB } from './components/shared/WhatsAppFAB';
import { AdminGuard } from './components/admin/AdminGuard';
import { pageTransition } from './animations/variants';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const ProductUploadPage = lazy(() =>
  import('./pages/product/ProductUploadPage').then((m) => ({ default: m.ProductUploadPage }))
);
const ProductReviewPage = lazy(() =>
  import('./pages/product/ProductReviewPage').then((m) => ({ default: m.ProductReviewPage }))
);
const PreviewPage = lazy(() => import('./pages/PreviewPage').then((m) => ({ default: m.PreviewPage })));
const OffersPage = lazy(() => import('./pages/OffersPage').then((m) => ({ default: m.OffersPage })));
const OrderConfirmPage = lazy(() =>
  import('./pages/OrderConfirmPage').then((m) => ({ default: m.OrderConfirmPage }))
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const AdminLoginPage = lazy(() =>
  import('./pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage }))
);
const AdminLayout = lazy(() =>
  import('./pages/admin/AdminLayout').then((m) => ({ default: m.AdminLayout }))
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const AdminOrdersPage = lazy(() =>
  import('./pages/admin/AdminOrdersPage').then((m) => ({ default: m.AdminOrdersPage }))
);
const AdminProductsPage = lazy(() =>
  import('./pages/admin/AdminProductsPage').then((m) => ({ default: m.AdminProductsPage }))
);
const AdminCategoriesPage = lazy(() =>
  import('./pages/admin/AdminCategoriesPage').then((m) => ({ default: m.AdminCategoriesPage }))
);
const AdminOffersPage = lazy(() =>
  import('./pages/admin/AdminOffersPage').then((m) => ({ default: m.AdminOffersPage }))
);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-maroon border-t-transparent" />
    </div>
  );
}

function CustomerLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <>
      <OfferBanner />
      <Header />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const routeKey = isAdminRoute ? 'admin-shell' : location.pathname;

  return (
    <AnimatePresence mode={isAdminRoute ? 'sync' : 'wait'}>
      <motion.div
        key={routeKey}
        variants={isAdminRoute ? undefined : pageTransition}
        initial={isAdminRoute ? false : 'initial'}
        animate={isAdminRoute ? undefined : 'animate'}
        exit={isAdminRoute ? undefined : 'exit'}
        className={isAdminRoute ? 'min-h-screen w-full overflow-x-hidden bg-neutral-50' : undefined}
      >
        <Suspense fallback={<Loading />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/product/:slug/upload" element={<ProductUploadPage />} />
            <Route path="/product/:slug/review" element={<ProductReviewPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/order-confirm" element={<OrderConfirmPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="offers" element={<AdminOffersPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isLogin = location.pathname === '/admin/login';
  return (
  <div className="min-h-screen bg-brand-ivory">
    <ScrollToTop />
    <CustomerLayout />
    <main
      className={cn(
        !isAdmin && 'pb-20 md:pb-0',
        isAdmin && 'min-h-screen w-full overflow-x-hidden bg-neutral-50'
      )}
    >
      <AnimatedRoutes />
    </main>
    {!isAdmin && (
      <>
        <Footer />
        <BottomNav />
        <CartDrawer />
        <WhatsAppFAB />
      </>
    )}
    {!isAdmin && <Toaster position="bottom-right" />}
    {isAdmin && !isLogin && <Toaster position="top-right" />}
  </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
