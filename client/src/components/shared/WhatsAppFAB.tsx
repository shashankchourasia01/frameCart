import { motion } from 'framer-motion';
import { openWhatsApp } from '../../lib/whatsapp';

export function WhatsAppFAB() {
  return (
    <motion.a
      href={`https://wa.me/${import.meta.env.VITE_BUSINESS_WHATSAPP ?? '919876543210'}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        openWhatsApp('Hi FrameCraft! I would like to know more about your frames.');
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-whatsapp text-2xl text-white shadow-lg md:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      💬
    </motion.a>
  );
}
