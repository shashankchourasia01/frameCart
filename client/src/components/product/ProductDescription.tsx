import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDescriptionProps {
  description?: string;
  materialInfo?: string;
}

export function ProductDescription({ description, materialInfo }: ProductDescriptionProps) {
  const [open, setOpen] = useState(true);
  const [careOpen, setCareOpen] = useState(false);

  const features = [
    { icon: '🪵', title: 'Material', text: materialInfo ?? 'Premium quality materials' },
    { icon: '🖨️', title: 'Print Quality', text: 'High-resolution archival prints' },
    { icon: '📦', title: 'Packaging', text: 'Secure gift-ready packaging' },
  ];

  return (
    <div className="border-t border-brand-ivory-dark pt-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-heading text-lg text-brand-maroon"
      >
        About This Frame
        <span>{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {description && <p className="mt-3 text-sm leading-relaxed">{description}</p>}
            <div className="mt-4 space-y-3">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3 text-sm">
                  <span className="text-xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-brand-charcoal-light">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCareOpen(!careOpen)}
              className="mt-4 text-sm font-medium text-brand-maroon"
            >
              Care Instructions {careOpen ? '▲' : '▼'}
            </button>
            {careOpen && (
              <p className="mt-2 text-sm text-brand-charcoal-light">
                Keep away from direct sunlight and moisture. Dust with a soft, dry cloth.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
