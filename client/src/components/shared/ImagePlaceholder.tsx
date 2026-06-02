import { cn } from '../../lib/utils';

interface ImagePlaceholderProps {
  className?: string;
  label?: string;
  aspect?: 'square' | 'video' | 'banner' | 'auto';
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  banner: 'aspect-[21/9]',
  auto: 'min-h-[120px]',
};

export function ImagePlaceholder({
  className,
  label = 'Image coming soon',
  aspect = 'square',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-card border-2 border-dashed border-brand-gold/40 bg-brand-ivory-dark',
        aspectClasses[aspect],
        className
      )}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wider text-brand-charcoal-light">
        {label}
      </span>
    </div>
  );
}
