import { Link } from 'react-router-dom';
import { HiArrowRight } from '../icons';

/** Home: no category circles — directs users to /shop */
export function HomeShopBanner() {
  return (
    <section className="border-y border-brand-ivory-dark/80 bg-white px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-brand-charcoal">Browse all occasions</p>
          <p className="mt-0.5 text-xs text-brand-charcoal-light">
            9 categories · 50+ frame designs — tap a circle on the shop page
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-brand-maroon px-5 py-2.5 text-sm font-semibold text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
        >
          Open Shop
          <HiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
