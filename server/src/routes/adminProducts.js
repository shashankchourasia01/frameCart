const express = require('express');
const { z } = require('zod');
const { supabase } = require('../lib/supabase');
const mock = require('../data/mock');
const store = require('../lib/mockProductStore');
const { PRODUCT_BADGE_KEYS, syncBadgeWithFlags } = require('../constants/productBadges');

const router = express.Router();

const sizeSchema = z.object({
  label: z.string().min(1),
  inches: z.string().min(1),
  price_add: z.coerce.number().min(0),
});

const designSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  thumbnail_url: z.string().optional(),
  preview_url: z.string().optional(),
});

const productBodySchema = z.object({
  category_id: z.string().min(1).optional().nullable(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  tagline: z.string().max(300).optional().nullable(),
  description: z.string().optional().nullable(),
  material_info: z.string().optional().nullable(),
  base_price: z.coerce.number().positive(),
  available_sizes: z.array(sizeSchema).min(1),
  available_designs: z.array(designSchema).default([]),
  max_photos: z.coerce.number().int().min(1).max(20).default(1),
  print_finishes: z.array(z.string()).min(1),
  orientations: z.array(z.string()).min(1),
  requires_dynamic_fields: z.boolean().default(false),
  dynamic_field_config: z
    .object({ fields: z.array(z.string().min(1)) })
    .nullable()
    .optional(),
  images: z.array(z.string()).default([]),
  badge: z.enum(PRODUCT_BADGE_KEYS).nullable().optional(),
  is_featured: z.boolean().default(false),
  is_bestseller: z.boolean().default(false),
  is_active: z.boolean().default(true),
  sort_order: z.coerce.number().int().default(0),
  review_count: z.coerce.number().int().min(0).optional(),
  avg_rating: z.coerce.number().min(0).max(5).optional(),
});

const productPatchSchema = productBodySchema.partial();

function normalizeDesigns(designs) {
  return designs.map((d) => ({
    id: d.id,
    name: d.name,
    ...(d.thumbnail_url ? { thumbnail_url: d.thumbnail_url } : {}),
    ...(d.preview_url ? { preview_url: d.preview_url } : {}),
  }));
}

function normalizeRow(body) {
  const row = syncBadgeWithFlags({ ...body });
  if (body.available_designs) {
    row.available_designs = normalizeDesigns(body.available_designs);
  }
  if (body.images) {
    row.images = body.images.filter(Boolean);
  }
  if ('requires_dynamic_fields' in body) {
    row.dynamic_field_config = body.requires_dynamic_fields
      ? body.dynamic_field_config ?? { fields: [] }
      : null;
  }
  if ('category_id' in body && !body.category_id) {
    row.category_id = null;
  }
  return row;
}

async function fetchAllFromDb() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .order('sort_order');
  if (error) throw error;
  return data.map((p) => ({ ...p, categories: p.categories ?? undefined }));
}

async function fetchOneFromDb(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return { ...data, categories: data.categories ?? undefined };
}

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      return res.json(await fetchAllFromDb());
    }
    res.json(store.listAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (supabase) {
      const product = await fetchOneFromDb(req.params.id);
      return res.json(product);
    }
    const product = store.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = normalizeRow(productBodySchema.parse(req.body));

    if (supabase) {
      const { data: existing } = await supabase.from('products').select('id').eq('slug', body.slug).maybeSingle();
      if (existing) return res.status(409).json({ message: 'Slug already in use' });

      const { data, error } = await supabase.from('products').insert(body).select('*, categories(name, slug)').single();
      if (error) throw error;
      return res.status(201).json({ ...data, categories: data.categories ?? undefined });
    }

    if (store.slugTaken(body.slug)) {
      return res.status(409).json({ message: 'Slug already in use' });
    }
    const created = store.create(body);
    res.status(201).json(created);
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: e.errors });
    }
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const patch = normalizeRow(productPatchSchema.parse(req.body));

    if (supabase) {
      if (patch.slug) {
        const { data: existing } = await supabase
          .from('products')
          .select('id')
          .eq('slug', patch.slug)
          .neq('id', req.params.id)
          .maybeSingle();
        if (existing) return res.status(409).json({ message: 'Slug already in use' });
      }

      const { data, error } = await supabase
        .from('products')
        .update(patch)
        .eq('id', req.params.id)
        .select('*, categories(name, slug)')
        .single();
      if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ message: 'Product not found' });
        throw error;
      }
      return res.json({ ...data, categories: data.categories ?? undefined });
    }

    if (patch.slug && store.slugTaken(patch.slug, req.params.id)) {
      return res.status(409).json({ message: 'Slug already in use' });
    }
    const updated = store.update(req.params.id, patch);
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: e.errors });
    }
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', req.params.id);
      if (error) throw error;
      return res.json({ success: true });
    }
    const ok = store.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
