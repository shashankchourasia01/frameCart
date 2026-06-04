import { useOutletContext } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { MenuIcon } from '../icons';

export interface AdminLayoutContext {
  openMobileNav: () => void;
}

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ title, subtitle, onMenuClick }: AdminHeaderProps) {
  const { logout, userEmail } = useAdminAuth();
  const layout = useOutletContext<AdminLayoutContext | null>();
  const openMenu = onMenuClick ?? layout?.openMobileNav;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b bg-white px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex min-w-0 items-center gap-3">
        {openMenu ? (
          <button
            type="button"
            onClick={openMenu}
            className="rounded-lg border p-2 lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon size="md" />
          </button>
        ) : null}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-brand-charcoal sm:text-xl">{title}</h1>
          {subtitle ? (
            <p className="truncate text-xs text-brand-charcoal-light">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-sm sm:gap-4">
        <span className="hidden max-w-[140px] truncate text-brand-charcoal-light sm:inline">
          {userEmail}
        </span>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-lg border px-3 py-1.5 text-xs hover:bg-brand-ivory sm:text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
