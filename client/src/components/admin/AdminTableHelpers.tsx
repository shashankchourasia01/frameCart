import { cn } from '../../lib/utils';

export function StatusBadge({ active, label }: { active: boolean; label?: { on: string; off: string } }) {
  const on = label?.on ?? 'Live';
  const off = label?.off ?? 'Hidden';
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-emerald-500' : 'bg-gray-400')} />
      {active ? on : off}
    </span>
  );
}

export function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-xs font-semibold transition',
        active ? 'bg-brand-maroon text-white' : 'bg-neutral-100 text-brand-charcoal-light hover:bg-neutral-200'
      )}
    >
      {children}
    </button>
  );
}

export function ActionBtn({
  children,
  onClick,
  variant = 'default',
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg px-2.5 py-1.5 text-xs font-medium transition',
        variant === 'danger'
          ? 'text-red-600 hover:bg-red-50'
          : 'text-brand-maroon hover:bg-brand-maroon/5'
      )}
    >
      {children}
    </button>
  );
}

export function ActionRow({
  onEdit,
  onToggle,
  onDelete,
  active,
  toggleLabel,
  className,
}: {
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
  active: boolean;
  toggleLabel?: { on: string; off: string };
  className?: string;
}) {
  const hide = toggleLabel?.on ?? 'Hide';
  const show = toggleLabel?.off ?? 'Publish';
  return (
    <div className={cn('flex flex-wrap justify-end gap-1', className)}>
      <ActionBtn onClick={onEdit}>Edit</ActionBtn>
      <ActionBtn onClick={onToggle}>{active ? hide : show}</ActionBtn>
      <ActionBtn variant="danger" onClick={onDelete}>
        Delete
      </ActionBtn>
    </div>
  );
}
