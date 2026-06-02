import { motion } from 'framer-motion';
import type { ProductSize } from '../../types';
import { formatPrice } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selected?: string;
  onSelect: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Select Frame Size</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <motion.button
            key={s.inches}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(s)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              selected === s.inches
                ? 'bg-brand-maroon text-white'
                : 'bg-brand-ivory-dark text-brand-charcoal hover:bg-brand-maroon-light'
            )}
          >
            {s.label}
            {s.price_add > 0 && (
              <span className="ml-1 text-xs opacity-80">+{formatPrice(s.price_add)}</span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
