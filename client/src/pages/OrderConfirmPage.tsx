import { Link, useSearchParams } from 'react-router-dom';
import { CheckIcon, WhatsAppIcon } from '../components/icons';

export function OrderConfirmPage() {
  const [params] = useSearchParams();
  const orderNumber = params.get('order');

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-success/15 text-brand-success">
        <CheckIcon size="xl" className="h-8 w-8" />
      </span>
      <h1 className="mt-4 font-display text-3xl text-brand-maroon">Order placed!</h1>
      {orderNumber && orderNumber !== 'pending' && (
        <p className="mt-2 font-mono text-sm text-brand-charcoal">Order #{orderNumber}</p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-brand-charcoal-light">
        Your order details and delivery address were sent to FrameCraft on WhatsApp.
        We&apos;ll confirm your design and delivery timeline shortly.
      </p>
      <p className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs text-brand-whatsapp">
        <WhatsAppIcon size="sm" />
        Check WhatsApp to complete the conversation
      </p>
      <Link to="/" className="mt-8 inline-block rounded-btn bg-brand-maroon px-8 py-3 text-white">
        Continue Shopping
      </Link>
    </div>
  );
}
