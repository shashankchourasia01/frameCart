import { StarRating } from '../shared/StarRating';
import { AppIcon, HiTruck } from '../icons';

export function HomeTrustSection() {
  return (
    <section className="border-t border-brand-ivory-dark bg-brand-ivory/50 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 sm:gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <span className="font-display text-2xl font-bold text-blue-600">G</span>
          </div>
          <div className="mt-3">
            <StarRating rating={4.5} size="sm" />
          </div>
          <p className="mt-2 text-sm font-bold text-brand-charcoal">Customer Reviews</p>
          <p className="mt-1 text-xs text-brand-charcoal-light">4.5 average rating</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-700">
            <AppIcon icon={HiTruck} size="lg" />
          </div>
          <p className="mt-3 text-sm font-bold text-brand-charcoal">Nationwide Delivery</p>
          <p className="mt-1 text-xs leading-relaxed text-brand-charcoal-light">
            Delivery across India — confirm timeline on WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
