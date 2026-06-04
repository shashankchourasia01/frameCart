import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const items = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/products', label: 'Products', icon: '🖼️' },
  { to: '/admin/categories', label: 'Categories', icon: '📁' },
  { to: '/admin/offers', label: 'Offers', icon: '🎁' },
];

interface AdminSidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function AdminSidebar({ mobile, onNavigate }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        'flex w-full flex-col bg-[#1A1A1A] text-white',
        mobile ? 'h-full' : 'hidden w-60 shrink-0 lg:flex lg:min-h-screen'
      )}
    >
      <div className="border-b border-white/10 p-5 font-display text-lg sm:p-6 sm:text-xl">
        FrameCraft Admin
      </div>
      <nav className="flex-1 space-y-1 p-3 sm:p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition',
                isActive
                  ? 'border-l-4 border-brand-maroon bg-white/10 font-medium'
                  : 'hover:bg-white/5'
              )
            }
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <p className="border-t border-white/10 p-4 text-xs text-white/40">
        Store updates sync instantly after you save
      </p>
    </aside>
  );
}
