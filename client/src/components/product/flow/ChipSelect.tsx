import { cn } from '../../../lib/utils';

export interface ChipOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface ChipSelectProps {
  label: string;
  selectedLabel?: string;
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
}

export function ChipSelect({
  label,
  selectedLabel,
  options,
  value,
  onChange,
  columns = 3,
}: ChipSelectProps) {
  const gridClass =
    columns === 2
      ? 'grid-cols-2'
      : columns === 4
        ? 'grid-cols-2 sm:grid-cols-4'
        : 'grid-cols-2 sm:grid-cols-3';

  return (
    <section className="border-t border-brand-ivory-dark py-5">
      <p className="text-sm font-bold text-brand-charcoal">
        {label}
        {selectedLabel && (
          <span className="font-normal text-brand-charcoal-light">: {selectedLabel}</span>
        )}
      </p>
      <div className={cn('mt-3 grid gap-2.5', gridClass)}>
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'min-h-[44px] rounded-lg border-2 px-3 py-2.5 text-sm font-medium transition',
                active
                  ? 'border-brand-maroon bg-white text-brand-maroon shadow-sm'
                  : 'border-brand-ivory-dark bg-white text-brand-charcoal hover:border-brand-maroon/30'
              )}
            >
              {opt.label}
              {opt.sublabel && (
                <span className="mt-0.5 block text-[10px] font-normal text-brand-charcoal-light">
                  {opt.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
