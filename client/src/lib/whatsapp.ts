import { DYNAMIC_FIELD_LABELS } from '../constants';
import {
  formatDeliveryAddress,
  formatPhoneForDisplay,
  normalizePhone,
  type CustomerDetailsInput,
} from './customerDetails';
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

function customerSection(order: OrderDetails): string | null {
  if (!order.customerName?.trim()) return null;
  const customer: CustomerDetailsInput = {
    customerName: order.customerName,
    customerPhone: order.customerPhone ?? '',
    customerEmail: order.customerEmail,
    customerAddress: order.customerAddress ?? '',
    customerCity: order.customerCity ?? '',
    customerState: order.customerState ?? '',
    customerPincode: order.customerPincode ?? '',
  };
  const lines = [
    `*Name:* ${customer.customerName}`,
    `*Phone:* ${formatPhoneForDisplay(customer.customerPhone)}`,
    customer.customerEmail?.trim() ? `*Email:* ${customer.customerEmail.trim()}` : null,
    `*Delivery address:*\n${formatDeliveryAddress(customer)}`,
  ].filter(Boolean);
  return lines.join('\n');
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const lines = [
    `*New Frame Order — FrameCraft*`,
    order.orderNumber ? `*Order #:* ${order.orderNumber}` : null,
    `─────────────────────`,
    `*FRAME DETAILS*`,
    `*Product:* ${order.productName}`,
    order.categoryName ? `*Category:* ${order.categoryName}` : null,
    `*Design:* ${order.selectedDesignName ?? 'Default'}`,
    `*Size:* ${order.selectedSize}`,
    `*Finish:* ${order.selectedFinish}`,
    `*Orientation:* ${order.orientation}`,
    `*Quantity:* ${order.quantity}`,
    `*Unit price:* ₹${order.unitPrice}`,
    `*Total:* ₹${order.totalPrice}`,
    order.couponCode ? `*Coupon:* ${order.couponCode}` : null,
    `─────────────────────`,
    customerSection(order),
    customerSection(order) ? `─────────────────────` : null,
    order.dynamicFields ? `*PERSONALIZATION*\n${buildDynamicFieldsText(order.dynamicFields)}` : null,
    order.dynamicFields ? `─────────────────────` : null,
    `*Instructions:*\n${order.specialInstructions || 'None'}`,
    `*Photos uploaded:* ${order.photoUrls.length}`,
    order.previewUrl ? `*Preview:* ${order.previewUrl}` : null,
    `─────────────────────`,
    `Placed: ${new Date().toLocaleString('en-IN')}`,
  ].filter(Boolean).join('\n');
  return lines;
}

/** Opens WhatsApp to business with order message (customer's number is in the message text). */
export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${BUSINESS_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Opens WhatsApp chat with customer's number (optional follow-up). */
export function openWhatsAppToCustomer(phone: string, message: string): void {
  const digits = normalizePhone(phone);
  const url = `https://wa.me/91${digits}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
