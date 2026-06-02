const express = require('express');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .gt('valid_till', new Date().toISOString());
      if (error) throw error;
      return res.json(data);
    }
    res.json(mock.offers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
