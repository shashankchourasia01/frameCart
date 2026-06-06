import type { Product } from '../types';

/** Short codes for admin frame IDs (category + sequence) */
export const CATEGORY_CODES: Record<string, string> = {
  'family-relationship': 'FAM',
  'baby-kids': 'BAB',
  'birthday-celebration': 'BDY',
  'wedding-collection': 'WED',
  festival: 'FST',
  memorial: 'MEM',
  'travel-lifestyle': 'TRV',
  personalized: 'PRS',
  trending: 'TRD',
};

/** Global catalog number e.g. FC-042 */
export function globalFrameId(sortOrder: number) {
  return `FC-${String(sortOrder).padStart(3, '0')}`;
}

/** Category frame code e.g. WED-03 (position within category, 1-based) */
export function categoryFrameCode(categorySlug: string | undefined, positionInCategory: number) {
  const code = CATEGORY_CODES[categorySlug ?? ''] ?? 'FRM';
  return `${code}-${String(positionInCategory).padStart(2, '0')}`;
}

export type ProductWithAdminMeta = Product & {
  globalId: string;
  categoryCode: string;
  positionInCategory: number;
};

export function enrichProductsForAdmin(products: Product[]): ProductWithAdminMeta[] {
  const byCategory = new Map<string, Product[]>();
  for (const p of products) {
    const slug = p.categories?.slug ?? '_none';
    const list = byCategory.get(slug) ?? [];
    list.push(p);
    byCategory.set(slug, list);
  }

  for (const list of byCategory.values()) {
    list.sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
  }

  return products.map((p) => {
    const slug = p.categories?.slug ?? '_none';
    const list = byCategory.get(slug) ?? [p];
    const positionInCategory = list.findIndex((x) => x.id === p.id) + 1;
    return {
      ...p,
      globalId: globalFrameId(p.sort_order),
      categoryCode: categoryFrameCode(p.categories?.slug, positionInCategory),
      positionInCategory,
    };
  });
}

export function matchesProductSearch(item: ProductWithAdminMeta, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  if (/^fc-?\d+$/i.test(q)) {
    const num = parseInt(q.replace(/\D/g, ''), 10);
    return item.sort_order === num || item.globalId.toLowerCase().includes(q);
  }

  if (/^[a-z]{2,3}-?\d+$/i.test(q)) {
    const normalized = q.replace('-', '').toUpperCase();
    const codeNorm = item.categoryCode.replace('-', '').toUpperCase();
    return codeNorm.includes(normalized) || item.categoryCode.toLowerCase().includes(q);
  }

  if (/^\d+$/.test(q)) {
    const num = parseInt(q, 10);
    return (
      item.sort_order === num ||
      item.positionInCategory === num ||
      item.globalId.includes(String(num).padStart(3, '0'))
    );
  }

  return (
    item.name.toLowerCase().includes(q) ||
    item.slug.toLowerCase().includes(q) ||
    item.globalId.toLowerCase().includes(q) ||
    item.categoryCode.toLowerCase().includes(q) ||
    item.categories?.name?.toLowerCase().includes(q) ||
    item.id.toLowerCase().includes(q)
  );
}

export function groupByCategory(
  items: ProductWithAdminMeta[]
): { slug: string; name: string; products: ProductWithAdminMeta[] }[] {
  const map = new Map<string, { name: string; products: ProductWithAdminMeta[] }>();
  for (const p of items) {
    const slug = p.categories?.slug ?? '_none';
    const name = p.categories?.name ?? 'Uncategorized';
    const entry = map.get(slug) ?? { name, products: [] };
    entry.products.push(p);
    map.set(slug, entry);
  }
  return [...map.entries()]
    .map(([slug, { name, products }]) => ({
      slug,
      name,
      products: products.sort((a, b) => a.sort_order - b.sort_order),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
