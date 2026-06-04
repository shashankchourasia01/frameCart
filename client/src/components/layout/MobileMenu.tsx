import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { drawerVariants } from '../../animations/variants';
import { APP_NAME, BUSINESS_WHATSAPP } from '../../constants';
import { openWhatsApp } from '../../lib/whatsapp';
import {
  AppIcon,
  CloseIcon,
  HiArrowRight,
  HiBolt,
  HiPhoto,
  HiTruck,
  WhatsAppIcon,
} from '../icons';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/offers', label: 'Offers' },
  { to: '/#about', label: 'About' },
];

const features = [
  { icon: HiTruck, text: 'Free delivery above ₹499' },
  { icon: HiPhoto, text: 'Premium handcrafted frames' },
  { icon: HiBolt, text: 'Fast support on WhatsApp' },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 flex h-full w-[88%] max-w-sm flex-col bg-white p-6 shadow-xl"
            aria-label="Mobile menu"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-brand-maroon">{APP_NAME}</p>
                <p className="text-xs text-brand-charcoal-light">Turn Memories Into Art</p>
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-brand-charcoal hover:bg-brand-ivory-dark"
                onClick={onClose}
                aria-label="Close"
              >
                <CloseIcon size="lg" />
              </button>
            </div>

            <div className="space-y-1 rounded-card border border-brand-ivory-dark bg-brand-ivory/50 p-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-brand-charcoal transition hover:bg-white hover:text-brand-maroon"
                >
                  {link.label}
                  <HiArrowRight className="h-4 w-4 text-brand-charcoal-light" />
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-card border border-brand-gold/30 bg-brand-gold-light/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">Why choose us</p>
              <ul className="mt-3 space-y-2 text-sm text-brand-charcoal">
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-2.5">
                    <AppIcon icon={feature.icon} size="sm" className="text-brand-maroon" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto space-y-3 pt-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openWhatsApp('Hi! I need help selecting a frame.');
                }}
                className="flex w-full items-center justify-center gap-2 rounded-btn bg-brand-whatsapp px-4 py-3 text-sm font-semibold text-white hover:bg-brand-whatsapp-dark"
              >
                <WhatsAppIcon size="md" />
                Chat on WhatsApp
              </button>
              <p className="text-center text-xs text-brand-charcoal-light">Support: +{BUSINESS_WHATSAPP}</p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
