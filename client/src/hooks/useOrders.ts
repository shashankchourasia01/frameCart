import { useMutation, useQuery } from '@tanstack/react-query';
import type { Order } from '../types';
import { apiFetch } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

export function useCreateOrder() {
  return useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      apiFetch<{ success: boolean; order_number: string; order_id: string }>('/orders', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  });
}

export function useAdminOrders(filters?: { status?: string; search?: string }) {
  const token = useAuthStore((s) => s.accessToken);
  const search = new URLSearchParams();
  if (filters?.status) search.set('status', filters.status);
  if (filters?.search) search.set('search', filters.search);

  return useQuery({
    queryKey: ['admin-orders', filters],
    queryFn: () =>
      apiFetch<Order[]>(`/admin/orders?${search}`, { token: token ?? undefined }),
    enabled: Boolean(token),
  });
}

export function useUpdateOrderStatus() {
  const token = useAuthStore((s) => s.accessToken);
  return useMutation({
    mutationFn: ({ id, status, admin_notes }: { id: string; status: string; admin_notes?: string }) =>
      apiFetch(`/admin/orders/${id}`, {
        method: 'PATCH',
        token: token ?? undefined,
        body: JSON.stringify({ status, admin_notes }),
      }),
  });
}
