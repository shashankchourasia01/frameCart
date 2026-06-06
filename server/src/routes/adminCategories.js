const express = require('express');
const { z } = require('zod');
const { supabase } = require('../lib/supabase');
const categoryStore = require('../lib/mockCategoryStore');

const router = express.Router();

const categoryBodySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  emoji: z.string().max(8).optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal('')),
  banner_url: z.string().url().optional().nullable().or(z.literal('')),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

const categoryPatchSchema = categoryBodySchema.partial();

function normalizeRow(body) {
  const row = { ...body };
  if ('image_url' in row && !row.image_url) row.image_url = null;
  if ('banner_url' in row && !row.banner_url) row.banner_url = null;
  return row;
}

router.get('/', async (_req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('categories').select('*').order('sort_order');
      if (error) throw error;
      return res.json(data);
    }
    res.json(categoryStore.listAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('categories').select('*').eq('id', req.params.id).single();
      if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ message: 'Category not found' });
        throw error;
      }
      return res.json(data);
    }
    const category = categoryStore.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = normalizeRow(categoryBodySchema.parse(req.body));

    if (supabase) {
      const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', body.slug)
        .maybeSingle();
      if (existing) return res.status(409).json({ message: 'Slug already in use' });

      const { data, error } = await supabase.from('categories').insert(body).select('*').single();
      if (error) throw error;
      return res.status(201).json(data);
    }

    if (categoryStore.slugTaken(body.slug)) {
      return res.status(409).json({ message: 'Slug already in use' });
    }
    res.status(201).json(categoryStore.create(body));
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: 'Validation failed', errors: e.errors });
    }
    next(e);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const patch = normalizeRow(categoryPatchSchema.parse(req.body));

    if (supabase) {
      if (patch.slug) {
        const { data: existing } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', patch.slug)
          .neq('id', req.params.id)
          .maybeSingle();
        if (existing) return res.status(409).json({ message: 'Slug already in use' });
      }

      const { data, error } = await supabase
        .from('categories')
        .update(patch)
        .eq('id', req.params.id)
        .select('*')
        .single();
      if (error) {
        if (error.code === 'PGRST116') return res.status(404).json({ message: 'Category not found' });
        throw error;
      }
      return res.json(data);
    }

    if (patch.slug && categoryStore.slugTaken(patch.slug, req.params.id)) {
      return res.status(409).json({ message: 'Slug already in use' });
    }
    const updated = categoryStore.update(req.params.id, patch);
    if (!updated) return res.status(404).json({ message: 'Category not found' });
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
      const { error } = await supabase.from('categories').delete().eq('id', req.params.id);
      if (error) throw error;
      return res.json({ success: true });
    }
    const ok = categoryStore.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Category not found' });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
