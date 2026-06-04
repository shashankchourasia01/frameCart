export const APP_NAME = 'FrameCraft';
export const TAGLINE = 'Turn Memories Into Art';
export const ESTABLISHED = 1998;
export const BUSINESS_WHATSAPP = import.meta.env.VITE_BUSINESS_WHATSAPP ?? '919876543210';
export const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

import type { TrustIconKey } from '../components/icons';

export const TRUST_SIGNALS: { icon: TrustIconKey; label: string }[] = [
  { icon: 'frames', label: '10,000+ Frames Delivered' },
  { icon: 'rating', label: '4.9 Avg Rating' },
  { icon: 'delivery', label: 'Free Delivery ₹499+' },
  { icon: 'support', label: 'WhatsApp Support' },
];

export const INSTRUCTION_CHIPS = [
  'Add name at bottom',
  'Use warm filter',
  'No text overlay',
] as const;

export const DYNAMIC_FIELD_LABELS: Record<string, string> = {
  boy_name: "Boy's Name",
  girl_name: "Girl's Name",
  first_meet_date: 'First Meet Date',
  engagement_date: 'Engagement Date',
  wedding_date: 'Wedding Date',
};

export const MAX_UPLOAD_SIZE_MB = 10;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
