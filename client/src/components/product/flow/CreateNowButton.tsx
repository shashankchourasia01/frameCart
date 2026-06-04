interface CreateNowButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

export function CreateNowButton({
  onClick,
  label = 'CREATE NOW',
  disabled,
}: CreateNowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-lg bg-brand-maroon py-4 text-center text-sm font-bold tracking-wide text-white shadow-md transition hover:bg-brand-maroon-dark disabled:opacity-50"
    >
      {label}
    </button>
  );
}
