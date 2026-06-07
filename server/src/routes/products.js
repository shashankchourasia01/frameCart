const express = require('express');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');
const store = require('../lib/mockProductStore');
const { PRODUCT_BADGE_KEYS, matchesBestsellerFilter } = require('../constants/productBadges');

store.init(mock.products);

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, featured, bestseller, badge, limit } = req.query;

    if (supabase) {
      let q = supabase.from('products').select('*, categories(name, slug)').eq('is_active', true);
      if (featured === 'true') q = q.eq('is_featured', true);
      if (bestseller === 'true') {
        q = q.or('badge.in.(best_seller,top_seller_month),is_bestseller.eq.true');
      }
      if (badge && PRODUCT_BADGE_KEYS.includes(badge)) q = q.eq('badge', badge);
      if (category) {
        const { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', category)
          .eq('is_active', true)
          .single();
        if (cat) q = q.eq('category_id', cat.id);
      }
      q = q.order('sort_order');
      if (limit) q = q.limit(Number(limit));
      const { data, error } = await q;
      if (error) throw error;
      if (!data?.length) {
        console.warn(
          '[products] Supabase returned 0 products — falling back to mock. Run supabase/seed.sql (see SUPABASE_SETUP.md)'
        );
      } else {
        return res.json(
          data.map((p) => ({
            ...p,
            categories: p.categories ?? undefined,
          }))
        );
      }
    }

    let list = store.listActive();
    if (category) list = list.filter((p) => p.categories?.slug === category);
    if (featured === 'true') list = list.filter((p) => p.is_featured);
    if (bestseller === 'true') list = list.filter((p) => matchesBestsellerFilter(p));
    if (badge && PRODUCT_BADGE_KEYS.includes(badge)) list = list.filter((p) => p.badge === badge);
    if (limit) list = list.slice(0, Number(limit));
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug)')
        .eq('slug', req.params.slug)
        .eq('is_active', true)
        .single();
      if (error) throw error;
      return res.json(data);
    }
    const product = store.findBySlug(req.params.slug, true);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
