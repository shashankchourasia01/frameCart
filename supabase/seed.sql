-- FrameCraft full seed — 50 products, 9 categories (generated)
-- Run in Supabase SQL Editor AFTER schema.sql and rls_policies.sql

-- Clear old catalog data (keeps order rows; unlinks product FK first)
UPDATE orders SET product_id = NULL WHERE product_id IS NOT NULL;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM offers;

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Family & Relationship Frames', 'family-relationship', '👨‍👩‍👧', 'Celebrate love, family and togetherness',
   'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/3778558/pexels-photo-3778558.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 1);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Baby & Kids Frames', 'baby-kids', '👶', 'Precious moments from newborn to school days',
   'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/3556686/pexels-photo-3556686.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 2);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Birthday & Celebration Frames', 'birthday-celebration', '🎂', 'Mark every birthday and milestone celebration',
   'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 3);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Wedding Collection', 'wedding-collection', '💒', 'Every ceremony from haldi to reception',
   'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/265763/pexels-photo-265763.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 4);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Festival Frames', 'festival', '🪔', 'Festive memories for every occasion',
   'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 5);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Memorial Frames', 'memorial', '🕯️', 'Honour and remember loved ones',
   'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 6);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Travel & Lifestyle Frames', 'travel-lifestyle', '✈️', 'Adventures, vacations and nature moments',
   'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 7);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Personalized Frames', 'personalized', '✨', 'Custom collages, names and creative styles',
   'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 8);

INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('Trending Categories', 'trending', '🔥', 'Popular acrylic and LED frame styles',
   'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop', 9);

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Anniversary Photo Frame', 'anniversary-photo-frame', 'Celebrate every year together', 'Anniversary Photo Frame with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 1, 18, 4.4
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Wedding Photo Frame', 'wedding-photo-frame', 'Classic wedding portrait display', 'Wedding Photo Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 2, 20, 4.5
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Pre-Wedding Photo Frame', 'pre-wedding-photo-frame', 'Before the big day memories', 'Pre-Wedding Photo Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 3, 22, 4.6
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Engagement Photo Frame', 'engagement-photo-frame', 'She said yes — frame the moment', 'Engagement Photo Frame with premium framing and elegant wall-ready design.', 919,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 4, 24, 4.7
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Love Story Photo Frame', 'love-story-photo-frame', 'Your journey, beautifully framed', 'Love Story Photo Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, true, true, 5, 26, 4.8
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Couple Photo Frame', 'couple-photo-frame', 'Romantic frames for two', 'Couple Photo Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 6, 28, 4.4
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Family Photo Frame', 'family-photo-frame', 'Together forever on your wall', 'Family Photo Frame with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 7, 30, 4.5
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Parents Photo Frame', 'parents-photo-frame', 'A tribute to mom and dad', 'Parents Photo Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 8, 32, 4.6
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Grandparents Photo Frame', 'grandparents-photo-frame', 'Generations of love', 'Grandparents Photo Frame with premium framing and elegant wall-ready design.', 779,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 9, 34, 4.7
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Siblings Photo Frame', 'siblings-photo-frame', 'Brother and sister memories', 'Siblings Photo Frame with premium framing and elegant wall-ready design.', 759,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 10, 36, 4.8
FROM categories c WHERE c.slug = 'family-relationship';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Newborn Baby Photo Frame', 'newborn-baby-photo-frame', 'Welcome to the world', 'Newborn Baby Photo Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 11, 38, 4.4
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Baby Monthly Milestone Frame', 'baby-monthly-milestone-frame', 'Track every month of growth', 'Baby Monthly Milestone Frame with premium framing and elegant wall-ready design.', 929,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 12, 40, 4.5
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Baby First Year Frame', 'baby-first-year-frame', 'From newborn to first birthday', 'Baby First Year Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 13, 42, 4.6
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Birthday Photo Frame', 'kids-birthday-photo-frame', 'Colourful kids birthday keepsake', 'Birthday Photo Frame with premium framing and elegant wall-ready design.', 729,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 14, 44, 4.7
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Kids Photo Frame', 'kids-photo-frame', 'Playful designs for little ones', 'Kids Photo Frame with premium framing and elegant wall-ready design.', 699,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 15, 46, 4.8
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'School Memory Frame', 'school-memory-frame', 'First day and school milestones', 'School Memory Frame with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 16, 48, 4.4
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Baby Naming Ceremony Frame', 'baby-naming-ceremony-frame', 'Naamkaran celebration frame', 'Baby Naming Ceremony Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 17, 50, 4.5
FROM categories c WHERE c.slug = 'baby-kids';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Birthday Photo Frame', 'birthday-photo-frame', 'Classic birthday celebration', 'Birthday Photo Frame with premium framing and elegant wall-ready design.', 749,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 18, 52, 4.6
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'First Birthday Frame', 'first-birthday-frame', 'Turning one — a big milestone', 'First Birthday Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 19, 54, 4.7
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Sweet 16 Birthday Frame', 'sweet-16-birthday-frame', 'Teen milestone keepsake', 'Sweet 16 Birthday Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 20, 56, 4.8
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Golden Jubilee Frame', 'golden-jubilee-frame', '50 years of celebration', 'Golden Jubilee Frame with premium framing and elegant wall-ready design.', 949,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 21, 58, 4.4
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Silver Jubilee Frame', 'silver-jubilee-frame', '25 years of memories', 'Silver Jubilee Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 22, 60, 4.5
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Celebration Photo Frame', 'celebration-photo-frame', 'Any special occasion worth framing', 'Celebration Photo Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 23, 62, 4.6
FROM categories c WHERE c.slug = 'birthday-celebration';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Bride & Groom Frame', 'bride-and-groom-frame', 'The perfect pair on display', 'Bride & Groom Frame with premium framing and elegant wall-ready design.', 949,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 24, 64, 4.7
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Wedding Highlights Frame', 'wedding-highlights-frame', 'Best moments from your day', 'Wedding Highlights Frame with premium framing and elegant wall-ready design.', 999,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 25, 66, 4.8
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Wedding Album Frame', 'wedding-album-frame', 'Album-style multi-photo layout', 'Wedding Album Frame with premium framing and elegant wall-ready design.', 1099,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 26, 68, 4.4
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Reception Photo Frame', 'reception-photo-frame', 'Celebrate the reception night', 'Reception Photo Frame with premium framing and elegant wall-ready design.', 929,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 27, 70, 4.5
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Haldi Ceremony Frame', 'haldi-ceremony-frame', 'Golden haldi moments framed', 'Haldi Ceremony Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579715/pexels-photo-1579715.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 28, 72, 4.6
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Mehndi Ceremony Frame', 'mehndi-ceremony-frame', 'Intricate mehndi memories', 'Mehndi Ceremony Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 29, 74, 4.7
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Sangeet Ceremony Frame', 'sangeet-ceremony-frame', 'Music, dance and joy', 'Sangeet Ceremony Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 30, 76, 4.8
FROM categories c WHERE c.slug = 'wedding-collection';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Diwali Photo Frame', 'diwali-photo-frame', 'Festival of lights on your wall', 'Diwali Photo Frame with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/584399/pexels-photo-584399.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 31, 78, 4.4
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Holi Photo Frame', 'holi-photo-frame', 'Colours of Holi preserved forever', 'Holi Photo Frame with premium framing and elegant wall-ready design.', 829,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 32, 80, 4.5
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Raksha Bandhan Frame', 'raksha-bandhan-frame', 'Brother-sister bond celebration', 'Raksha Bandhan Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1913472/pexels-photo-1913472.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 33, 82, 4.6
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Eid Celebration Frame', 'eid-celebration-frame', 'Eid mubarak memories', 'Eid Celebration Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 34, 84, 4.7
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Christmas Photo Frame', 'christmas-photo-frame', 'Holiday season family moments', 'Christmas Photo Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 35, 86, 4.8
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'New Year Photo Frame', 'new-year-photo-frame', 'Welcome the new year in style', 'New Year Photo Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3181718/pexels-photo-3181718.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 36, 88, 4.4
FROM categories c WHERE c.slug = 'festival';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Tribute Photo Frame', 'tribute-photo-frame', 'A respectful tribute display', 'Tribute Photo Frame with premium framing and elegant wall-ready design.', 799,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/3992946/pexels-photo-3992946.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 37, 90, 4.5
FROM categories c WHERE c.slug = 'memorial';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Memory Photo Frame', 'memory-photo-frame', 'Cherish their memory always', 'Memory Photo Frame with premium framing and elegant wall-ready design.', 779,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/769775/pexels-photo-769775.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 38, 92, 4.6
FROM categories c WHERE c.slug = 'memorial';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Remembrance Frame', 'remembrance-frame', 'Forever in our hearts', 'Remembrance Frame with premium framing and elegant wall-ready design.', 769,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 39, 94, 4.7
FROM categories c WHERE c.slug = 'memorial';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Travel Memories Frame', 'travel-memories-frame', 'Your best trips on display', 'Travel Memories Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1830976/pexels-photo-1830976.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 40, 96, 4.8
FROM categories c WHERE c.slug = 'travel-lifestyle';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Vacation Photo Frame', 'vacation-photo-frame', 'Holiday highlights collage', 'Vacation Photo Frame with premium framing and elegant wall-ready design.', 849,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2824194/pexels-photo-2824194.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 41, 98, 4.4
FROM categories c WHERE c.slug = 'travel-lifestyle';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Adventure Photo Frame', 'adventure-photo-frame', 'Bold adventures worth framing', 'Adventure Photo Frame with premium framing and elegant wall-ready design.', 859,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/2955955/pexels-photo-2955955.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 42, 100, 4.5
FROM categories c WHERE c.slug = 'travel-lifestyle';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Nature Photo Frame', 'nature-photo-frame', 'Landscapes and outdoor beauty', 'Nature Photo Frame with premium framing and elegant wall-ready design.', 829,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 43, 102, 4.6
FROM categories c WHERE c.slug = 'travel-lifestyle';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Collage Photo Frame', 'collage-photo-frame', 'Multiple photos in one frame', 'Collage Photo Frame with premium framing and elegant wall-ready design.', 949,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1579219/pexels-photo-1579219.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 44, 104, 4.7
FROM categories c WHERE c.slug = 'personalized';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Multi Photo Frame', 'multi-photo-frame', 'Grid layout for many memories', 'Multi Photo Frame with premium framing and elegant wall-ready design.', 999,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 45, 106, 4.8
FROM categories c WHERE c.slug = 'personalized';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Custom Name Photo Frame', 'custom-name-photo-frame', 'Add a personal name touch', 'Custom Name Photo Frame with premium framing and elegant wall-ready design.', 819,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 46, 108, 4.4
FROM categories c WHERE c.slug = 'personalized';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Spotify Song Photo Frame', 'spotify-song-photo-frame', 'Your song as wall art', 'Spotify Song Photo Frame with premium framing and elegant wall-ready design.', 899,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1570119/pexels-photo-1570119.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 47, 110, 4.5
FROM categories c WHERE c.slug = 'personalized';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Instagram Style Photo Frame', 'instagram-style-photo-frame', 'Social-style photo display', 'Instagram Style Photo Frame with premium framing and elegant wall-ready design.', 879,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 48, 112, 4.6
FROM categories c WHERE c.slug = 'personalized';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'Acrylic Photo Frame', 'acrylic-photo-frame', 'Modern crystal-clear acrylic look', 'Acrylic Photo Frame with premium framing and elegant wall-ready design.', 1199,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1648120/pexels-photo-1648120.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, true, true, 49, 114, 4.7
FROM categories c WHERE c.slug = 'trending';

INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, 'LED Photo Frame', 'led-photo-frame', 'Illuminated frame with warm glow', 'LED Photo Frame with premium framing and elegant wall-ready design.', 1299,
  '[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb, '[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb, ARRAY['https://images.pexels.com/photos/1571462/pexels-photo-1571462.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop', 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=900&fit=crop'], true, false, true, 50, 116, 4.8
FROM categories c WHERE c.slug = 'trending';

UPDATE products SET
  requires_dynamic_fields = true,
  dynamic_field_config = '{"fields":["boy_name","girl_name","first_meet_date","engagement_date","wedding_date"]}'::jsonb,
  max_photos = 2
WHERE slug = 'love-story-photo-frame';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, is_active, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true, true,
   'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false, true,
   'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop');
