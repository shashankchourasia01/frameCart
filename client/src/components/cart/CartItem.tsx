import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../lib/utils';
import { getProductImage } from '../../constants/images';
import { CloseIcon, HiMinus, HiPlus } from '../icons';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();
  const thumb = item.photoUrls[0] ?? getProductImage(item.product.slug, item.product.images);

  return (
    <div className="mb-4 flex gap-3 border-b border-brand-ivory-dark pb-4">
      <img src={thumb} alt="" className="h-16 w-16 rounded-lg object-cover shadow-sm" />
      <div className="flex-1">
        <p className="text-sm font-semibold">{item.product.name}</p>
        <p className="text-xs text-brand-charcoal-light">
          {item.selectedSize} · {item.selectedFinish}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-brand-ivory px-2 py-1">
            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
              <HiMinus className="h-4 w-4" />
            </button>
            <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
              <HiPlus className="h-4 w-4" />
            </button>
          </div>
          <span className="font-bold text-brand-maroon">
            {formatPrice(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="text-brand-charcoal-light hover:text-brand-maroon"
      >
        <CloseIcon size="sm" />
      </button>
    </div>
  );
}
