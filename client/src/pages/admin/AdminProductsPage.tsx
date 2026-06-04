import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import {
  useAdminProducts,
  useDeleteProduct,
  useToggleProductActive,
} from '../../hooks/useAdminProducts';
import { formatPrice, cn } from '../../lib/utils';
import type { Product } from '../../types';

export function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data: products, isLoading, isFetching } = useAdminProducts();
  const toggleActive = useToggleProductActive();
  const deleteProduct = useDeleteProduct();

  const filtered = useMemo(() => {
    let list = products ?? [];
    if (statusFilter === 'active') list = list.filter((p) => p.is_active);
    if (statusFilter === 'inactive') list = list.filter((p) => !p.is_active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categories?.name?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, search, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleToggle = (product: Product) => {
    toggleActive.mutate(product, {
      onSuccess: () =>
        toast.success(product.is_active ? 'Product hidden from store' : 'Product is now live'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Update failed'),
    });
  };

  const handleDelete = (product: Product) => {
    if (!window.confirm(`Delete "${product.name}" permanently? This cannot be undone.`)) return;
    deleteProduct.mutate(
      { id: product.id, slug: product.slug },
      {
        onSuccess: () => toast.success('Product deleted'),
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Delete failed'),
      }
    );
  };

  return (
    <>
      <AdminHeader
        title="Products"
        subtitle={isFetching && !isLoading ? 'Syncing…' : `${filtered.length} frames`}
      />
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="search"
              placeholder="Search name, slug, category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-maroon sm:max-w-xs"
            />
            <div className="flex gap-1 rounded-lg border bg-white p-1">
              {(['all', 'active', 'inactive'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize sm:flex-none',
                    statusFilter === s ? 'bg-brand-maroon text-white' : 'text-brand-charcoal-light'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="w-full rounded-lg bg-brand-maroon px-4 py-2.5 text-sm font-semibold text-white shadow-sm sm:w-auto"
          >
            + Add frame
          </button>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {isLoading ? (
            <div className="rounded-xl border bg-white p-8 text-center text-sm text-brand-charcoal-light">
              Loading products…
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border bg-white p-8 text-center text-sm text-brand-charcoal-light">
              No products match your filters
            </div>
          ) : (
            filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => openEdit(p)}
                onToggle={() => handleToggle(p)}
                onDelete={() => handleDelete(p)}
              />
            ))
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b bg-gray-50/80">
                <tr>
                  <th className="p-3 font-medium">Frame</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Base price</th>
                  <th className="p-3 font-medium">Sizes</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-brand-charcoal-light">
                      Loading products…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-brand-charcoal-light">
                      No products match your filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50/50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                          ) : (
                            <ImagePlaceholder className="h-12 w-12" aspect="auto" label="" />
                          )}
                          <div>
                            <p className="font-medium text-brand-charcoal">{p.name}</p>
                            <p className="text-xs text-brand-charcoal-light">{p.slug}</p>
                            <div className="mt-0.5 flex gap-1">
                              {p.is_bestseller ? (
                                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                                  Bestseller
                                </span>
                              ) : null}
                              {p.is_featured ? (
                                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-800">
                                  Featured
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-brand-charcoal-light">{p.categories?.name ?? '—'}</td>
                      <td className="p-3 font-medium">{formatPrice(Number(p.base_price))}</td>
                      <td className="p-3 text-xs text-brand-charcoal-light">
                        {p.available_sizes.map((s) => s.label).join(', ')}
                      </td>
                      <td className="p-3">
                        <StatusBadge active={p.is_active} />
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-1">
                          <ActionBtn onClick={() => openEdit(p)}>Edit</ActionBtn>
                          <ActionBtn onClick={() => handleToggle(p)}>
                            {p.is_active ? 'Hide' : 'Publish'}
                          </ActionBtn>
                          <ActionBtn variant="danger" onClick={() => handleDelete(p)}>
                            Delete
                          </ActionBtn>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProductFormModal open={formOpen} product={editing} onClose={closeForm} />
    </>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-emerald-500' : 'bg-gray-400')} />
      {active ? 'Live' : 'Hidden'}
    </span>
  );
}

function ActionBtn({
  children,
  onClick,
  variant = 'default',
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg px-2.5 py-1.5 text-xs font-medium transition',
        variant === 'danger'
          ? 'text-red-600 hover:bg-red-50'
          : 'text-brand-maroon hover:bg-brand-maroon/5'
      )}
    >
      {children}
    </button>
  );
}

function ProductCard({
  product: p,
  onEdit,
  onToggle,
  onDelete,
}: {
  product: Product;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        {p.images[0] ? (
          <img src={p.images[0]} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        ) : (
          <ImagePlaceholder className="h-16 w-16 shrink-0" aspect="auto" label="" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate font-semibold text-brand-charcoal">{p.name}</h3>
            <StatusBadge active={p.is_active} />
          </div>
          <p className="text-xs text-brand-charcoal-light">{p.categories?.name}</p>
          <p className="mt-1 font-medium">{formatPrice(Number(p.base_price))}</p>
          <p className="mt-1 text-xs text-brand-charcoal-light">
            {p.available_sizes.length} size{p.available_sizes.length !== 1 ? 's' : ''} ·{' '}
            {p.print_finishes.join(', ')}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border py-2 text-xs font-medium text-brand-maroon"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg border py-2 text-xs font-medium"
        >
          {p.is_active ? 'Hide' : 'Publish'}
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-100 py-2 text-xs font-medium text-red-600"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
