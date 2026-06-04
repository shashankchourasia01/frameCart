import { formatPrice } from '../../../lib/utils';

interface PriceDisplayProps {
  unitPrice: number;
  mrp: number;
  discount: number;
  compact?: boolean;
}

export function PriceDisplay({ unitPrice, mrp, discount, compact }: PriceDisplayProps) {
  return (
    <div className={compact ? '' : 'mt-1'}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-sm text-brand-charcoal-light">From</span>
        <span className="text-xl font-bold text-brand-charcoal sm:text-2xl">
          {formatPrice(unitPrice)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-sm text-brand-charcoal-light line-through">
              {formatPrice(mrp)}
            </span>
            <span className="rounded-md bg-brand-gold-light px-2 py-0.5 text-xs font-bold text-brand-maroon">
              {discount}% OFF
            </span>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-brand-charcoal-light">(Inclusive of all taxes)</p>
    </div>
  );
}
