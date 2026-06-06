const express = require('express');
const { supabase } = require('../lib/supabase');
const offerStore = require('../lib/mockOfferStore');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .gt('valid_till', new Date().toISOString())
        .order('is_featured', { ascending: false })
        .order('valid_till', { ascending: true });
      if (error) throw error;
      return res.json(data);
    }
    res.json(offerStore.listActive());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
