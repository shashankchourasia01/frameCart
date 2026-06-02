interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= Math.round(rating));
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      <span className={size === 'sm' ? 'text-sm' : 'text-base'}>
        {stars.map((filled, i) => (
          <span key={i} className={filled ? 'text-brand-gold' : 'text-brand-ivory-dark'}>
            ★
          </span>
        ))}
      </span>
      {count !== undefined && (
        <span className="text-sm text-brand-charcoal-light">({count})</span>
      )}
    </div>
  );
}
