import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppIcon, FEATURE_ICONS, HiChevronDown, HiChevronUp, HiMinus, HiPlus, type FeatureIconKey } from '../icons';

interface ProductDescriptionProps {
  description?: string;
  materialInfo?: string;
}

export function ProductDescription({ description, materialInfo }: ProductDescriptionProps) {
  const [open, setOpen] = useState(true);
  const [careOpen, setCareOpen] = useState(false);

  const features: { icon: FeatureIconKey; title: string; text: string }[] = [
    { icon: 'material', title: 'Material', text: materialInfo ?? 'Premium quality materials' },
    { icon: 'print', title: 'Print Quality', text: 'High-resolution archival prints' },
    { icon: 'packaging', title: 'Packaging', text: 'Secure gift-ready packaging' },
  ];

  return (
    <div className="border-t border-brand-ivory-dark pt-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-heading text-lg text-brand-maroon"
      >
        About This Frame
        {open ? <HiMinus className="h-5 w-5" /> : <HiPlus className="h-5 w-5" />}
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
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-maroon/10 text-brand-maroon">
                    <AppIcon icon={FEATURE_ICONS[f.icon]} size="md" />
                  </span>
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
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-maroon"
            >
              Care Instructions
              {careOpen ? <HiChevronUp className="h-4 w-4" /> : <HiChevronDown className="h-4 w-4" />}
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
