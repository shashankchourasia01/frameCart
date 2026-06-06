import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { cn, slugify } from '../../lib/utils';
import { useCreateCategory, useUpdateCategory } from '../../hooks/useAdminCategories';
import type { Category } from '../../types';
import { CloseIcon } from '../icons';

interface CategoryFormModalProps {
  open: boolean;
  category: Category | null;
  onClose: () => void;
}

type FormState = {
  name: string;
  slug: string;
  emoji: string;
  description: string;
  image_url: string;
  banner_url: string;
  sort_order: number;
  is_active: boolean;
};

function emptyForm(): FormState {
  return {
    name: '',
    slug: '',
    emoji: '',
    description: '',
    image_url: '',
    banner_url: '',
    sort_order: 0,
    is_active: true,
  };
}

function categoryToForm(category: Category): FormState {
  return {
    name: category.name,
    slug: category.slug,
    emoji: category.emoji ?? '',
    description: category.description ?? '',
    image_url: category.image_url ?? '',
    banner_url: category.banner_url ?? '',
    sort_order: category.sort_order,
    is_active: category.is_active,
  };
}

function inputClass(extra?: string) {
  return cn(
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition',
    'focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/20',
    extra
  );
}

export function CategoryFormModal({ open, category, onClose }: CategoryFormModalProps) {
  const isEdit = Boolean(category);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (category) {
      setForm(categoryToForm(category));
      setSlugManual(true);
    } else {
      setForm(emptyForm());
      setSlugManual(false);
    }
  }, [open, category]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (!form.slug.trim()) {
      toast.error('Slug is required');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      emoji: form.emoji.trim() || null,
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      banner_url: form.banner_url.trim() || null,
      sort_order: form.sort_order,
      is_active: form.is_active,
    };

    try {
      if (isEdit && category) {
        await updateCategory.mutateAsync({ id: category.id, body: payload });
        toast.success('Category updated');
      } else {
        await createCategory.mutateAsync(payload);
        toast.success('Category created');
      }
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    }
  };

  const saving = createCategory.isPending || updateCategory.isPending;

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
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="font-heading text-lg font-semibold text-brand-charcoal">
                {isEdit ? 'Edit category' : 'Add category'}
              </h2>
              <button type="button" onClick={onClose} className="rounded p-1 hover:bg-neutral-100">
                <CloseIcon size="sm" />
              </button>
            </div>

            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4 p-5">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  className={inputClass('mt-1')}
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      name,
                      slug: slugManual ? prev.slug : slugify(name),
                    }));
                  }}
                  placeholder="Wedding"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Slug</label>
                <input
                  className={inputClass('mt-1 font-mono text-xs')}
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    set('slug', slugify(e.target.value));
                  }}
                  placeholder="wedding"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Emoji</label>
                  <input
                    className={inputClass('mt-1')}
                    value={form.emoji}
                    onChange={(e) => set('emoji', e.target.value)}
                    placeholder="💍"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Sort order</label>
                  <input
                    type="number"
                    min={0}
                    className={inputClass('mt-1')}
                    value={form.sort_order}
                    onChange={(e) => set('sort_order', Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className={inputClass('mt-1 min-h-[72px]')}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Short description for shop page"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Thumbnail image URL</label>
                <input
                  className={inputClass('mt-1')}
                  value={form.image_url}
                  onChange={(e) => set('image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Banner image URL</label>
                <input
                  className={inputClass('mt-1')}
                  value={form.banner_url}
                  onChange={(e) => set('banner_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => set('is_active', e.target.checked)}
                  className="rounded border-gray-300 text-brand-maroon focus:ring-brand-maroon"
                />
                Show on website (active)
              </label>

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
                  {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create category'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
