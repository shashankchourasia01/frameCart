import { useQuery } from '@tanstack/react-query';
import type { Category } from '../types';
import { apiFetch } from '../lib/utils';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiFetch<Category[]>('/categories'),
  });
}

export function useCategory(slug: string) {
  const { data: categories, ...rest } = useCategories();
  const category = categories?.find((c) => c.slug === slug);
  return { data: category, categories, ...rest };
}
