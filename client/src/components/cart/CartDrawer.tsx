import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { drawerVariants } from '../../animations/variants';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export function CartDrawer() {
  const { isOpen, setOpen, items } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="font-heading text-xl text-brand-maroon">Your Cart</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close cart">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-brand-charcoal-light py-12">Your cart is empty</p>
              ) : (
                items.map((item) => <CartItem key={item.id} item={item} />)
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t p-4">
                <CartSummary />
                <Link
                  to="/preview"
                  onClick={() => setOpen(false)}
                  className="mt-4 block w-full rounded-btn bg-brand-maroon py-3 text-center text-white"
                >
                  Review & Order
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
