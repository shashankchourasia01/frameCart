import { Link } from 'react-router-dom';
import { HiChevronRight } from '../icons';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs text-brand-charcoal-light ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <HiChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" aria-hidden />}
              {item.to && !last ? (
                <Link to={item.to} className="font-medium text-brand-maroon hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'font-semibold text-brand-charcoal' : 'font-medium'}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
