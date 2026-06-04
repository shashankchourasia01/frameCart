/**
 * Generates supabase/seed.sql from server product catalog.
 * Run: node scripts/generate-supabase-seed.js
 */
const fs = require('fs');
const path = require('path');
const { CATALOG } = require('../server/src/data/productCatalog');

const PEXELS = [
  1571468, 1128318, 271624, 1579715, 17742, 1571463, 584399, 1451903, 265763, 1444442,
  1024993, 3778558, 1648387, 3556686, 2253875, 2673996, 256490, 3992946, 3181718, 1571460,
  1080721, 1571465, 1913472,
];

const CATEGORY_META = {
  wedding: { emoji: '💒', desc: 'Celebrate your special day', thumb: 265763, banner: 265763 },
  anniversary: { emoji: '💑', desc: 'Mark every year together', thumb: 1444442, banner: 1444442 },
  baby: { emoji: '👶', desc: 'Welcome the little one', thumb: 1648387, banner: 3556686 },
  family: { emoji: '👨‍👩‍👧', desc: 'Cherish family moments', thumb: 1024993, banner: 3778558 },
  couple: { emoji: '❤️', desc: 'Romantic frames for two', thumb: 1451903, banner: 2253875 },
  graduation: { emoji: '🎓', desc: 'Proud achievements', thumb: 2673996, banner: 256490 },
};

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

let sql = `-- FrameCraft full seed — ${CATALOG.length} products (generated)
-- Run in Supabase SQL Editor AFTER schema.sql and rls_policies.sql

-- Clear old catalog data (keeps order rows; unlinks product FK first)
UPDATE orders SET product_id = NULL WHERE product_id IS NOT NULL;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM offers;

`;

const slugs = [...new Set(CATALOG.map((p) => p.categorySlug))];
let sort = 1;
for (const slug of slugs) {
  const m = CATEGORY_META[slug];
  const catName = CATALOG.find((p) => p.categorySlug === slug).categoryName;
  sql += `INSERT INTO categories (name, slug, emoji, description, image_url, banner_url, sort_order) VALUES
  ('${esc(catName)}', '${slug}', '${m.emoji}', '${esc(m.desc)}',
   '${pexels(m.thumb, 600, 800)}', '${pexels(m.banner, 1600, 900)}', ${sort});\n\n`;
  sort += 1;
}

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
WHERE slug = 'love-story-frame';

INSERT INTO offers (title, description, coupon_code, discount_type, discount_value, min_order_value, valid_till, is_featured, is_active, banner_image_url) VALUES
  ('Welcome Offer', 'Flat ₹100 off on your first order', 'WELCOME100', 'flat', 100, 499, now() + interval '90 days', true, true,
   '${pexels(1571468, 1200, 800)}'),
  ('Festival Sale', '15% off on all frames', 'FESTIVE15', 'percentage', 15, 799, now() + interval '30 days', false, true,
   '${pexels(1128318, 1200, 800)}');
`;

const out = path.join(__dirname, '../supabase/seed.sql');
fs.writeFileSync(out, sql, 'utf8');
console.log(`Wrote ${out} (${CATALOG.length} products)`);
