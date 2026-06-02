import { useQuery, useMutation } from '@tanstack/react-query';
import type { Offer } from '../types';
import { apiFetch } from '../lib/utils';

export function useOffers() {
  return useQuery({
    queryKey: ['offers'],
    queryFn: () => apiFetch<Offer[]>('/offers'),
  });
}

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (data: { code: string; orderTotal: number; categorySlug?: string }) =>
      apiFetch<{ valid: boolean; discount: number; message?: string }>('/validate-coupon', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
}
