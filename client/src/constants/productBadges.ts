export const PRODUCT_BADGE_KEYS = [
  'best_seller',
  'top_seller_month',
  'month_special',
  'new_arrival',
  'trending',
  'editors_pick',
  'limited_edition',
  'on_sale',
  'customer_favorite',
  'gift_favorite',
  'hot_deal',
  'premium_pick',
] as const;

export type ProductBadge = (typeof PRODUCT_BADGE_KEYS)[number];

export interface ProductBadgeConfig {
  label: string;
  shortLabel: string;
  className: string;
  priority: number;
}

export const PRODUCT_BADGES: Record<ProductBadge, ProductBadgeConfig> = {
  best_seller: {
    label: 'Best Seller',
    shortLabel: 'Best Seller',
    className: 'bg-brand-maroon text-white',
    priority: 10,
  },
  top_seller_month: {
    label: 'Top Seller of Month',
    shortLabel: 'Top Seller',
    className: 'bg-amber-600 text-white',
    priority: 9,
  },
  month_special: {
    label: 'Month Special',
    shortLabel: 'Special',
    className: 'bg-violet-600 text-white',
    priority: 8,
  },
  new_arrival: {
    label: 'New Arrival',
    shortLabel: 'New',
    className: 'bg-emerald-600 text-white',
    priority: 7,
  },
  trending: {
    label: 'Trending Now',
    shortLabel: 'Trending',
    className: 'bg-orange-500 text-white',
    priority: 6,
  },
  editors_pick: {
    label: "Editor's Pick",
    shortLabel: "Editor's Pick",
    className: 'bg-indigo-600 text-white',
    priority: 5,
  },
  limited_edition: {
    label: 'Limited Edition',
    shortLabel: 'Limited',
    className: 'bg-brand-charcoal text-white',
    priority: 4,
  },
  on_sale: {
    label: 'On Sale',
    shortLabel: 'Sale',
    className: 'bg-rose-600 text-white',
    priority: 3,
  },
  customer_favorite: {
    label: 'Customer Favorite',
    shortLabel: 'Favorite',
    className: 'bg-pink-600 text-white',
    priority: 2,
  },
  gift_favorite: {
    label: 'Gift Favorite',
    shortLabel: 'Gift Pick',
    className: 'bg-teal-600 text-white',
    priority: 1,
  },
  hot_deal: {
    label: 'Hot Deal',
    shortLabel: 'Hot Deal',
    className: 'bg-red-600 text-white',
    priority: 0,
  },
  premium_pick: {
    label: 'Premium Pick',
    shortLabel: 'Premium',
    className: 'bg-brand-gold text-white',
    priority: 0,
  },
};

export const PRODUCT_BADGE_OPTIONS: { value: ProductBadge; label: string }[] = PRODUCT_BADGE_KEYS.map(
  (key) => ({ value: key, label: PRODUCT_BADGES[key].label })
);

export function isProductBadge(value: string | null | undefined): value is ProductBadge {
  return Boolean(value && PRODUCT_BADGE_KEYS.includes(value as ProductBadge));
}

export function resolveProductBadge(product: {
  badge?: ProductBadge | null;
  is_bestseller?: boolean;
  is_featured?: boolean;
}): ProductBadge | null {
  if (product.badge && isProductBadge(product.badge)) return product.badge;
  if (product.is_bestseller) return 'best_seller';
  if (product.is_featured) return 'new_arrival';
  return null;
}

export function syncBadgeWithFlags(badge: ProductBadge | null): {
  badge: ProductBadge | null;
  is_bestseller: boolean;
  is_featured: boolean;
} {
  if (!badge) {
    return { badge: null, is_bestseller: false, is_featured: false };
  }

  return {
    badge,
    is_bestseller: badge === 'best_seller' || badge === 'top_seller_month',
    is_featured: badge === 'new_arrival' || badge === 'editors_pick',
  };
}

export function badgeSortScore(product: {
  badge?: ProductBadge | null;
  is_bestseller?: boolean;
  is_featured?: boolean;
}): number {
  const badge = resolveProductBadge(product);
  return badge ? PRODUCT_BADGES[badge].priority : -1;
}
