import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/utils';

export function CartSummary() {
  const itemCount = useCartStore((s) => s.totalItems());
  const amount = useCartStore((s) => s.totalPrice());
  return (
    <div className="flex justify-between text-sm">
      <span>{itemCount} item(s)</span>
      <span className="text-lg font-bold text-brand-maroon">{formatPrice(amount)}</span>
    </div>
  );
}
