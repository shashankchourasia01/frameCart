import { motion } from 'framer-motion';
import { fadeUp } from '../../animations/variants';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center py-16 text-center"
    >
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-maroon-light text-4xl">
        🖼️
      </div>
      <h3 className="font-heading text-xl text-brand-maroon">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-brand-charcoal-light">{description}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-btn border-2 border-brand-maroon px-6 py-2 text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
