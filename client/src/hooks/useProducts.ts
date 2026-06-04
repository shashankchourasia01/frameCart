import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';
import { apiFetch } from '../lib/utils';

interface ProductsParams {
  category?: string;
  featured?: boolean;
  bestseller?: boolean;
  limit?: number;
}

export function useProducts(params?: ProductsParams) {
  const search = new URLSearchParams();
  if (params?.category) search.set('category', params.category);
  if (params?.featured) search.set('featured', 'true');
  if (params?.bestseller) search.set('bestseller', 'true');
  if (params?.limit) search.set('limit', String(params.limit));
  const qs = search.toString();

  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiFetch<Product[]>(`/products${qs ? `?${qs}` : ''}`),
    staleTime: 20_000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => apiFetch<Product>(`/products/${slug}`),
    enabled: Boolean(slug),
    staleTime: 20_000,
    refetchOnWindowFocus: true,
  });
}
