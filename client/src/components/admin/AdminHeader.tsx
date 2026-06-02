import { useAdminAuth } from '../../hooks/useAdminAuth';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { logout, userEmail } = useAdminAuth();
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-semibold text-brand-charcoal">{title}</h1>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-brand-charcoal-light">{userEmail}</span>
        <button
          type="button"
          onClick={() => void logout()}
          className="rounded-lg border px-3 py-1 hover:bg-brand-ivory"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
