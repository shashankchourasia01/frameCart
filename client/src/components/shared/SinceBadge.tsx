import { HiSparkles } from 'react-icons/hi2';

export function SinceBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/50 bg-brand-gold-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-maroon">
      <HiSparkles className="h-3.5 w-3.5" aria-hidden />
      Since 1998
    </span>
  );
}
