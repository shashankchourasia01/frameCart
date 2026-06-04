import { HiEnvelope, HiMapPin, HiPhone, HiUser } from 'react-icons/hi2';
import type { CustomerDetailsInput } from '../../lib/customerDetails';
import { cn } from '../../lib/utils';

interface CustomerDetailsFormProps {
  value: CustomerDetailsInput;
  onChange: (patch: Partial<CustomerDetailsInput>) => void;
  errors?: Partial<Record<keyof CustomerDetailsInput, string>>;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-brand-charcoal">
      {children}
      {required ? <span className="text-brand-maroon"> *</span> : null}
    </label>
  );
}

function inputClass(hasError?: boolean) {
  return cn(
    'mt-1 w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition',
    'focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/15',
    hasError ? 'border-brand-error' : 'border-brand-ivory-dark'
  );
}

export function CustomerDetailsForm({ value, onChange, errors }: CustomerDetailsFormProps) {
  const set = (key: keyof CustomerDetailsInput, v: string) => onChange({ [key]: v });

  return (
    <section className="rounded-xl border border-brand-ivory-dark bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-maroon/10 text-brand-maroon">
          <HiMapPin className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-heading text-base font-semibold text-brand-charcoal">
            Delivery & contact details
          </h2>
          <p className="mt-0.5 text-xs text-brand-charcoal-light">
            We&apos;ll send your order summary to WhatsApp and deliver to this address
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <FieldLabel required>Full name</FieldLabel>
          <div className="relative">
            <HiUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal-light" />
            <input
              className={cn(inputClass(!!errors?.customerName), 'pl-9')}
              value={value.customerName}
              onChange={(e) => set('customerName', e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>
          {errors?.customerName ? (
            <p className="mt-1 text-xs text-brand-error">{errors.customerName}</p>
          ) : null}
        </div>

        <div>
          <FieldLabel required>WhatsApp / mobile</FieldLabel>
          <div className="relative">
            <HiPhone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal-light" />
            <input
              type="tel"
              className={cn(inputClass(!!errors?.customerPhone), 'pl-9')}
              value={value.customerPhone}
              onChange={(e) => set('customerPhone', e.target.value)}
              placeholder="10-digit mobile number"
              autoComplete="tel"
            />
          </div>
          {errors?.customerPhone ? (
            <p className="mt-1 text-xs text-brand-error">{errors.customerPhone}</p>
          ) : null}
        </div>

        <div>
          <FieldLabel>Email (optional)</FieldLabel>
          <div className="relative">
            <HiEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal-light" />
            <input
              type="email"
              className={cn(inputClass(!!errors?.customerEmail), 'pl-9')}
              value={value.customerEmail ?? ''}
              onChange={(e) => set('customerEmail', e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          {errors?.customerEmail ? (
            <p className="mt-1 text-xs text-brand-error">{errors.customerEmail}</p>
          ) : null}
        </div>

        <div>
          <FieldLabel required>Street address / locality</FieldLabel>
          <textarea
            className={cn(inputClass(!!errors?.customerAddress), 'min-h-[72px] resize-y')}
            value={value.customerAddress}
            onChange={(e) => set('customerAddress', e.target.value)}
            placeholder="House no., street, landmark"
            autoComplete="street-address"
            rows={2}
          />
          {errors?.customerAddress ? (
            <p className="mt-1 text-xs text-brand-error">{errors.customerAddress}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel required>City</FieldLabel>
            <input
              className={inputClass(!!errors?.customerCity)}
              value={value.customerCity}
              onChange={(e) => set('customerCity', e.target.value)}
              placeholder="City"
              autoComplete="address-level2"
            />
            {errors?.customerCity ? (
              <p className="mt-1 text-xs text-brand-error">{errors.customerCity}</p>
            ) : null}
          </div>
          <div>
            <FieldLabel required>State</FieldLabel>
            <input
              className={inputClass(!!errors?.customerState)}
              value={value.customerState}
              onChange={(e) => set('customerState', e.target.value)}
              placeholder="State"
              autoComplete="address-level1"
            />
            {errors?.customerState ? (
              <p className="mt-1 text-xs text-brand-error">{errors.customerState}</p>
            ) : null}
          </div>
        </div>

        <div className="sm:max-w-[200px]">
          <FieldLabel required>PIN code</FieldLabel>
          <input
            className={inputClass(!!errors?.customerPincode)}
            value={value.customerPincode}
            onChange={(e) => set('customerPincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="6-digit PIN"
            inputMode="numeric"
            autoComplete="postal-code"
          />
          {errors?.customerPincode ? (
            <p className="mt-1 text-xs text-brand-error">{errors.customerPincode}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
