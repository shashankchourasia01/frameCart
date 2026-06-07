import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn, slugify } from '../../lib/utils';
import {
  emptyProductForm,
  productToForm,
  formToPayload,
  validateForm,
  FINISH_OPTIONS,
  ORIENTATION_OPTIONS,
  type ProductFormState,
} from '../../lib/productForm';
import { useCategories } from '../../hooks/useCategories';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useAdminProducts';
import type { Product } from '../../types';
import { PRODUCT_BADGE_OPTIONS } from '../../constants/productBadges';
import { CloseIcon } from '../icons';

interface ProductFormModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-brand-charcoal">
      {children}
      {hint ? <span className="mt-0.5 block text-xs font-normal text-brand-charcoal-light">{hint}</span> : null}
    </label>
  );
}

function inputClass(extra?: string) {
  return cn(
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition',
    'focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20',
    extra
  );
}

export function ProductFormModal({ open, product, onClose }: ProductFormModalProps) {
  const isEdit = Boolean(product);
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const [form, setForm] = useState<ProductFormState>(emptyProductForm);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (product) {
      setForm(productToForm(product));
      setSlugManual(true);
    } else {
      setForm(emptyProductForm());
      setSlugManual(false);
    }
  }, [open, product]);

  const set = <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugManual ? prev.slug : slugify(name),
    }));
  };

  const addSize = () => {
    setForm((prev) => ({
      ...prev,
      available_sizes: [...prev.available_sizes, { label: '', inches: '', price_add: 0 }],
    }));
  };

  const updateSize = (index: number, patch: Partial<ProductFormState['available_sizes'][0]>) => {
    setForm((prev) => ({
      ...prev,
      available_sizes: prev.available_sizes.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  };

  const removeSize = (index: number) => {
    setForm((prev) => ({
      ...prev,
      available_sizes: prev.available_sizes.filter((_, i) => i !== index),
    }));
  };

  const addDesign = () => {
    setForm((prev) => ({
      ...prev,
      available_designs: [
        ...prev.available_designs,
        { id: `d${prev.available_designs.length + 1}`, name: '' },
      ],
    }));
  };

  const updateDesign = (index: number, patch: Partial<ProductFormState['available_designs'][0]>) => {
    setForm((prev) => ({
      ...prev,
      available_designs: prev.available_designs.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    }));
  };

  const removeDesign = (index: number) => {
    setForm((prev) => ({
      ...prev,
      available_designs: prev.available_designs.filter((_, i) => i !== index),
    }));
  };

  const toggleArrayItem = (key: 'print_finishes' | 'orientations', item: string) => {
    setForm((prev) => {
      const arr = prev[key];
      const next = arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
      return { ...prev, [key]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateForm(form);
    if (err) {
      toast.error(err);
      return;
    }
    const payload = formToPayload(form);
    try {
      if (isEdit && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          body: payload,
          previousSlug: product.slug,
        });
        toast.success('Product updated — storefront reflects changes immediately');
      } else {
        await createProduct.mutateAsync(payload);
        toast.success('Product created');
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Save failed');
    }
  };

  const saving = createProduct.isPending || updateProduct.isPending;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold text-brand-charcoal">
                  {isEdit ? 'Edit frame' : 'Add new frame'}
                </h2>
                <p className="text-xs text-brand-charcoal-light">
                  Changes sync to the live store right after you save
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-brand-charcoal-light hover:bg-gray-100"
                aria-label="Close"
              >
                <CloseIcon size="md" />
              </button>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4 sm:px-6">
                <section className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                    Basic info
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FieldLabel>Product name</FieldLabel>
                      <input
                        className={inputClass('mt-1')}
                        value={form.name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="Love Story Frame"
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel hint="Used in URL: /product/your-slug">URL slug</FieldLabel>
                      <input
                        className={inputClass('mt-1 font-mono text-xs')}
                        value={form.slug}
                        onChange={(e) => {
                          setSlugManual(true);
                          set('slug', slugify(e.target.value));
                        }}
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel>Category</FieldLabel>
                      <select
                        className={inputClass('mt-1')}
                        value={form.category_id}
                        onChange={(e) => set('category_id', e.target.value)}
                        required
                      >
                        <option value="">Select category</option>
                        {(categories ?? []).map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Tagline</FieldLabel>
                      <input
                        className={inputClass('mt-1')}
                        value={form.tagline}
                        onChange={(e) => set('tagline', e.target.value)}
                        placeholder="Short line shown on product card"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Description</FieldLabel>
                      <textarea
                        className={inputClass('mt-1 min-h-[80px]')}
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>Material / specs</FieldLabel>
                      <input
                        className={inputClass('mt-1')}
                        value={form.material_info}
                        onChange={(e) => set('material_info', e.target.value)}
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                    Pricing & availability
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <FieldLabel>Base price (₹)</FieldLabel>
                      <input
                        type="number"
                        min={1}
                        className={inputClass('mt-1')}
                        value={form.base_price}
                        onChange={(e) => set('base_price', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <FieldLabel>Sort order</FieldLabel>
                      <input
                        type="number"
                        className={inputClass('mt-1')}
                        value={form.sort_order}
                        onChange={(e) => set('sort_order', e.target.value)}
                      />
                    </div>
                    <div>
                      <FieldLabel>Max photos</FieldLabel>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        className={inputClass('mt-1')}
                        value={form.max_photos}
                        onChange={(e) => set('max_photos', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.is_active}
                        onChange={(e) => set('is_active', e.target.checked)}
                      />
                      <span>Available on store</span>
                    </label>
                    <div className="min-w-[220px] flex-1">
                      <FieldLabel hint="Shown on product cards across the website">
                        Store badge
                      </FieldLabel>
                      <select
                        className={inputClass('mt-1')}
                        value={form.badge}
                        onChange={(e) => set('badge', e.target.value as ProductFormState['badge'])}
                      >
                        <option value="">No badge</option>
                        {PRODUCT_BADGE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                      Sizes
                    </h3>
                    <button type="button" onClick={addSize} className="text-xs font-medium text-brand-maroon">
                      + Add size
                    </button>
                  </div>
                  {form.available_sizes.map((size, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2 rounded-lg border bg-gray-50/80 p-3 sm:grid-cols-4">
                      <input
                        placeholder="Label"
                        className={inputClass()}
                        value={size.label}
                        onChange={(e) => updateSize(i, { label: e.target.value })}
                      />
                      <input
                        placeholder="e.g. 8x10"
                        className={inputClass()}
                        value={size.inches}
                        onChange={(e) => updateSize(i, { inches: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Price add ₹"
                        className={inputClass()}
                        value={size.price_add}
                        onChange={(e) => updateSize(i, { price_add: Number(e.target.value) })}
                      />
                      <button
                        type="button"
                        onClick={() => removeSize(i)}
                        disabled={form.available_sizes.length <= 1}
                        className="rounded-lg border border-red-200 px-2 py-2 text-xs text-red-600 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                      Designs
                    </h3>
                    <button type="button" onClick={addDesign} className="text-xs font-medium text-brand-maroon">
                      + Add design
                    </button>
                  </div>
                  {form.available_designs.map((design, i) => (
                    <div key={i} className="space-y-2 rounded-lg border bg-gray-50/80 p-3">
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          placeholder="Design name"
                          className={inputClass()}
                          value={design.name}
                          onChange={(e) => updateDesign(i, { name: e.target.value })}
                        />
                        <input
                          placeholder="Design ID"
                          className={inputClass('font-mono text-xs')}
                          value={design.id}
                          onChange={(e) => updateDesign(i, { id: e.target.value })}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDesign(i)}
                        className="text-xs text-red-600"
                      >
                        Remove design
                      </button>
                    </div>
                  ))}
                </section>

                <section className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                    Customer options
                  </h3>
                  <div>
                    <FieldLabel>Print finishes</FieldLabel>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {FINISH_OPTIONS.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleArrayItem('print_finishes', f)}
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium transition',
                            form.print_finishes.includes(f)
                              ? 'bg-brand-maroon text-white'
                              : 'border bg-white'
                          )}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Orientations</FieldLabel>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {ORIENTATION_OPTIONS.map((o) => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => toggleArrayItem('orientations', o)}
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium transition',
                            form.orientations.includes(o)
                              ? 'bg-brand-maroon text-white'
                              : 'border bg-white'
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.requires_dynamic_fields}
                      onChange={(e) => set('requires_dynamic_fields', e.target.checked)}
                    />
                    Requires personalization fields (names, dates, etc.)
                  </label>
                  {form.requires_dynamic_fields ? (
                    <div>
                      <FieldLabel hint="Comma-separated — shown on configure page">
                        Personalization fields
                      </FieldLabel>
                      <input
                        className={inputClass('mt-1')}
                        value={form.dynamic_fields_text}
                        onChange={(e) => set('dynamic_fields_text', e.target.value)}
                        placeholder="boy_name, girl_name, wedding_date"
                      />
                    </div>
                  ) : null}
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-maroon">
                      Images
                    </h3>
                    <button
                      type="button"
                      onClick={() => set('images', [...form.images, ''])}
                      className="text-xs font-medium text-brand-maroon"
                    >
                      + Add image URL
                    </button>
                  </div>
                  {form.images.map((url, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass()}
                        value={url}
                        onChange={(e) => {
                          const next = [...form.images];
                          next[i] = e.target.value;
                          set('images', next);
                        }}
                        placeholder="https://..."
                      />
                      <button
                        type="button"
                        onClick={() => set('images', form.images.filter((_, j) => j !== i))}
                        className="shrink-0 rounded-lg border px-2 text-xs text-red-600"
                      >
                        <CloseIcon size="xs" className="text-red-600" />
                      </button>
                    </div>
                  ))}
                </section>

                <section className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Review count</FieldLabel>
                    <input
                      type="number"
                      min={0}
                      className={inputClass('mt-1')}
                      value={form.review_count}
                      onChange={(e) => set('review_count', e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel>Average rating (0–5)</FieldLabel>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      step={0.1}
                      className={inputClass('mt-1')}
                      value={form.avg_rating}
                      onChange={(e) => set('avg_rating', e.target.value)}
                    />
                  </div>
                </section>
              </div>

              <div className="flex shrink-0 gap-3 border-t bg-gray-50 px-4 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium sm:flex-none sm:px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-brand-maroon px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 sm:flex-none sm:px-8"
                >
                  {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
