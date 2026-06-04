import { HiArrowUpTray } from '../../icons';

interface PrintoUploadButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function PrintoUploadButton({
  onClick,
  disabled,
  label = 'Upload your Files',
}: PrintoUploadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-violet-700 py-4 text-base font-semibold text-white shadow-md transition hover:bg-violet-800 disabled:opacity-50"
    >
      <HiArrowUpTray className="h-5 w-5" />
      {label}
    </button>
  );
}
