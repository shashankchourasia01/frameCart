import { formatPrice } from '../../../lib/utils';

interface PrintoPriceSummaryProps {
  unitPrice: number;
  quantity: number;
  onQuantityChange: (q: number) => void;
}

export function PrintoPriceSummary({ unitPrice, quantity, onQuantityChange }: PrintoPriceSummaryProps) {
  const total = unitPrice * quantity;

  return (
    <div className="border-t border-neutral-200 pt-4">
      <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-3">
        <div>
          <span className="text-sm font-medium text-brand-charcoal">Quantity</span>
          <p className="mt-1 text-[11px] leading-relaxed text-brand-charcoal-light">
            Choose 1–10 for instant ordering. For bulk orders, contact us on WhatsApp.
          </p>
        </div>
        <input
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) => onQuantityChange(Math.min(10, Math.max(1, Number(e.target.value) || 1)))}
          className="w-20 rounded border border-neutral-300 px-2 py-2 text-center text-sm font-semibold"
        />
      </div>

      <div className="space-y-2 py-3 text-sm">
        <div className="flex justify-between text-brand-charcoal-light">
          <span>Per piece</span>
          <span className="font-medium text-brand-charcoal">{formatPrice(unitPrice)}</span>
        </div>
        <div className="flex justify-between text-brand-charcoal-light">
          <span>Quantity</span>
          <span className="font-medium text-brand-charcoal">{quantity}</span>
        </div>
        <div className="flex justify-between border-t border-neutral-100 pt-3">
          <span className="font-bold text-brand-charcoal">Total</span>
          <span className="text-lg font-bold text-orange-600">{formatPrice(total)}</span>
        </div>
      </div>

      <button type="button" className="text-sm font-medium text-violet-700 hover:underline">
        Buy in bulk and save → WhatsApp
      </button>
    </div>
  );
}
