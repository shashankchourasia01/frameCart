/**
 * Generates supabase/seed.sql from server product catalog.
 * Run: node scripts/generate-supabase-seed.js
 */
const fs = require('fs');
const path = require('path');
const { CATALOG, CATEGORY_LIST } = require('../server/src/data/productCatalog');

/** Picture frames & gallery walls only — each product gets a different design */
const PEXELS = [
  1571468, 1128318, 1579715, 271624, 1571463, 584399, 1571465, 1913472, 1080721, 1571460,
  3181718, 3992946, 769775, 1090638, 1830976, 2824194, 2955955, 406014, 1579219, 1128316,
  276724, 1570119, 1571459, 1648120, 1571462,
];

const CATEGORY_META = Object.fromEntries(
  CATEGORY_LIST.map((c) => [c.slug, { emoji: c.emoji, desc: c.description, thumb: c.thumb, banner: c.banner }])
);

function pexels(id, w, h) {
  const hp = h ? `&h=${h}` : '';
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${hp}&fit=crop`;
}

function esc(s) {
  return String(s).replace(/'/g, "''");
}

function imgArray(i) {
  const urls = [0, 1, 2].map((o) => {
    const id = PEXELS[(i + o) % PEXELS.length];
    return `'${pexels(id, 900)}'`;
  });
  return `ARRAY[${urls.join(', ')}]`;
}

const sizes =
  `'[{"label":"6x8","inches":"6x8","price_add":0},{"label":"8x10","inches":"8x10","price_add":180},{"label":"12x16","inches":"12x16","price_add":420}]'::jsonb`;
const designs =
  `'[{"id":"d1","name":"Classic"},{"id":"d2","name":"Minimal"},{"id":"d3","name":"Modern Black"}]'::jsonb`;

let sql = `-- FrameCraft full seed — ${CATALOG.length} products, ${CATEGORY_LIST.length} categories (generated)
-- Run in Supabase SQL Editor AFTER schema.sql and rls_policies.sql

-- Clear old catalog data (keeps order rows; unlinks product FK first)
UPDATE orders SET product_id = NULL WHERE product_id IS NOT NULL;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM offers;

`;

CATEGORY_LIST.forEach((c, idx) => {
  const m = CATEGORY_META[c.slug];
  sql += `INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('${esc(c.name)}', '${c.slug}', '${m.emoji}', '${esc(m.desc)}',
   '${pexels(m.thumb, 600, 800)}', '${pexels(m.banner, 1600, 900)}', ${idx + 1});\n\n`;
});

CATALOG.forEach((p, i) => {
  const featured = p.is_featured ? 'true' : 'false';
  const desc = esc(`${p.name} with premium framing and elegant wall-ready design.`);
  sql += `INSERT INTO products (
  category_id, name, slug, tagline, description, base_price,
  available_sizes, available_designs, images, is_bestseller, is_featured, is_active, sort_order, review_count, avg_rating
) SELECT c.id, '${esc(p.name)}', '${p.slug}', '${esc(p.tagline)}', '${desc}', ${p.price},
  ${sizes}, ${designs}, ${imgArray(i)}, true, ${featured}, true, ${i + 1}, ${18 + i * 2}, ${(4.4 + (i % 5) * 0.1).toFixed(1)}
FROM categories c WHERE c.slug = '${p.categorySlug}';\n\n`;
});

sql += `UPDATE products SET
  requires_dynamic_fields = true,
  dynamic_field_config = '{"fields":["boy_name","girl_name","first_meet_date","engagement_date","wedding_date"]}'::jsonb,
  max_photos = 2
WHERE slug = 'love-story-photo-frame';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, is_active, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true, true,
   '${pexels(1571468, 1200, 800)}'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false, true,
   '${pexels(1128318, 1200, 800)}');
`;

const out = path.join(__dirname, '../supabase/seed.sql');
fs.writeFileSync(out, sql, 'utf8');
console.log(`Wrote ${out} (${CATALOG.length} products)`);
