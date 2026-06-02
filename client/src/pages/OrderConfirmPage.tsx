import { Link, useSearchParams } from 'react-router-dom';

export function OrderConfirmPage() {
  const [params] = useSearchParams();
  const orderNumber = params.get('order');

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <span className="text-5xl">✓</span>
      <h1 className="mt-4 font-display text-3xl text-brand-maroon">Thank You!</h1>
      {orderNumber && (
        <p className="mt-2 text-brand-charcoal-light">Order #{orderNumber}</p>
      )}
      <p className="mt-4 text-sm">
        We&apos;ll confirm your design on WhatsApp shortly.
      </p>
      <Link to="/" className="mt-8 inline-block rounded-btn bg-brand-maroon px-8 py-3 text-white">
        Continue Shopping
      </Link>
    </div>
  );
}
