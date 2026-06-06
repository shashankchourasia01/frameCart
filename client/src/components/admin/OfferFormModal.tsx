import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn, formatPrice } from '../../lib/utils';
import { useCreateOffer, useUpdateOffer } from '../../hooks/useAdminOffers';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import type { Offer } from '../../types';
import { CloseIcon } from '../icons';

interface OfferFormModalProps {
  open: boolean;
  offer: Offer | null;
  onClose: () => void;
}

type FormState = {
  title: string;
  description: string;
  coupon_code: string;
  discount_type: 'percentage' | 'flat';
  discount_value: number;
  min_order_value: number;
  max_uses: string;
  applicable_to: string;
  valid_from: string;
  valid_till: string;
  is_featured: boolean;
  is_active: boolean;
  banner_image_url: string;
};

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromLocalInput(value: string) {
  return new Date(value).toISOString();
}

function emptyForm(): FormState {
  const now = new Date();
  const till = new Date(now.getTime() + 30 * 86400000);
  return {
    title: '',
    description: '',
    coupon_code: '',
    discount_type: 'percentage',
    discount_value: 10,
    min_order_value: 0,
    max_uses: '',
    applicable_to: 'all',
    valid_from: toLocalInput(now.toISOString()),
    valid_till: toLocalInput(till.toISOString()),
    is_featured: false,
    is_active: true,
    banner_image_url: '',
  };
}

function offerToForm(offer: Offer): FormState {
  return {
    title: offer.title,
    description: offer.description ?? '',
    coupon_code: offer.coupon_code ?? '',
    discount_type: offer.discount_type,
    discount_value: Number(offer.discount_value),
    min_order_value: Number(offer.min_order_value),
    max_uses: offer.max_uses != null ? String(offer.max_uses) : '',
    applicable_to: offer.applicable_to,
    valid_from: toLocalInput(offer.valid_from),
    valid_till: toLocalInput(offer.valid_till),
    is_featured: offer.is_featured,
    is_active: offer.is_active,
    banner_image_url: offer.banner_image_url ?? '',
  };
}

function inputClass(extra?: string) {
  return cn(
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition',
    'focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20',
    extra
  );
}

export function OfferFormModal({ open, offer, onClose }: OfferFormModalProps) {
  const isEdit = Boolean(offer);
  const createOffer = useCreateOffer();
  const updateOffer = useUpdateOffer();
  const { data: categories } = useAdminCategories();
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!open) return;
    setForm(offer ? offerToForm(offer) : emptyForm());
  }, [open, offer]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const previewDiscount =
    form.discount_type === 'percentage'
      ? `${form.discount_value}% off`
      : `${formatPrice(form.discount_value)} off`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Offer title is required');
      return;
    }
    if (form.discount_type === 'percentage' && form.discount_value > 100) {
      toast.error('Percentage cannot exceed 100');
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      coupon_code: form.coupon_code.trim().toUpperCase() || null,
      discount_type: form.discount_type,
      discount_value: form.discount_value,
      min_order_value: form.min_order_value,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      applicable_to: form.applicable_to,
      valid_from: fromLocalInput(form.valid_from),
      valid_till: fromLocalInput(form.valid_till),
      is_featured: form.is_featured,
      is_active: form.is_active,
      banner_image_url: form.banner_image_url.trim() || null,
    };

    try {
      if (isEdit && offer) {
        await updateOffer.mutateAsync({ id: offer.id, body: payload });
        toast.success('Offer updated');
      } else {
        await createOffer.mutateAsync(payload);
        toast.success('Offer created');
      }
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const saving = createOffer.isPending || updateOffer.isPending;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="font-heading text-lg font-semibold text-brand-charcoal">
                  {isEdit ? 'Edit offer' : 'Add offer'}
                </h2>
                <p className="text-xs text-brand-charcoal-light">Preview: {previewDiscount}</p>
              </div>
              <button type="button" onClick={onClose} className="rounded p-1 hover:bg-neutral-100">
                <CloseIcon size="sm" />
              </button>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 p-5">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  className={inputClass('mt-1')}
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Festival Sale"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className={inputClass('mt-1 min-h-[72px]')}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="What the customer gets"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Offer type</label>
                  <select
                    className={inputClass('mt-1')}
                    value={form.discount_type}
                    onChange={(e) =>
                      set('discount_type', e.target.value as 'percentage' | 'flat')
                    }
                  >
                    <option value="percentage">Percentage off (%)</option>
                    <option value="flat">Flat amount off (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    {form.discount_type === 'percentage' ? 'Discount %' : 'Discount amount (₹)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={form.discount_type === 'percentage' ? 100 : undefined}
                    className={inputClass('mt-1')}
                    value={form.discount_value}
                    onChange={(e) => set('discount_value', Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Coupon code</label>
                  <input
                    className={inputClass('mt-1 font-mono uppercase')}
                    value={form.coupon_code}
                    onChange={(e) => set('coupon_code', e.target.value.toUpperCase())}
                    placeholder="FESTIVE15"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Min order value (₹)</label>
                  <input
                    type="number"
                    min={0}
                    className={inputClass('mt-1')}
                    value={form.min_order_value}
                    onChange={(e) => set('min_order_value', Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Applies to</label>
                  <select
                    className={inputClass('mt-1')}
                    value={form.applicable_to}
                    onChange={(e) => set('applicable_to', e.target.value)}
                  >
                    <option value="all">All categories</option>
                    {(categories ?? [])
                      .filter((c) => c.is_active)
                      .map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name} only
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Max uses (optional)</label>
                  <input
                    type="number"
                    min={1}
                    className={inputClass('mt-1')}
                    value={form.max_uses}
                    onChange={(e) => set('max_uses', e.target.value)}
                    placeholder="Unlimited"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Valid from</label>
                  <input
                    type="datetime-local"
                    className={inputClass('mt-1')}
                    value={form.valid_from}
                    onChange={(e) => set('valid_from', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Valid till</label>
                  <input
                    type="datetime-local"
                    className={inputClass('mt-1')}
                    value={form.valid_till}
                    onChange={(e) => set('valid_till', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Banner image URL (optional)</label>
                <input
                  className={inputClass('mt-1')}
                  value={form.banner_image_url}
                  onChange={(e) => set('banner_image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => set('is_active', e.target.checked)}
                    className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                  />
                  Active on website
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.is_featured}
                    onChange={(e) => set('is_featured', e.target.checked)}
                    className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                  />
                  Featured (home banner + top strip)
                </label>
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-brand-charcoal-light hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-brand-maroon px-5 py-2 text-sm font-semibold text-white hover:bg-brand-maroon-dark disabled:opacity-50"
                >
                  {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create offer'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
