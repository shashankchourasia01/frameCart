import { motion } from 'framer-motion';
import { formatPrice } from '../../lib/utils';
import { HiShoppingCart } from 'react-icons/hi2';
import { WhatsAppIcon } from '../icons';

interface StickyOrderBarProps {
  totalPrice: number;
  onWhatsApp: () => void;
  onAddToCart: () => void;
  errors?: string[];
}

export function StickyOrderBar({ totalPrice, onWhatsApp, onAddToCart, errors }: StickyOrderBarProps) {
  return (
    <>
      {errors && errors.length > 0 && (
        <motion.div
          animate={{ x: [0, -8, 8, -8, 8, 0] }}
          className="fixed bottom-[140px] left-4 right-4 z-30 rounded-lg bg-brand-error/10 px-4 py-2 text-sm text-brand-error md:static md:mb-2"
        >
          {errors.join(' • ')}
        </motion.div>
      )}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-[64px] left-0 right-0 z-30 border-t border-brand-ivory-dark bg-white px-4 py-3 shadow-up md:static md:bottom-auto md:mt-8 md:rounded-card md:shadow-none"
      >
        <div className="flex items-center gap-3 md:flex-col md:gap-4">
          <div className="shrink-0 md:w-full md:text-center">
            <span className="text-xs text-brand-charcoal-light">Total</span>
            <p className="text-xl font-bold tabular-nums text-brand-maroon md:text-2xl">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <div className="flex flex-1 gap-2 md:w-full md:flex-col">
            <button
              type="button"
              onClick={onWhatsApp}
              className="flex flex-[3] items-center justify-center gap-2 rounded-btn bg-brand-whatsapp py-3 text-sm font-semibold text-white hover:bg-brand-whatsapp-dark md:w-full"
            >
              <WhatsAppIcon size="sm" />
              Order via WhatsApp
            </button>
            <button
              type="button"
              onClick={onAddToCart}
              className="flex flex-[2] items-center justify-center gap-2 rounded-btn border-2 border-brand-maroon py-3 text-sm font-semibold text-brand-maroon hover:bg-brand-maroon-light md:w-full"
            >
              <HiShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
