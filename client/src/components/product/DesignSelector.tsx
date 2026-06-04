import { motion } from 'framer-motion';
import type { ProductDesign } from '../../types';
import { cn } from '../../lib/utils';
import { getDesignImage } from '../../constants/images';
import { CheckIcon } from '../icons';

interface DesignSelectorProps {
  designs: ProductDesign[];
  selected?: ProductDesign;
  onSelect: (design: ProductDesign) => void;
}

export function DesignSelector({ designs, selected, onSelect }: DesignSelectorProps) {
  const idx = designs.findIndex((d) => d.id === selected?.id);

  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Choose Your Design</h3>
      <p className="text-xs text-brand-charcoal-light">
        Design {idx >= 0 ? idx + 1 : 1} of {designs.length || 1}
      </p>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {designs.map((d) => (
          <motion.button
            key={d.id}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(d)}
            className={cn(
              'relative h-24 w-24 shrink-0 overflow-hidden rounded-card border-2 shadow-sm transition',
              selected?.id === d.id
                ? 'border-brand-maroon ring-2 ring-brand-maroon/30'
                : 'border-brand-ivory-dark hover:border-brand-gold/50'
            )}
          >
            <img
              src={d.thumbnail_url ?? getDesignImage(d.name)}
              alt={d.name}
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 py-1.5 text-[10px] font-medium text-white">
              {d.name}
            </span>
            {selected?.id === d.id && (
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-maroon text-white">
                <CheckIcon size="xs" />
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
