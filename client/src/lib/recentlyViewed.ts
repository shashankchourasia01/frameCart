import type { Product } from '../types';

const KEY = 'framecraft_recently_viewed';
const MAX = 8;

export function addRecentlyViewed(product: Product) {
  try {
    const raw = localStorage.getItem(KEY);
    const list: { id: string; slug: string; name: string; image: string; base_price: number }[] = raw
      ? JSON.parse(raw)
      : [];
    const image = product.images?.[0] ?? '';
    const entry = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      image,
      base_price: Number(product.base_price),
    };
    const next = [entry, ...list.filter((p) => p.slug !== product.slug)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRecentlyViewed(excludeSlug?: string) {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return (list as { id: string; slug: string; name: string; image: string; base_price: number }[]).filter(
      (p) => p.slug !== excludeSlug
    );
  } catch {
    return [];
  }
}
