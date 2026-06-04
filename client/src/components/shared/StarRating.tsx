import { StarIcon } from '../icons';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const rounded = Math.round(rating);
  const iconSize = size === 'sm' ? 'sm' : 'md';

  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      <span className="inline-flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < rounded} size={iconSize} />
        ))}
      </span>
      {count !== undefined && (
        <span className="text-sm text-brand-charcoal-light">({count})</span>
      )}
    </div>
  );
}
