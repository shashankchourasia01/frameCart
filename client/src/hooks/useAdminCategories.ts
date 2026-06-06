import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Category } from '../types';
import { apiFetch } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

export type CategoryInput = {
  name: string;
  slug: string;
  emoji?: string | null;
  description?: string | null;
  image_url?: string | null;
  banner_url?: string | null;
  sort_order: number;
  is_active: boolean;
};

function invalidateCategoryQueries(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
  void queryClient.invalidateQueries({ queryKey: ['categories'] });
  void queryClient.invalidateQueries({ queryKey: ['products'] });
}

export function useAdminCategories() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => apiFetch<Category[]>('/admin/categories', { token: token ?? undefined }),
    enabled: Boolean(token),
    staleTime: 5_000,
  });
}

export function useCreateCategory() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CategoryInput) =>
      apiFetch<Category>('/admin/categories', {
        method: 'POST',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }),
    onSuccess: () => invalidateCategoryQueries(queryClient),
  });
}

export function useUpdateCategory() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CategoryInput> }) =>
      apiFetch<Category>(`/admin/categories/${id}`, {
        method: 'PATCH',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }),
    onSuccess: () => invalidateCategoryQueries(queryClient),
  });
}

export function useDeleteCategory() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean }>(`/admin/categories/${id}`, {
        method: 'DELETE',
        token: token ?? undefined,
      }),
    onSuccess: () => invalidateCategoryQueries(queryClient),
  });
}

export function useToggleCategoryActive() {
  const update = useUpdateCategory();
  return useMutation({
    mutationFn: (category: Category) =>
      update.mutateAsync({ id: category.id, body: { is_active: !category.is_active } }),
  });
}
