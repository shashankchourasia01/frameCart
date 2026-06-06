const express = require('express');
const { z } = require('zod');
const { supabase } = require('../lib/supabase');
const offerStore = require('../lib/mockOfferStore');

const router = express.Router();

const offerBodySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().nullable(),
  coupon_code: z.string().min(2).max(40).optional().nullable(),
  discount_type: z.enum(['percentage', 'flat']),
  discount_value: z.coerce.number().positive(),
  min_order_value: z.coerce.number().min(0).default(0),
  max_uses: z.coerce.number().int().min(1).optional().nullable(),
  applicable_to: z.string().min(1).default('all'),
  valid_from: z.string().datetime({ offset: true }).optional(),
  valid_till: z.string().datetime({ offset: true }),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  banner_image_url: z.string().url().optional().nullable().or(z.literal('')),
});

const offerPatchSchema = offerBodySchema.partial();

function normalizeRow(body) {
  const row = { ...body };
  if ('coupon_code' in row) {
    row.coupon_code = row.coupon_code?.trim().toUpperCase() || null;
  }
  if ('banner_image_url' in row && !row.banner_image_url) row.banner_image_url = null;
  if (!row.valid_from) row.valid_from = new Date().toISOString();
  if (row.discount_type === 'percentage' && row.discount_value > 100) {
    throw new z.ZodError([
      {
        code: 'custom',
        path: ['discount_value'],
        message: 'Percentage discount cannot exceed 100',
      },
    ]);
  }
  return row;
}

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('valid_from', { ascending: false });
      if (error) throw error;
      return res.json(data);
    }
    res.json(offerStore.listAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('offers').select('*').eq('id', req.params.id).single();
      if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ message: 'Offer not found' });
        throw error;
      }
      return res.json(data);
    }
    const offer = offerStore.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = normalizeRow(offerBodySchema.parse(req.body));

    if (supabase) {
      if (body.coupon_code) {
        const { data: existing } = await supabase
          .from('offers')
          .select('id')
          .eq('coupon_code', body.coupon_code)
          .maybeSingle();
        if (existing) return res.status(409).json({ message: 'Coupon code already in use' });
      }

      const { data, error } = await supabase.from('offers').insert(body).select('*').single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (offerStore.couponTaken(body.coupon_code)) {
      return res.status(409).json({ message: 'Coupon code already in use' });
    }
    res.status(201).json(offerStore.create(body));
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: e.errors?.[0]?.message ?? 'Validation failed', errors: e.errors });
    }
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const patch = normalizeRow(offerPatchSchema.parse(req.body));

    if (supabase) {
      if (patch.coupon_code) {
        const { data: existing } = await supabase
          .from('offers')
          .select('id')
          .eq('coupon_code', patch.coupon_code)
          .neq('id', req.params.id)
          .maybeSingle();
        if (existing) return res.status(409).json({ message: 'Coupon code already in use' });
      }

      const { data, error } = await supabase
        .from('offers')
        .update(patch)
        .eq('id', req.params.id)
        .select('*')
        .single();
      if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ message: 'Offer not found' });
        throw error;
      }
      return res.json(data);
    }

    if (patch.coupon_code && offerStore.couponTaken(patch.coupon_code, req.params.id)) {
      return res.status(409).json({ message: 'Coupon code already in use' });
    }
    const updated = offerStore.update(req.params.id, patch);
    if (!updated) return res.status(404).json({ message: 'Offer not found' });
    res.json(updated);
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: e.errors?.[0]?.message ?? 'Validation failed', errors: e.errors });
    }
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (supabase) {
      const { error } = await supabase.from('offers').delete().eq('id', req.params.id);
      if (error) throw error;
      return res.json({ success: true });
    }
    const ok = offerStore.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Offer not found' });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
