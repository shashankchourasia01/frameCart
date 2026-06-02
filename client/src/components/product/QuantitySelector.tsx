import { motion } from 'framer-motion';
import { AnimatedCounter } from '../shared/AnimatedCounter';

interface QuantitySelectorProps {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 10 }: QuantitySelectorProps) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Quantity</h3>
      <div className="mt-3 flex items-center gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-maroon text-white"
          aria-label="Decrease quantity"
        >
          −
        </motion.button>
        <span className="min-w-[2ch] text-center text-xl font-bold tabular-nums">
          <AnimatedCounter value={value} />
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-maroon text-white"
          aria-label="Increase quantity"
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
