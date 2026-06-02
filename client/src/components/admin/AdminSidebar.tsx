import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

const items = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Orders', icon: '📦' },
  { to: '/admin/products', label: 'Products', icon: '🖼️' },
  { to: '/admin/categories', label: 'Categories', icon: '📁' },
  { to: '/admin/offers', label: 'Offers', icon: '🎁' },
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 bg-[#1A1A1A] text-white lg:block">
      <div className="border-b border-white/10 p-6 font-display text-xl">FrameCraft Admin</div>
      <nav className="p-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition',
                isActive
                  ? 'border-l-4 border-brand-maroon bg-white/10'
                  : 'hover:bg-white/5'
              )
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
