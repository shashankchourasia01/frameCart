import { INSTRUCTION_CHIPS } from '../../constants';

interface SpecialInstructionsProps {
  value: string;
  onChange: (v: string) => void;
}

export function SpecialInstructions({ value, onChange }: SpecialInstructionsProps) {
  return (
    <div>
      <h3 className="font-heading text-lg text-brand-maroon">Special Instructions</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {INSTRUCTION_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChange(value ? `${value}. ${chip}` : chip)}
            className="rounded-full bg-brand-ivory-dark px-3 py-1 text-xs hover:bg-brand-maroon-light"
          >
            {chip}
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 500))}
        placeholder="Any special requests for your frame..."
        rows={4}
        className="mt-3 w-full rounded-input border border-brand-ivory-dark p-3 text-sm focus:border-brand-maroon focus:outline-none focus:ring-2 focus:ring-brand-maroon/20"
      />
      <p className="mt-1 text-right text-xs text-brand-charcoal-light">{value.length}/500</p>
    </div>
  );
}
