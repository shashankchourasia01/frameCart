interface PrintoOptionRowProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

/** Printo-style label + dropdown row */
export function PrintoOptionRow({ label, value, onChange, options }: PrintoOptionRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 py-3.5">
      <span className="shrink-0 text-sm font-medium text-brand-charcoal">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-[55%] rounded border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-brand-charcoal outline-none focus:border-violet-500"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
