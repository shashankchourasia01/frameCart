-- Seed data with Pexels images (reliable CDN)

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Wedding', 'wedding', '💒', 'Celebrate your special day',
   'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 1),
  ('Anniversary', 'anniversary', '💑', 'Mark every year together',
   'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 2),
  ('Baby', 'baby', '👶', 'Welcome the little one',
   'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 3),
  ('Family', 'family', '👨‍👩‍👧', 'Cherish family moments',
   'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 4),
  ('Couple', 'couple', '❤️', 'Romantic frames for two',
   'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 5),
  ('Graduation', 'graduation', '🎓', 'Proud achievements',
   'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
   'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 6);

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
    'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
    'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'
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
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop',
    'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'
  ],
  true
FROM categories c WHERE c.slug = 'family';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true,
   'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false,
   'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop');
