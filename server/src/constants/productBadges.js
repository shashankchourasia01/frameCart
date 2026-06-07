const PRODUCT_BADGE_KEYS = [
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
];

function isProductBadge(value) {
  return Boolean(value && PRODUCT_BADGE_KEYS.includes(value));
}

function syncBadgeWithFlags(body) {
  const row = { ...body };

  if (!('badge' in body)) return row;

  const badge = body.badge || null;
  row.badge = badge;

  if (!badge) {
    row.is_bestseller = false;
    row.is_featured = false;
    return row;
  }

  row.is_bestseller = badge === 'best_seller' || badge === 'top_seller_month';
  row.is_featured = badge === 'new_arrival' || badge === 'editors_pick';
  return row;
}

function resolveProductBadge(product) {
  if (product.badge && isProductBadge(product.badge)) return product.badge;
  if (product.is_bestseller) return 'best_seller';
  if (product.is_featured) return 'new_arrival';
  return null;
}

function matchesBestsellerFilter(product) {
  const badge = resolveProductBadge(product);
  return badge === 'best_seller' || badge === 'top_seller_month' || Boolean(product.is_bestseller);
}

module.exports = {
  PRODUCT_BADGE_KEYS,
  isProductBadge,
  syncBadgeWithFlags,
  resolveProductBadge,
  matchesBestsellerFilter,
};
