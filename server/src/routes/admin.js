const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');
const mockOrders = require('../lib/mockOrderStore');
const adminProductsRouter = require('./adminProducts');

const router = express.Router();
router.use(authMiddleware);
router.use('/products', adminProductsRouter);

router.get('/dashboard', async (_req, res) => {
  const ordersTrend = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { date: d.toLocaleDateString('en-IN', { weekday: 'short' }), count: Math.floor(Math.random() * 8) };
  });
  res.json({
    todayOrders: 5,
    totalRevenue: 12450,
    pendingOrders: 3,
    activeProducts: mock.products.length,
    ordersTrend,
    categoryBreakdown: mock.categories.slice(0, 4).map((c) => ({ name: c.name, value: Math.floor(Math.random() * 20) + 5 })),
    revenueTrend: ordersTrend.map((o) => ({ date: o.date, revenue: o.count * 850 })),
  });
});

router.get('/orders', async (req, res, next) => {
  try {
    if (supabase) {
      let q = supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (req.query.status) q = q.eq('status', req.query.status);
      const { data, error } = await q;
      if (error) throw error;
      return res.json(data);
    }
    const search = req.query.search;
    const status = req.query.status;
    return res.json(
      mockOrders.list({
        status: status || undefined,
        search: typeof search === 'string' ? search : undefined,
      })
    );
  } catch (e) {
    next(e);
  }
});

router.patch('/orders/:id', async (req, res, next) => {
  try {
    const { status, admin_notes } = req.body;
    if (supabase) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, admin_notes })
        .eq('id', req.params.id)
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    }
    res.json({ id: req.params.id, status });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
