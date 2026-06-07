import { slugify } from './utils';
import type { Product, ProductDesign, ProductSize } from '../types';
import type { ProductInput } from '../hooks/useAdminProducts';
import {
  isProductBadge,
  resolveProductBadge,
  syncBadgeWithFlags,
  type ProductBadge,
} from '../constants/productBadges';

export interface ProductFormState {
  category_id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  material_info: string;
  base_price: string;
  available_sizes: ProductSize[];
  available_designs: ProductDesign[];
  max_photos: string;
  print_finishes: string[];
  orientations: string[];
  requires_dynamic_fields: boolean;
  dynamic_fields_text: string;
  images: string[];
  badge: ProductBadge | '';
  is_active: boolean;
  sort_order: string;
  review_count: string;
  avg_rating: string;
}

export const FINISH_OPTIONS = ['Matte', 'Glossy'] as const;
export const ORIENTATION_OPTIONS = ['Portrait', 'Landscape'] as const;

export function emptyProductForm(): ProductFormState {
  return {
    category_id: '',
    name: '',
    slug: '',
    tagline: '',
    description: '',
    material_info: 'Engineered wood frame with HD glass and archival print paper',
    base_price: '799',
    available_sizes: [{ label: '8x10', inches: '8x10', price_add: 0 }],
    available_designs: [{ id: 'd1', name: 'Classic' }],
    max_photos: '1',
    print_finishes: ['Matte', 'Glossy'],
    orientations: ['Portrait', 'Landscape'],
    requires_dynamic_fields: false,
    dynamic_fields_text: '',
    images: [''],
    badge: '',
    is_active: true,
    sort_order: '0',
    review_count: '0',
    avg_rating: '4.5',
  };
}

export function productToForm(product: Product): ProductFormState {
  return {
    category_id: product.category_id ?? '',
    name: product.name,
    slug: product.slug,
    tagline: product.tagline ?? '',
    description: product.description ?? '',
    material_info: product.material_info ?? '',
    base_price: String(product.base_price),
    available_sizes: product.available_sizes.length
      ? [...product.available_sizes]
      : [{ label: '8x10', inches: '8x10', price_add: 0 }],
    available_designs: product.available_designs.length
      ? [...product.available_designs]
      : [{ id: 'd1', name: 'Classic' }],
    max_photos: String(product.max_photos),
    print_finishes: [...product.print_finishes],
    orientations: [...product.orientations],
    requires_dynamic_fields: product.requires_dynamic_fields,
    dynamic_fields_text: (product.dynamic_field_config?.fields ?? []).join(', '),
    images: product.images.length ? [...product.images] : [''],
    badge: resolveProductBadge(product) ?? '',
    is_active: product.is_active,
    sort_order: String(product.sort_order),
    review_count: String(product.review_count),
    avg_rating: String(product.avg_rating),
  };
}

export function formToPayload(form: ProductFormState): ProductInput {
  const fields = form.dynamic_fields_text
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean);

  return {
    category_id: form.category_id || undefined,
    name: form.name.trim(),
    slug: form.slug.trim() || slugify(form.name),
    tagline: form.tagline.trim() || undefined,
    description: form.description.trim() || undefined,
    material_info: form.material_info.trim() || undefined,
    base_price: Number(form.base_price),
    available_sizes: form.available_sizes.map((s) => ({
      label: s.label.trim(),
      inches: s.inches.trim(),
      price_add: Number(s.price_add) || 0,
    })),
    available_designs: form.available_designs
      .filter((d) => d.name.trim())
      .map((d) => ({
        id: d.id.trim() || slugify(d.name),
        name: d.name.trim(),
        ...(d.thumbnail_url?.trim() ? { thumbnail_url: d.thumbnail_url.trim() } : {}),
        ...(d.preview_url?.trim() ? { preview_url: d.preview_url.trim() } : {}),
      })),
    max_photos: Number(form.max_photos) || 1,
    print_finishes: form.print_finishes,
    orientations: form.orientations,
    requires_dynamic_fields: form.requires_dynamic_fields,
    dynamic_field_config: form.requires_dynamic_fields ? { fields } : null,
    images: form.images.map((u) => u.trim()).filter(Boolean),
    ...syncBadgeWithFlags(form.badge && isProductBadge(form.badge) ? form.badge : null),
    is_active: form.is_active,
    sort_order: Number(form.sort_order) || 0,
    review_count: Number(form.review_count) || 0,
    avg_rating: Number(form.avg_rating) || 0,
  };
}

export function validateForm(form: ProductFormState): string | null {
  if (!form.name.trim()) return 'Product name is required';
  if (!form.category_id) return 'Select a category';
  if (!form.base_price || Number(form.base_price) <= 0) return 'Enter a valid base price';
  if (!form.available_sizes.length) return 'Add at least one size';
  for (const s of form.available_sizes) {
    if (!s.label.trim() || !s.inches.trim()) return 'Each size needs a label and dimensions';
  }
  if (!form.print_finishes.length) return 'Select at least one print finish';
  if (!form.orientations.length) return 'Select at least one orientation';
  if (form.requires_dynamic_fields && !form.dynamic_fields_text.trim()) {
    return 'Add personalization field names (comma-separated)';
  }
  return null;
}
