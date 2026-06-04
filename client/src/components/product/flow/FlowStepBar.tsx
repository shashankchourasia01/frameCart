interface FlowStepBarProps {
  step: 1 | 2 | 3;
  percent: number;
}

const labels = ['Choose frame', 'Upload photos', 'Review & order'];

export function FlowStepBar({ step, percent }: FlowStepBarProps) {
  return (
    <div className="border-b border-brand-ivory-dark bg-white px-4 py-3">
      <div className="mx-auto flex max-w-lg items-center justify-between text-xs font-medium text-brand-charcoal-light">
        {labels.map((label, i) => (
          <span
            key={label}
            className={i + 1 === step ? 'text-brand-maroon' : i + 1 < step ? 'text-brand-charcoal' : ''}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>
      <div className="mx-auto mt-2 h-1.5 max-w-lg overflow-hidden rounded-full bg-brand-ivory-dark">
        <div
          className="h-full rounded-full bg-brand-maroon transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
