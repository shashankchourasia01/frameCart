import { useState } from 'react';
import toast from 'react-hot-toast';

export function DeliveryPincode() {
  const [pin, setPin] = useState('');

  const check = () => {
    const cleaned = pin.replace(/\D/g, '');
    if (cleaned.length !== 6) {
      toast.error('Enter a valid 6-digit pincode');
      return;
    }
    toast.success('Delivery estimate shared on WhatsApp after you place your order.');
  };

  return (
    <section className="border-t border-neutral-200 py-5">
      <h2 className="text-base font-bold text-brand-charcoal">Estimate Delivery</h2>
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="flex-1 rounded border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500"
        />
        <button
          type="button"
          onClick={check}
          className="shrink-0 rounded border border-violet-700 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50"
        >
          Check
        </button>
      </div>
    </section>
  );
}
