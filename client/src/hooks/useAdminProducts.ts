import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product } from '../types';
import { apiFetch } from '../lib/utils';
import { useAuthStore } from '../store/authStore';

export type ProductInput = Omit<Product, 'id' | 'categories'> & {
  category_id?: string | null;
};

function invalidateProductQueries(
  queryClient: ReturnType<typeof useQueryClient>,
  product?: Product | { slug?: string }
) {
  void queryClient.invalidateQueries({ queryKey: ['admin-products'] });
  void queryClient.invalidateQueries({ queryKey: ['products'] });
  if (product?.slug) {
    void queryClient.invalidateQueries({ queryKey: ['product', product.slug] });
  }
}

export function useAdminProducts() {
  const token = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ['admin-products'],
    queryFn: () => apiFetch<Product[]>('/admin/products', { token: token ?? undefined }),
    enabled: Boolean(token),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

export function useCreateProduct() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ProductInput) =>
      apiFetch<Product>('/admin/products', {
        method: 'POST',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => invalidateProductQueries(queryClient, data),
  });
}

export function useUpdateProduct() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body, previousSlug }: { id: string; body: Partial<ProductInput>; previousSlug?: string }) =>
      apiFetch<Product>(`/admin/products/${id}`, {
        method: 'PATCH',
        token: token ?? undefined,
        body: JSON.stringify(body),
      }).then((data) => ({ data, previousSlug })),
    onSuccess: ({ data, previousSlug }) => {
      invalidateProductQueries(queryClient, data);
      if (previousSlug && previousSlug !== data.slug) {
        void queryClient.invalidateQueries({ queryKey: ['product', previousSlug] });
      }
    },
  });
}

export function useDeleteProduct() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, slug }: { id: string; slug?: string }) =>
      apiFetch<{ success: boolean }>(`/admin/products/${id}`, {
        method: 'DELETE',
        token: token ?? undefined,
      }).then((res) => ({ ...res, slug })),
    onSuccess: (_res, { slug }) => {
      invalidateProductQueries(queryClient, slug ? { slug } : undefined);
    },
  });
}

export function useToggleProductActive() {
  const update = useUpdateProduct();
  return useMutation({
    mutationFn: (product: Product) =>
      update.mutateAsync({
        id: product.id,
        body: { is_active: !product.is_active },
        previousSlug: product.slug,
      }),
  });
}
