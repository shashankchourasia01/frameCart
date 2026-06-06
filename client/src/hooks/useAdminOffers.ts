import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Offer } from '../types';
import { apiFetch } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

export type OfferInput = {
  title: string;
  description?: string | null;
  coupon_code?: string | null;
  discount_type: 'percentage' | 'flat';
  discount_value: number;
  min_order_value: number;
  max_uses?: number | null;
  applicable_to: string;
  valid_from?: string;
  valid_till: string;
  is_featured: boolean;
  is_active: boolean;
  banner_image_url?: string | null;
};

function invalidateOfferQueries(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: ['admin-offers'] });
  void queryClient.invalidateQueries({ queryKey: ['offers'] });
}

export function useAdminOffers() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ['admin-offers'],
    queryFn: () => apiFetch<Offer[]>('/admin/offers', { token: token ?? undefined }),
    enabled: Boolean(token),
    staleTime: 5_000,
  });
}

export function useCreateOffer() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: OfferInput) =>
      apiFetch<Offer>('/admin/offers', {
        method: 'POST',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }),
    onSuccess: () => invalidateOfferQueries(queryClient),
  });
}

export function useUpdateOffer() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<OfferInput> }) =>
      apiFetch<Offer>(`/admin/offers/${id}`, {
        method: 'PATCH',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }),
    onSuccess: () => invalidateOfferQueries(queryClient),
  });
}

export function useDeleteOffer() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean }>(`/admin/offers/${id}`, {
        method: 'DELETE',
        token: token ?? undefined,
      }),
    onSuccess: () => invalidateOfferQueries(queryClient),
  });
}

export function useToggleOfferActive() {
  const update = useUpdateOffer();
  return useMutation({
    mutationFn: (offer: Offer) =>
      update.mutateAsync({ id: offer.id, body: { is_active: !offer.is_active } }),
  });
}

export function useToggleOfferFeatured() {
  const update = useUpdateOffer();
  return useMutation({
    mutationFn: (offer: Offer) =>
      update.mutateAsync({ id: offer.id, body: { is_featured: !offer.is_featured } }),
  });
}
