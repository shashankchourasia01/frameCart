-- Seed data with Unsplash images

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Wedding', 'wedding', '💒', 'Celebrate your special day',
   'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop', 1),
  ('Anniversary', 'anniversary', '💑', 'Mark every year together',
   'https://images.unsplash.com/photo-1522675457657-f6fa0973a7cd?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1522675457657-f6fa0973a7cd?w=1600&q=85&auto=format&fit=crop', 2),
  ('Baby', 'baby', '👶', 'Welcome the little one',
   'https://images.unsplash.com/photo-1555252337-081a075da841?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1555252337-081a075da841?w=1600&q=85&auto=format&fit=crop', 3),
  ('Family', 'family', '👨‍👩‍👧', 'Cherish family moments',
   'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=85&auto=format&fit=crop', 4),
  ('Couple', 'couple', '❤️', 'Romantic frames for two',
   'https://images.unsplash.com/photo-1516589178581-6b18321b8c92?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1516589178581-6b18321b8c92?w=1600&q=85&auto=format&fit=crop', 5),
  ('Graduation', 'graduation', '🎓', 'Proud achievements',
   'https://images.unsplash.com/photo-1523050852297-24b348553048?w=600&q=85&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1523050852297-24b348553048?w=1600&q=85&auto=format&fit=crop', 6);

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, review_count, avg_rating
) SELECT
  c.id,
  'Love Story Frame',
  'love-story-frame',
  'Your journey, beautifully framed',
  'A premium frame for wedding and couple memories. Upload your photos and personalize with names and dates.',
  899,
  '[{"label":"5x7","inches":"5x7","price_add":0},{"label":"8x10","inches":"8x10","price_add":150},{"label":"12x16","inches":"12x16","price_add":400}]'::jsonb,
  '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Floral"},{"id":"d3","name":"Minimal"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1606216794074-58f7c5173a72?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617814076367-b75911741708?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513519245088-0e1296e435a2?w=900&q=85&auto=format&fit=crop'
  ],
  true, true, 47, 4.9
FROM categories c WHERE c.slug = 'wedding';

UPDATE products SET
  requires_dynamic_fields = true,
  dynamic_field_config = '{"fields":["boy_name","girl_name","first_meet_date","engagement_date","wedding_date"]}'::jsonb,
  max_photos = 2
WHERE slug = 'love-story-frame';

INSERT INTO products (
  category_id, name, slug, tagline, base_price,
  available_sizes, available_designs, images, is_bestseller
) SELECT c.id, 'Family Portrait Frame', 'family-portrait-frame', 'Together forever', 749,
  '[{"label":"8x10","inches":"8x10","price_add":0},{"label":"12x16","inches":"12x16","price_add":300}]'::jsonb,
  '[{"id":"d1","name":"Warm Wood"},{"id":"d2","name":"Modern Black"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85&auto=format&fit=crop'
  ],
  true
FROM categories c WHERE c.slug = 'family';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true,
   'https://images.unsplash.com/photo-1513519245088-0e1296e435a2?w=1200&q=85&auto=format&fit=crop'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false,
   'https://images.unsplash.com/photo-1618221190210-0a37f9dd5c0?w=1200&q=85&auto=format&fit=crop');
