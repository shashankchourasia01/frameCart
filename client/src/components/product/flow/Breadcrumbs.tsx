import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-brand-charcoal-light" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`}>
          {i > 0 && <span className="mx-1.5 text-brand-charcoal-light/60">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-maroon">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-brand-charcoal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
