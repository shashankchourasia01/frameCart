import { Link } from 'react-router-dom';
import { HiArrowRight } from '../icons';

/** Home: directs users to /shop — placed above the featured offer card */
export function HomeShopBanner() {
  return (
    <section className="border-t border-brand-ivory-dark/80 bg-brand-ivory/40 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-charcoal">
            Browse all collections
          </p>
          <p className="mt-0.5 text-xs text-brand-charcoal-light">
            9 categories · 50+ frame designs — pick any occasion on the shop page
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-brand-maroon px-5 py-2.5 text-sm font-semibold text-brand-maroon transition hover:bg-brand-maroon hover:text-white"
        >
          Open Now
          <HiArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
