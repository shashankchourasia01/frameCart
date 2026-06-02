import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const FINISH_INFO: Record<string, { icon: string; desc: string }> = {
  Matte: { icon: '🖤', desc: 'No glare, elegant finish' },
  Glossy: { icon: '✨', desc: 'Vivid colors, shine' },
};

interface FinishSelectorProps {
  finishes: string[];
  selected: string;
  onSelect: (finish: string) => void;
}

export function FinishSelector({ finishes, selected, onSelect }: FinishSelectorProps) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Choose Print Finish</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {finishes.map((f) => {
          const info = FINISH_INFO[f] ?? { icon: '🖼️', desc: f };
          const active = selected === f;
          return (
            <motion.button
              key={f}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(f)}
              className={cn(
                'rounded-card border-2 p-4 text-left transition',
                active
                  ? 'border-brand-maroon bg-brand-maroon text-white'
                  : 'border-brand-ivory-dark bg-white hover:border-brand-maroon/50'
              )}
            >
              <span className="text-2xl">{info.icon}</span>
              <p className="mt-2 font-semibold">{f}</p>
              <p className={cn('text-xs', active ? 'text-white/80' : 'text-brand-charcoal-light')}>
                {info.desc}
              </p>
              {active && <span className="mt-2 inline-block text-sm">✓ Selected</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
