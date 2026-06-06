import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { CategoryFormModal } from '../../components/admin/CategoryFormModal';
import { ActionRow, FilterChip, StatusBadge } from '../../components/admin/AdminTableHelpers';
import { CategoryIcon } from '../../components/icons';
import {
  useAdminCategories,
  useDeleteCategory,
  useToggleCategoryActive,
} from '../../hooks/useAdminCategories';
import type { Category } from '../../types';

type StatusFilter = 'all' | 'active' | 'inactive';

export function AdminCategoriesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [editing, setEditing] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data: categories, isLoading } = useAdminCategories();
  const toggleActive = useToggleCategoryActive();
  const deleteCategory = useDeleteCategory();

  const filtered = useMemo(() => {
    let list = [...(categories ?? [])].sort((a, b) => a.sort_order - b.sort_order);
    if (statusFilter === 'active') list = list.filter((c) => c.is_active);
    if (statusFilter === 'inactive') list = list.filter((c) => !c.is_active);
    return list;
  }, [categories, statusFilter]);

  const liveCount = categories?.filter((c) => c.is_active).length ?? 0;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleToggle = (category: Category) => {
    toggleActive.mutate(category, {
      onSuccess: () =>
        toast.success(
          category.is_active
            ? `"${category.name}" hidden from website`
            : `"${category.name}" is now live on website`
        ),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Update failed'),
    });
  };

  const handleDelete = (category: Category) => {
    if (!window.confirm(`Delete category "${category.name}"? Products may lose their category link.`)) {
      return;
    }
    deleteCategory.mutate(category.id, {
      onSuccess: () => toast.success('Category deleted'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Delete failed'),
    });
  };

  return (
    <>
      <AdminHeader
        title="Categories"
        subtitle={`${liveCount} live on website · ${categories?.length ?? 0} total`}
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-brand-charcoal-light">
              Inactive categories are hidden from shop, home, and navigation. Products in hidden categories
              won&apos;t appear under that category slug.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="shrink-0 rounded-lg bg-brand-maroon px-4 py-2 text-sm font-semibold text-white hover:bg-brand-maroon-dark"
            >
              + Add category
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
              All
            </FilterChip>
            <FilterChip active={statusFilter === 'active'} onClick={() => setStatusFilter('active')}>
              Live on website
            </FilterChip>
            <FilterChip active={statusFilter === 'inactive'} onClick={() => setStatusFilter('inactive')}>
              Hidden
            </FilterChip>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-brand-charcoal-light">
                <tr>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Slug</th>
                  <th className="p-3 font-medium">Order</th>
                  <th className="p-3 font-medium">Website</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-charcoal-light">
                      Loading categories…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-brand-charcoal-light">
                      No categories match this filter
                    </td>
                  </tr>
                ) : (
                  filtered.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50/60">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <CategoryIcon slug={c.slug} size="sm" variant="solid" />
                          <div>
                            <p className="font-medium text-brand-charcoal">{c.name}</p>
                            {c.description ? (
                              <p className="max-w-xs truncate text-xs text-brand-charcoal-light">
                                {c.description}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-xs">{c.slug}</td>
                      <td className="p-3 tabular-nums text-brand-charcoal-light">#{c.sort_order}</td>
                      <td className="p-3">
                        <StatusBadge
                          active={c.is_active}
                          label={{ on: 'Live', off: 'Hidden' }}
                        />
                      </td>
                      <td className="p-3">
                        <ActionRow
                          active={c.is_active}
                          onEdit={() => openEdit(c)}
                          onToggle={() => handleToggle(c)}
                          onDelete={() => handleDelete(c)}
                          toggleLabel={{ on: 'Hide', off: 'Show' }}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-3 lg:hidden">
            {isLoading ? (
              <p className="p-6 text-center text-sm text-brand-charcoal-light">Loading…</p>
            ) : (
              filtered.map((c) => (
                <article key={c.id} className="rounded-lg border border-neutral-200 p-3">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CategoryIcon slug={c.slug} size="sm" variant="solid" />
                      <div>
                        <p className="font-semibold text-brand-charcoal">{c.name}</p>
                        <p className="font-mono text-[11px] text-brand-charcoal-light">{c.slug}</p>
                      </div>
                    </div>
                    <StatusBadge active={c.is_active} label={{ on: 'Live', off: 'Hidden' }} />
                  </div>
                  <ActionRow
                    className="border-t border-neutral-200 pt-3"
                    active={c.is_active}
                    onEdit={() => openEdit(c)}
                    onToggle={() => handleToggle(c)}
                    onDelete={() => handleDelete(c)}
                    toggleLabel={{ on: 'Hide', off: 'Show' }}
                  />
                </article>
              ))
            )}
          </div>
        </div>
      </div>

      <CategoryFormModal open={formOpen} category={editing} onClose={closeForm} />
    </>
  );
}
