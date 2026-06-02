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
  const labels: Record<string, string> = {
    boy_name: "👦 Boy's Name",
    girl_name: "👧 Girl's Name",
    first_meet_date: '💌 First Met',
    engagement_date: '💍 Engaged On',
    wedding_date: '💒 Wedding Date',
  };
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${labels[k] ?? k}: ${k.includes('date') ? formatDate(v) : v}`)
    .join('\n');
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const lines = [
    `🛍️ *New Frame Order — FrameCraft*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📦 *Product:* ${order.productName}`,
    `🎨 *Design:* ${order.selectedDesignName ?? 'Default'}`,
    `📐 *Size:* ${order.selectedSize}`,
    `✨ *Finish:* ${order.selectedFinish}`,
    `🖼️ *Orientation:* ${order.orientation}`,
    `🔢 *Quantity:* ${order.quantity}`,
    `💰 *Total:* ₹${order.totalPrice}`,
    order.couponCode ? `🎁 *Coupon Used:* ${order.couponCode}` : null,
    `━━━━━━━━━━━━━━━━━━━━━`,
    order.dynamicFields ? buildDynamicFieldsText(order.dynamicFields) : null,
    order.dynamicFields ? `━━━━━━━━━━━━━━━━━━━━━` : null,
    `📝 *Special Instructions:*\n${order.specialInstructions || 'None'}`,
    `📸 *Photos:* ${order.photoUrls.length} photo(s) uploaded`,
    `🔗 *Preview:* ${order.previewUrl || 'Will be shared'}`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `🕐 Placed at: ${new Date().toLocaleString('en-IN')}`,
  ].filter(Boolean).join('\n');
  return lines;
}

export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${BUSINESS_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
