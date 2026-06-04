import { DYNAMIC_FIELD_LABELS } from '../constants';
import type { OrderDetails } from '../types';

const BUSINESS_WA = import.meta.env.VITE_BUSINESS_WHATSAPP ?? '919876543210';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function buildDynamicFieldsText(fields: Record<string, string>): string {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => {
      const label = DYNAMIC_FIELD_LABELS[k] ?? k;
      return `${label}: ${k.includes('date') ? formatDate(v) : v}`;
    })
    .join('\n');
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const lines = [
    `*New Frame Order — FrameCraft*`,
    `─────────────────────`,
    `*Product:* ${order.productName}`,
    `*Design:* ${order.selectedDesignName ?? 'Default'}`,
    `*Size:* ${order.selectedSize}`,
    `*Finish:* ${order.selectedFinish}`,
    `*Orientation:* ${order.orientation}`,
    `*Quantity:* ${order.quantity}`,
    `*Total:* ₹${order.totalPrice}`,
    order.couponCode ? `*Coupon:* ${order.couponCode}` : null,
    `─────────────────────`,
    order.dynamicFields ? buildDynamicFieldsText(order.dynamicFields) : null,
    order.dynamicFields ? `─────────────────────` : null,
    `*Instructions:*\n${order.specialInstructions || 'None'}`,
    `*Photos:* ${order.photoUrls.length} uploaded`,
    `*Preview:* ${order.previewUrl || 'Will be shared'}`,
    `─────────────────────`,
    `Placed: ${new Date().toLocaleString('en-IN')}`,
  ].filter(Boolean).join('\n');
  return lines;
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${BUSINESS_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
