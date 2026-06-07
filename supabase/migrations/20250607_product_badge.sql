ALTER TABLE products
  ADD COLUMN IF NOT EXISTS badge TEXT
  CHECK (badge IS NULL OR badge IN (
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
    'premium_pick'
  ));

UPDATE products SET badge = 'best_seller' WHERE is_bestseller = true AND badge IS NULL;
UPDATE products SET badge = 'new_arrival' WHERE is_featured = true AND is_bestseller = false AND badge IS NULL;
