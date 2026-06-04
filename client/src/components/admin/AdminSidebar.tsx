import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { AppIcon, ADMIN_NAV_ICONS, CloseIcon, type AdminNavIconKey } from '../icons';

const items: { to: string; label: string; icon: AdminNavIconKey; end?: boolean }[] = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/orders', label: 'Orders', icon: 'orders' },
  { to: '/admin/products', label: 'Products', icon: 'products' },
  { to: '/admin/categories', label: 'Categories', icon: 'categories' },
  { to: '/admin/offers', label: 'Offers', icon: 'offers' },
];

interface AdminSidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
}

export function AdminSidebar({ mobile, onNavigate, onClose }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col border-neutral-200 bg-white text-brand-charcoal',
        mobile
          ? 'h-full w-full max-w-full border-r shadow-sm'
          : 'fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r shadow-sm lg:flex'
      )}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold text-brand-maroon">FrameCraft</p>
          <p className="text-[11px] font-medium text-brand-charcoal-light">Admin panel</p>
        </div>
        {mobile && onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-neutral-200 p-2 hover:bg-neutral-50"
            aria-label="Close menu"
          >
            <CloseIcon size="md" />
          </button>
        ) : null}
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto overflow-x-hidden p-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex w-full max-w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-maroon-light text-brand-maroon ring-1 ring-inset ring-brand-maroon/20'
                  : 'text-brand-charcoal hover:bg-neutral-50'
              )
            }
          >
            <AppIcon icon={ADMIN_NAV_ICONS[item.icon]} size="md" className="shrink-0 text-brand-maroon" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <p className="shrink-0 border-t border-neutral-200 p-3 text-[10px] leading-relaxed text-brand-charcoal-light">
        Changes sync to the storefront after you save.
      </p>
    </aside>
  );
}
