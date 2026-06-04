const express = require('express');
const { z } = require('zod');
const { supabase } = require('../lib/supabase');
const mockOrders = require('../lib/mockOrderStore');

const router = express.Router();

const orderSchema = z.object({
  product_name: z.string().min(1),
  selected_size: z.string().min(1),
  selected_finish: z.string().min(1),
  selected_orientation: z.string().min(1),
  quantity: z.number().int().min(1).max(10),
  unit_price: z.number().positive(),
  total_price: z.number().positive(),
  product_id: z.string().optional(),
  category_name: z.string().optional(),
  selected_design_id: z.string().optional(),
  selected_design_name: z.string().optional(),
  coupon_code: z.string().optional(),
  discount_amount: z.number().optional(),
  customer_name: z.string().min(1),
  customer_phone: z.string().min(10).max(15),
  customer_email: z.string().email().optional().or(z.literal('')),
  customer_address: z.string().min(1),
  customer_city: z.string().min(1),
  customer_state: z.string().min(1),
  customer_pincode: z.string().regex(/^\d{6}$/),
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
    let phone = body.customer_phone.replace(/\D/g, '');
    if (phone.length === 12 && phone.startsWith('91')) phone = phone.slice(2);
    if (phone.length === 11 && phone.startsWith('0')) phone = phone.slice(1);
    if (phone.length !== 10) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }
    const order_number = generateOrderNumber();
    const row = {
      ...body,
      customer_phone: phone,
      customer_email: body.customer_email || null,
      order_number,
      uploaded_photo_urls: body.uploaded_photo_urls ?? [],
      discount_amount: body.discount_amount ?? 0,
      whatsapp_notified: true,
    };

    if (supabase) {
      const { data, error } = await supabase.from('orders').insert(row).select('id, order_number').single();
      if (error) throw error;
      return res.json({ success: true, order_number: data.order_number, order_id: data.id });
    }

    const saved = mockOrders.add(row);
    res.json({ success: true, order_number: saved.order_number, order_id: saved.id });
  } catch (e) {
    if (e.name === 'ZodError') {
      return res.status(400).json({ message: e.errors?.[0]?.message ?? 'Validation failed' });
    }
    next(e);
  }
});

module.exports = router;
