import type { Offer } from '../types';
import { formatPrice } from './utils';

export function isOfferExpired(offer: Offer, now = Date.now()) {
  return new Date(offer.valid_till).getTime() <= now;
}

export function isOfferLive(offer: Offer, now = Date.now()) {
  return offer.is_active && !isOfferExpired(offer, now);
}

export function getOfferDiscountLabel(offer: Offer) {
  return offer.discount_type === 'percentage'
    ? `${offer.discount_value}% OFF`
    : `${formatPrice(Number(offer.discount_value))} OFF`;
}

export function getOfferTypeLabel(offer: Offer) {
  if (offer.discount_type === 'percentage') return 'Percentage discount';
  return 'Flat discount';
}

export function getOfferScopeLabel(offer: Offer, categoryName?: string) {
  if (offer.applicable_to === 'all') return 'All frames';
  return categoryName ? `${categoryName} only` : `${offer.applicable_to} category`;
}

export function formatOfferDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
