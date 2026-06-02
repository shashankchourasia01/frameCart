const express = require('express');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return res.json(data);
    }
    res.json(mock.categories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
