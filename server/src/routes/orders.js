const express = require('express');
const { z } = require('zod');
const { supabase } = require('../lib/supabase');

const router = express.Router();

const orderSchema = z.object({
  product_name: z.string().min(1),
  selected_size: z.string().min(1),
  selected_finish: z.string().min(1),
  selected_orientation: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  unit_price: z.number().positive(),
  total_price: z.number().positive(),
  product_id: z.string().uuid().optional(),
  category_name: z.string().optional(),
  selected_design_id: z.string().optional(),
  selected_design_name: z.string().optional(),
  coupon_code: z.string().optional(),
  discount_amount: z.number().optional(),
  customer_name: z.string().optional(),
  customer_phone: z.string().optional(),
  customer_email: z.string().email().optional().or(z.literal('')),
  customer_city: z.string().optional(),
  special_instructions: z.string().optional(),
  dynamic_field_values: z.record(z.string()).optional(),
  uploaded_photo_urls: z.array(z.string()).optional(),
  preview_image_url: z.string().optional(),
});

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `FC-${year}-${num}`;
}

router.post('/', async (req, res, next) => {
  try {
    const body = orderSchema.parse(req.body);
    const order_number = generateOrderNumber();
    const row = {
      ...body,
      order_number,
      uploaded_photo_urls: body.uploaded_photo_urls ?? [],
      discount_amount: body.discount_amount ?? 0,
    };

    if (supabase) {
      const { data, error } = await supabase.from('orders').insert(row).select('id, order_number').single();
      if (error) throw error;
      return res.json({ success: true, order_number: data.order_number, order_id: data.id });
    }

    console.log('[Order]', order_number, row);
    res.json({ success: true, order_number, order_id: crypto.randomUUID?.() ?? 'mock-id' });
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: e.errors?.[0]?.message ?? 'Validation failed' });
    }
    next(e);
  }
});

module.exports = router;
