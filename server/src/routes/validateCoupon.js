const express = require('express');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { code, orderTotal } = req.body;
    if (!code) return res.status(400).json({ message: 'Coupon required' });

    let offer;
    if (supabase) {
      const { data } = await supabase
        .from('offers')
        .select('*')
        .eq('coupon_code', code)
        .eq('is_active', true)
        .gt('valid_till', new Date().toISOString())
        .single();
      offer = data;
    } else {
      offer = mock.offers.find((o) => o.coupon_code === code);
    }

    if (!offer) return res.json({ valid: false, discount: 0, message: 'Invalid coupon' });
    if (orderTotal < Number(offer.min_order_value)) {
      return res.json({
        valid: false,
        discount: 0,
        message: `Minimum order ₹${offer.min_order_value}`,
      });
    }
    const discount =
      offer.discount_type === 'percentage'
        ? Math.round((orderTotal * Number(offer.discount_value)) / 100)
        : Number(offer.discount_value);
    res.json({ valid: true, discount });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
