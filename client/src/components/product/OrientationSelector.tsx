import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface OrientationSelectorProps {
  orientations: string[];
  selected: string;
  onSelect: (o: string) => void;
}

function FrameIcon({ landscape }: { landscape?: boolean }) {
  return (
    <svg viewBox="0 0 48 64" className="mx-auto h-16 w-12" aria-hidden>
      <rect x="4" y="4" width="40" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect
        x="10"
        y="10"
        width={landscape ? 28 : 20}
        height={landscape ? 20 : 28}
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

export function OrientationSelector({ orientations, selected, onSelect }: OrientationSelectorProps) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Frame Orientation</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {orientations.map((o) => {
          const landscape = o === 'Landscape';
          const active = selected === o;
          return (
            <motion.button
              key={o}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(o)}
              className={cn(
                'rounded-card border-2 p-4 transition',
                active ? 'border-brand-maroon bg-brand-maroon-light' : 'border-brand-ivory-dark bg-white'
              )}
            >
              <FrameIcon landscape={landscape} />
              <p className="mt-2 font-semibold text-brand-charcoal">{o}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
