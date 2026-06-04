-- FrameCraft full seed — 42 products (generated)
-- Run in Supabase SQL Editor AFTER schema.sql and rls_policies.sql

-- Clear old catalog data (keeps order rows; unlinks product FK first)
UPDATE orders SET product_id = NULL WHERE product_id IS NOT NULL;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM offers;

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Wedding', 'wedding', '💒', 'Celebrate your special day',
   'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 1);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Anniversary', 'anniversary', '💑', 'Mark every year together',
   'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 2);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Baby', 'baby', '👶', 'Welcome the little one',
   'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 3);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Family', 'family', '👨‍👩‍👧', 'Cherish family moments',
   'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 4);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Couple', 'couple', '❤️', 'Romantic frames for two',
   'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 5);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Graduation', 'graduation', '🎓', 'Proud achievements',
   'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 6);

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Love Story Frame', 'love-story-frame', 'Your journey, beautifully framed', 'Love Story Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, true, true, 1, 18, 4.4
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Royal Wedding Collage', 'royal-wedding-collage', 'Multiple moments in one frame', 'Royal Wedding Collage with premium framing and elegant wall-ready design.', 999,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 2, 20, 4.5
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Wedding Date Keepsake', 'wedding-date-keepsake', 'Remember your special date forever', 'Wedding Date Keepsake with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 3, 22, 4.6
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Eternal Vows Frame', 'eternal-vows-frame', 'Classic wedding portrait display', 'Eternal Vows Frame with premium framing and elegant wall-ready design.', 929,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 4, 24, 4.7
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Bridal Portrait Frame', 'bridal-portrait-frame', 'Elegant bride showcase', 'Bridal Portrait Frame with premium framing and elegant wall-ready design.', 949,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 5, 26, 4.8
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Ring Ceremony Frame', 'ring-ceremony-frame', 'Capture the perfect ring moment', 'Ring Ceremony Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 6, 28, 4.4
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Mehendi Memories Frame', 'mehendi-memories-frame', 'Vibrant pre-wedding celebrations', 'Mehendi Memories Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 7, 30, 4.5
FROM categories c WHERE c.slug = 'wedding';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Golden Anniversary Frame', 'golden-anniversary-frame', 'Elegant gift for every year', 'Golden Anniversary Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 8, 32, 4.6
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Anniversary Memory Wall', 'anniversary-memory-wall', 'Timeline of your journey', 'Anniversary Memory Wall with premium framing and elegant wall-ready design.', 1099,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 9, 34, 4.7
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Silver Years Frame', 'silver-years-frame', 'Celebrate years of togetherness', 'Silver Years Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 10, 36, 4.8
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'First Date Keepsake', 'first-date-keepsake', 'Where it all began', 'First Date Keepsake with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 11, 38, 4.4
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Together Forever Collage', 'together-forever-collage', 'Your story in one frame', 'Together Forever Collage with premium framing and elegant wall-ready design.', 959,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 12, 40, 4.5
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Ruby Anniversary Frame', 'ruby-anniversary-frame', 'Bold red accents for 40 years', 'Ruby Anniversary Frame with premium framing and elegant wall-ready design.', 919,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 13, 42, 4.6
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Years of Love Frame', 'years-of-love-frame', 'Mark every milestone together', 'Years of Love Frame with premium framing and elegant wall-ready design.', 829,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 14, 44, 4.7
FROM categories c WHERE c.slug = 'anniversary';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Baby First Year Frame', 'baby-first-year-frame', 'From newborn to first birthday', 'Baby First Year Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 15, 46, 4.8
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Baby Name Frame', 'baby-name-frame', 'Personalized with baby name', 'Baby Name Frame with premium framing and elegant wall-ready design.', 759,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 16, 48, 4.4
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Little Star Frame', 'little-star-frame', 'Sweet nursery wall art', 'Little Star Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 17, 50, 4.5
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Newborn Welcome Frame', 'newborn-welcome-frame', 'Hello world announcement', 'Newborn Welcome Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 18, 52, 4.6
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Milestone Grid Frame', 'milestone-grid-frame', 'Monthly growth photos', 'Milestone Grid Frame with premium framing and elegant wall-ready design.', 929,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 19, 54, 4.7
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Little Angel Frame', 'little-angel-frame', 'Soft tones for nursery', 'Little Angel Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 20, 56, 4.8
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Sibling Love Frame', 'sibling-love-frame', 'Big brother & little sister', 'Sibling Love Frame with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 21, 58, 4.4
FROM categories c WHERE c.slug = 'baby';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Family Portrait Frame', 'family-portrait-frame', 'Together forever', 'Family Portrait Frame with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 22, 60, 4.5
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Family Quote Frame', 'family-quote-frame', 'Add your family quote', 'Family Quote Frame with premium framing and elegant wall-ready design.', 699,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 23, 62, 4.6
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Generations Frame', 'generations-frame', 'Multi-generation family collage', 'Generations Frame with premium framing and elegant wall-ready design.', 949,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 24, 64, 4.7
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Family Reunion Frame', 'family-reunion-frame', 'Everyone in one place', 'Family Reunion Frame with premium framing and elegant wall-ready design.', 999,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 25, 66, 4.8
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Vacation Memories Frame', 'vacation-memories-frame', 'Trip highlights collage', 'Vacation Memories Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 26, 68, 4.4
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Grandparents Heritage Frame', 'grandparents-heritage-frame', 'Honor your roots', 'Grandparents Heritage Frame with premium framing and elegant wall-ready design.', 829,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 27, 70, 4.5
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Holiday Together Frame', 'holiday-together-frame', 'Festive family moments', 'Holiday Together Frame with premium framing and elegant wall-ready design.', 789,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/17742/pexels-photo-17742.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 28, 72, 4.6
FROM categories c WHERE c.slug = 'family';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Couple Love Frame', 'couple-love-frame', 'Romantic minimalist style', 'Couple Love Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 29, 74, 4.7
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Couple Travel Memories', 'couple-travel-memories', 'Best trip moments in frame', 'Couple Travel Memories with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 30, 76, 4.8
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Date Night Frame', 'date-night-frame', 'Romantic evening memories', 'Date Night Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1451903/pexels-photo-1451903.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 31, 78, 4.4
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Engagement Story Frame', 'engagement-story-frame', 'She said yes', 'Engagement Story Frame with premium framing and elegant wall-ready design.', 919,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 32, 80, 4.5
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Honeymoon Collage Frame', 'honeymoon-collage-frame', 'Paradise memories', 'Honeymoon Collage Frame with premium framing and elegant wall-ready design.', 959,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 33, 82, 4.6
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Soulmates Frame', 'soulmates-frame', 'Minimal duo portrait', 'Soulmates Frame with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 34, 84, 4.7
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Adventure Together Frame', 'adventure-together-frame', 'Outdoor couple moments', 'Adventure Together Frame with premium framing and elegant wall-ready design.', 839,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 35, 86, 4.8
FROM categories c WHERE c.slug = 'couple';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Graduation Achievement Frame', 'graduation-achievement-frame', 'Celebrate your milestone', 'Graduation Achievement Frame with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 36, 88, 4.4
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Honor Roll Frame', 'honor-roll-frame', 'Showcase academic pride', 'Honor Roll Frame with premium framing and elegant wall-ready design.', 829,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 37, 90, 4.5
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Cap and Gown Frame', 'cap-and-gown-frame', 'Classic graduation portrait', 'Cap and Gown Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2253875/pexels-photo-2253875.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 38, 92, 4.6
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Degree Day Frame', 'degree-day-frame', 'Diploma display ready', 'Degree Day Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2673996/pexels-photo-2673996.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 39, 94, 4.7
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'School Memories Collage', 'school-memories-collage', 'Years of friendships', 'School Memories Collage with premium framing and elegant wall-ready design.', 929,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 40, 96, 4.8
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Scholar Achievement Frame', 'scholar-achievement-frame', 'Awards and accolades', 'Scholar Achievement Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 41, 98, 4.4
FROM categories c WHERE c.slug = 'graduation';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Future Starts Here Frame', 'future-starts-here-frame', 'Inspire the next chapter', 'Future Starts Here Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 42, 100, 4.5
FROM categories c WHERE c.slug = 'graduation';

UPDATE products SET
  requires_dynamic_fields = true,
  dynamic_field_config = '{"fields":["boy_name","girl_name","first_meet_date","engagement_date","wedding_date"]}'::jsonb,
  max_photos = 2
WHERE slug = 'love-story-frame';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, is_active, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true, true,
   'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false, true,
   'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop');
