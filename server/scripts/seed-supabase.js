/**
 * Load full catalog (9 categories, 50 products, 2 offers) into Supabase.
 * Run: node scripts/seed-supabase.js  (from server/, uses server/.env)
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { createClient } = require('@supabase/supabase-js');
const { CATALOG, CATEGORY_LIST } = require('../src/data/productCatalog');

const PEXELS = [
  1571468, 1128318, 1579715, 271624, 1571463, 584399, 1571465, 1913472, 1080721, 1571460,
  3181718, 3992946, 769775, 1090638, 1830976, 2824194, 2955955, 406014, 1579219, 1128316,
  276724, 1570119, 1571459, 1648120, 1571462,
];

const SIZES = [
  { label: '6x8', inches: '6x8', price_add: 0 },
  { label: '8x10', inches: '8x10', price_add: 180 },
  { label: '12x16', inches: '12x16', price_add: 420 },
];
const DESIGNS = [
  { id: 'd1', name: 'Classic' },
  { id: 'd2', name: 'Minimal' },
  { id: 'd3', name: 'Modern Black' },
];

function pexels(id, w, h) {
  const hp = h ? `&h=${h}` : '';
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${hp}&fit=crop`;
}

function imagesForIndex(i) {
  return [0, 1, 2].map((o) => pexels(PEXELS[(i + o) % PEXELS.length], 900));
}

const rawUrl = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '');
const url = rawUrl?.replace(/\/rest\/v1\/?$/, '');
const key = process.env.SUPABASE_SERVICE_KEY?.trim();
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY in server/.env');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const { error: unlinkErr } = await supabase.from('orders').update({ product_id: null }).not('product_id', 'is', null);
  if (unlinkErr) throw unlinkErr;

  for (const table of ['products', 'categories', 'offers']) {
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }

  const categoryRows = CATEGORY_LIST.map((c, idx) => ({
    name: c.name,
    slug: c.slug,
    emoji: c.emoji,
    description: c.description,
    image_url: pexels(c.thumb, 600, 800),
    banner_url: pexels(c.banner, 1600, 900),
    sort_order: idx + 1,
    is_active: true,
  }));

  const { data: categories, error: catErr } = await supabase.from('categories').insert(categoryRows).select('id, slug');
  if (catErr) throw catErr;
  const slugToId = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  const products = CATALOG.map((p, i) => ({
    category_id: slugToId[p.categorySlug],
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    description: `${p.name} with premium framing and elegant wall-ready design.`,
    base_price: p.price,
    available_sizes: SIZES,
    available_designs: DESIGNS,
    images: imagesForIndex(i),
    is_bestseller: true,
    is_featured: Boolean(p.is_featured),
    is_active: true,
    sort_order: i + 1,
    review_count: 18 + i * 2,
    avg_rating: Number((4.4 + (i % 5) * 0.1).toFixed(1)),
  }));

  const { error: prodErr } = await supabase.from('products').insert(products);
  if (prodErr) throw prodErr;

  const { error: dynErr } = await supabase
    .from('products')
    .update({
      requires_dynamic_fields: true,
      dynamic_field_config: {
        fields: ['boy_name', 'girl_name', 'first_meet_date', 'engagement_date', 'wedding_date'],
      },
      max_photos: 2,
    })
    .eq('slug', 'love-story-photo-frame');
  if (dynErr) throw dynErr;

  const valid90 = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
  const valid30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error: offErr } = await supabase.from('offers').insert([
    {
      title: 'Welcome Offer',
      description: 'Flat ₹100 off on your first order',
      coupon_code: 'WELCOME100',
      discount_type: 'flat',
      discount_value: 100,
      min_order_value: 499,
      valid_till: valid90,
      is_featured: true,
      is_active: true,
      banner_image_url: pexels(1571468, 1200, 800),
    },
    {
      title: 'Festival Sale',
      description: '15% off on all frames',
      coupon_code: 'FESTIVE15',
      discount_type: 'percentage',
      discount_value: 15,
      min_order_value: 799,
      valid_till: valid30,
      is_featured: false,
      is_active: true,
      banner_image_url: pexels(1128318, 1200, 800),
    },
  ]);
  if (offErr) throw offErr;

  console.log(`\n✓ Seeded ${categories.length} categories, ${products.length} products, 2 offers\n`);
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err.message || err);
  if (/relation.*does not exist/i.test(String(err.message))) {
    console.error('Run supabase/schema.sql and supabase/rls_policies.sql in Supabase SQL Editor first.\n');
  }
  process.exit(1);
});
