/**
 * Check Supabase connection and catalog counts.
 * Run from server folder: node scripts/verify-supabase.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { createClient } = require('@supabase/supabase-js');

const rawUrl = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '');
const url = rawUrl?.replace(/\/rest\/v1\/?$/, '');
const key = process.env.SUPABASE_SERVICE_KEY?.trim();

if (!url || !key || url.includes('YOUR_PROJECT')) {
  console.error('\n❌ Missing Supabase credentials in server/.env');
  console.error('   Copy server/.env.example → server/.env');
  console.error('   Set SUPABASE_URL and SUPABASE_SERVICE_KEY from Supabase → Settings → API\n');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const [cat, prod, offers] = await Promise.all([
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('offers').select('id', { count: 'exact', head: true }).eq('is_active', true),
  ]);

  const errors = [cat.error, prod.error, offers.error].filter(Boolean);
  if (errors.length) {
    console.error('\n❌ Supabase query failed:', errors[0].message);
    if (/relation.*does not exist/i.test(errors[0].message)) {
      console.error('   Run supabase/schema.sql and supabase/rls_policies.sql in SQL Editor first.\n');
    }
    process.exit(1);
  }

  const categories = cat.count ?? 0;
  const products = prod.count ?? 0;
  const offerCount = offers.count ?? 0;

  console.log('\n✓ Connected to Supabase');
  console.log(`  Categories: ${categories} (expect 6)`);
  console.log(`  Active products: ${products} (expect 42)`);
  console.log(`  Active offers: ${offerCount} (expect 2)`);

  if (products === 0) {
    console.error('\n⚠ Database is empty. Run supabase/seed.sql in Supabase SQL Editor.');
    console.error('  Guide: supabase/SUPABASE_SETUP.md\n');
    process.exit(1);
  }

  if (products < 42) {
    console.warn('\n⚠ Fewer than 42 products — re-run supabase/seed.sql to load the full catalog.\n');
  } else {
    console.log('\n✓ Catalog ready. Start API: npm run dev (in server/)\n');
  }
}

main().catch((err) => {
  console.error('\n❌', err.message || err);
  process.exit(1);
});
