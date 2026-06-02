import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DYNAMIC_FIELD_LABELS } from '../../constants';

interface DynamicFieldsProps {
  fields: string[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export function DynamicFields({ fields, values, onChange }: DynamicFieldsProps) {
  const set = (key: string, val: string) => onChange({ ...values, [key]: val });
  const isDate = (key: string) => key.includes('date');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="overflow-hidden rounded-card border border-brand-ivory-dark bg-white p-6 shadow-card"
      >
        <h3 className="font-heading text-lg text-brand-maroon">Personalization Details</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field} className={isDate(field) ? 'sm:col-span-1' : ''}>
              <label className="text-sm font-medium text-brand-charcoal">
                {DYNAMIC_FIELD_LABELS[field] ?? field}
              </label>
              {isDate(field) ? (
                <DatePicker
                  selected={values[field] ? new Date(values[field]) : null}
                  onChange={(d: Date | null) => set(field, d ? d.toISOString().split('T')[0] : '')}
                  className="mt-1 w-full rounded-input border border-brand-ivory-dark p-2 text-sm"
                  placeholderText="Select date"
                  dateFormat="dd MMM yyyy"
                />
              ) : (
                <input
                  type="text"
                  value={values[field] ?? ''}
                  onChange={(e) => set(field, e.target.value)}
                  className="mt-1 w-full rounded-input border border-brand-ivory-dark p-2 text-sm focus:border-brand-maroon focus:outline-none focus:ring-2 focus:ring-brand-maroon/20"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
