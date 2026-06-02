import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl text-brand-maroon">404</h1>
      <p className="mt-4 text-brand-charcoal-light">This page wandered off the frame.</p>
      <Link to="/" className="mt-8 rounded-btn bg-brand-maroon px-8 py-3 text-white">
        Back Home
      </Link>
    </div>
  );
}
