import type { OrderDetails } from '../types';

export interface CustomerDetailsInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerPincode: string;
}

export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
}

export function formatPhoneForDisplay(phone: string): string {
  const d = normalizePhone(phone);
  if (d.length === 10) return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
  return phone;
}

export function validateCustomerDetails(
  data: Partial<CustomerDetailsInput>
): string | null {
  if (!data.customerName?.trim()) return 'Please enter your full name';
  if (!data.customerPhone?.trim()) return 'Please enter your WhatsApp / mobile number';
  const phone = normalizePhone(data.customerPhone);
  if (phone.length !== 10) return 'Enter a valid 10-digit mobile number';
  if (!data.customerAddress?.trim()) return 'Please enter your delivery address';
  if (!data.customerCity?.trim()) return 'Please enter your city';
  if (!data.customerState?.trim()) return 'Please enter your state';
  const pin = data.customerPincode?.trim() ?? '';
  if (!/^\d{6}$/.test(pin)) return 'Please enter a valid 6-digit PIN code';
  if (data.customerEmail?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function customerFromDraft(draft: Partial<OrderDetails>): CustomerDetailsInput {
  return {
    customerName: draft.customerName ?? '',
    customerPhone: draft.customerPhone ?? '',
    customerEmail: draft.customerEmail ?? '',
    customerAddress: draft.customerAddress ?? '',
    customerCity: draft.customerCity ?? '',
    customerState: draft.customerState ?? '',
    customerPincode: draft.customerPincode ?? '',
  };
}

export function formatDeliveryAddress(data: CustomerDetailsInput): string {
  return [
    data.customerAddress.trim(),
    data.customerCity.trim(),
    data.customerState.trim(),
    data.customerPincode.trim(),
  ]
    .filter(Boolean)
    .join(', ');
}
