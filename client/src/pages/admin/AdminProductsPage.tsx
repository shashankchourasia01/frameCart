import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';
import { CategoryIcon } from '../../components/icons';
import { useCategories } from '../../hooks/useCategories';
import {
  useAdminProducts,
  useDeleteProduct,
  useToggleProductActive,
} from '../../hooks/useAdminProducts';
import {
  enrichProductsForAdmin,
  groupByCategory,
  matchesProductSearch,
  type ProductWithAdminMeta,
} from '../../lib/adminProductDisplay';
import { formatPrice, cn } from '../../lib/utils';
import { PRODUCT_BADGES, resolveProductBadge } from '../../constants/productBadges';
import type { Product } from '../../types';

type StatusFilter = 'all' | 'active' | 'inactive';

export function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data: products, isLoading, isFetching } = useAdminProducts();
  const { data: categories } = useCategories();
  const toggleActive = useToggleProductActive();
  const deleteProduct = useDeleteProduct();

  const enriched = useMemo(() => enrichProductsForAdmin(products ?? []), [products]);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of enriched) {
      const slug = p.categories?.slug ?? '_none';
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
    const opts = (categories ?? [])
      .filter((c) => counts.has(c.slug))
      .map((c) => ({ slug: c.slug, name: c.name, count: counts.get(c.slug) ?? 0 }));
    return opts;
  }, [enriched, categories]);

  const filtered = useMemo(() => {
    let list = enriched;
    if (statusFilter === 'active') list = list.filter((p) => p.is_active);
    if (statusFilter === 'inactive') list = list.filter((p) => !p.is_active);
    if (categoryFilter !== 'all') {
      list = list.filter((p) => (p.categories?.slug ?? '_none') === categoryFilter);
    }
    if (search.trim()) list = list.filter((p) => matchesProductSearch(p, search));
    return list.sort((a, b) => a.sort_order - b.sort_order);
  }, [enriched, statusFilter, categoryFilter, search]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const totalCount = products?.length ?? 0;
  const activeInView = filtered.filter((p) => p.is_active).length;

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
    if (!window.confirm(`Delete "${product.name}" (${product.slug}) permanently?`)) return;
    deleteProduct.mutate(
      { id: product.id, slug: product.slug },
      {
        onSuccess: () => toast.success('Product deleted'),
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Delete failed'),
      }
    );
  };

  const subtitle =
    isFetching && !isLoading
      ? 'Syncing…'
      : categoryFilter === 'all'
        ? `${filtered.length} of ${totalCount} frames · ${activeInView} live in view`
        : `${filtered.length} in ${categoryOptions.find((c) => c.slug === categoryFilter)?.name ?? 'category'}`;

  return (
    <>
      <AdminHeader title="Products" subtitle={subtitle} />

      <div className="space-y-4 p-4 sm:p-6">
        {/* Toolbar */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1 space-y-2">
              <label htmlFor="admin-product-search" className="text-xs font-semibold uppercase tracking-wide text-brand-charcoal-light">
                Search frames
              </label>
              <input
                id="admin-product-search"
                type="search"
                placeholder="Name, slug, FC-012, WED-03, or category…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 px-3 py-2.5 text-sm outline-none focus:border-brand-maroon focus:bg-white"
              />
              <p className="text-[11px] text-brand-charcoal-light">
                <strong className="text-brand-charcoal">FC-###</strong> = catalog # ·{' '}
                <strong className="text-brand-charcoal">WED-01</strong> = category + position (5 per category)
              </p>
            </div>
            <button
              type="button"
              onClick={openCreate}
              className="shrink-0 rounded-lg bg-brand-maroon px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-maroon-dark"
            >
              + Add frame
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
              All status
            </FilterChip>
            <FilterChip active={statusFilter === 'active'} onClick={() => setStatusFilter('active')}>
              Live only
            </FilterChip>
            <FilterChip active={statusFilter === 'inactive'} onClick={() => setStatusFilter('inactive')}>
              Hidden
            </FilterChip>
          </div>
        </div>

        {/* Category filter */}
        <div className="rounded-xl border bg-white p-3 shadow-sm">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-brand-charcoal-light">
            Filter by category
          </p>
          <div className="flex flex-wrap gap-2">
            <CategoryChip
              active={categoryFilter === 'all'}
              label="All categories"
              count={totalCount}
              onClick={() => setCategoryFilter('all')}
            />
            {categoryOptions.map((c) => (
              <CategoryChip
                key={c.slug}
                active={categoryFilter === c.slug}
                label={c.name}
                count={c.count}
                slug={c.slug}
                onClick={() => setCategoryFilter(c.slug)}
              />
            ))}
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : filtered.length === 0 ? (
          <EmptyFilters onClear={() => { setSearch(''); setCategoryFilter('all'); setStatusFilter('all'); }} />
        ) : categoryFilter === 'all' && !search.trim() ? (
          <div className="space-y-6">
            {grouped.map((group) => (
              <CategorySection
                key={group.slug}
                groupName={group.name}
                groupSlug={group.slug}
                products={group.products}
                onEdit={openEdit}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onSelectCategory={() => setCategoryFilter(group.slug === '_none' ? 'all' : group.slug)}
              />
            ))}
          </div>
        ) : (
          <SingleCategoryTable
            products={filtered}
            title={
              categoryFilter === 'all'
                ? `Search results (${filtered.length})`
                : categoryOptions.find((c) => c.slug === categoryFilter)?.name ?? 'Category'
            }
            onEdit={openEdit}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductFormModal open={formOpen} product={editing} onClose={closeForm} />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-3 py-1.5 text-xs font-semibold transition',
        active ? 'bg-brand-maroon text-white' : 'bg-neutral-100 text-brand-charcoal-light hover:bg-neutral-200'
      )}
    >
      {children}
    </button>
  );
}

function CategoryChip({
  active,
  label,
  count,
  slug,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  slug?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-2 text-left text-xs font-semibold transition',
        active
          ? 'border-brand-maroon bg-brand-maroon text-white'
          : 'border-neutral-200 bg-white text-brand-charcoal hover:border-brand-maroon/40'
      )}
    >
      {slug && slug !== '_none' ? (
        <CategoryIcon slug={slug} size="sm" variant="solid" className={cn('!p-1', active && '!bg-white/20 !text-white')} />
      ) : null}
      <span>{label}</span>
      <span
        className={cn(
          'rounded-full px-1.5 py-0.5 text-[10px] tabular-nums',
          active ? 'bg-white/20' : 'bg-neutral-100 text-brand-charcoal-light'
        )}
      >
        {count}
      </span>
    </button>
  );
}

function CategorySection({
  groupName,
  groupSlug,
  products,
  onEdit,
  onToggle,
  onDelete,
  onSelectCategory,
}: {
  groupName: string;
  groupSlug: string;
  products: ProductWithAdminMeta[];
  onEdit: (p: Product) => void;
  onToggle: (p: Product) => void;
  onDelete: (p: Product) => void;
  onSelectCategory: () => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-neutral-50/80 px-4 py-3">
        <div className="flex items-center gap-2">
          {groupSlug !== '_none' && (
            <CategoryIcon slug={groupSlug} size="sm" variant="solid" />
          )}
          <div>
            <h2 className="font-semibold text-brand-charcoal">{groupName}</h2>
            <p className="text-xs text-brand-charcoal-light">{products.length} frame{products.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onSelectCategory}
          className="text-xs font-semibold text-brand-maroon hover:underline"
        >
          Manage only this category →
        </button>
      </div>
      <ProductTableBody products={products} onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} compact />
    </section>
  );
}

function SingleCategoryTable({
  products,
  title,
  onEdit,
  onToggle,
  onDelete,
}: {
  products: ProductWithAdminMeta[];
  title: string;
  onEdit: (p: Product) => void;
  onToggle: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b bg-neutral-50/80 px-4 py-3">
        <h2 className="font-semibold text-brand-charcoal">{title}</h2>
      </div>
      <ProductTableBody products={products} onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} />
    </section>
  );
}

function ProductTableBody({
  products,
  onEdit,
  onToggle,
  onDelete,
  compact,
}: {
  products: ProductWithAdminMeta[];
  onEdit: (p: Product) => void;
  onToggle: (p: Product) => void;
  onDelete: (p: Product) => void;
  compact?: boolean;
}) {
  return (
    <>
      <div className={cn('space-y-3 p-3', compact ? 'lg:hidden' : 'lg:hidden')}>
        {products.map((p) => (
          <AdminProductCard
            key={p.id}
            product={p}
            onEdit={() => onEdit(p)}
            onToggle={() => onToggle(p)}
            onDelete={() => onDelete(p)}
          />
        ))}
      </div>
      <div className={cn('hidden overflow-x-auto', compact ? 'lg:block' : 'lg:block')}>
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-gray-50/80 text-xs uppercase tracking-wide text-brand-charcoal-light">
            <tr>
              <th className="p-3 font-medium">Frame ID</th>
              <th className="p-3 font-medium">Product</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Order</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50/60">
                <td className="p-3 align-top">
                  <FrameIdCell product={p} />
                </td>
                <td className="p-3">
                  <ProductNameCell product={p} />
                </td>
                <td className="p-3 align-top font-semibold tabular-nums">{formatPrice(Number(p.base_price))}</td>
                <td className="p-3 align-top text-xs tabular-nums text-brand-charcoal-light">#{p.sort_order}</td>
                <td className="p-3 align-top">
                  <StatusBadge active={p.is_active} />
                </td>
                <td className="p-3 align-top">
                  <ActionRow onEdit={() => onEdit(p)} onToggle={() => onToggle(p)} onDelete={() => onDelete(p)} active={p.is_active} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function FrameIdCell({ product: p }: { product: ProductWithAdminMeta }) {
  return (
    <div className="space-y-1">
      <span className="inline-block rounded-md bg-brand-maroon/10 px-2 py-1 font-mono text-xs font-bold text-brand-maroon">
        {p.categoryCode}
      </span>
      <p className="font-mono text-[11px] text-brand-charcoal-light">{p.globalId}</p>
    </div>
  );
}

function ProductNameCell({ product: p }: { product: Product }) {
  return (
    <div className="flex items-center gap-3">
      {p.images[0] ? (
        <img src={p.images[0]} alt="" className="h-11 w-11 rounded-lg object-cover" />
      ) : (
        <ImagePlaceholder className="h-11 w-11" aspect="auto" label="" />
      )}
      <div className="min-w-0">
        <p className="font-medium text-brand-charcoal">{p.name}</p>
        <p className="truncate font-mono text-[11px] text-brand-charcoal-light">{p.slug}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <ProductBadgeTag product={p} />
        </div>
      </div>
    </div>
  );
}

function ProductBadgeTag({ product }: { product: Product }) {
  const badge = resolveProductBadge(product);
  if (!badge) return null;

  return (
    <span className="rounded bg-brand-maroon/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-maroon">
      {PRODUCT_BADGES[badge].label}
    </span>
  );
}

function AdminProductCard({
  product: p,
  onEdit,
  onToggle,
  onDelete,
}: {
  product: ProductWithAdminMeta;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-neutral-50/30 p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <FrameIdCell product={p} />
        <StatusBadge active={p.is_active} />
      </div>
      <div className="flex gap-3">
        {p.images[0] ? (
          <img src={p.images[0]} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
        ) : (
          <ImagePlaceholder className="h-14 w-14 shrink-0" aspect="auto" label="" />
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-brand-charcoal">{p.name}</p>
          <p className="text-xs text-brand-charcoal-light">{p.categories?.name}</p>
          <div className="mt-1">
            <ProductBadgeTag product={p} />
          </div>
          <p className="mt-1 font-bold tabular-nums">{formatPrice(Number(p.base_price))}</p>
        </div>
      </div>
      <ActionRow
        className="mt-3 border-t border-neutral-200 pt-3"
        onEdit={onEdit}
        onToggle={onToggle}
        onDelete={onDelete}
        active={p.is_active}
      />
    </article>
  );
}

function ActionRow({
  onEdit,
  onToggle,
  onDelete,
  active,
  className,
}: {
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
  active: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap justify-end gap-1', className)}>
      <ActionBtn onClick={onEdit}>Edit</ActionBtn>
      <ActionBtn onClick={onToggle}>{active ? 'Hide' : 'Publish'}</ActionBtn>
      <ActionBtn variant="danger" onClick={onDelete}>
        Delete
      </ActionBtn>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
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

function LoadingState() {
  return (
    <div className="rounded-xl border bg-white p-12 text-center text-sm text-brand-charcoal-light">
      Loading products…
    </div>
  );
}

function EmptyFilters({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-xl border bg-white p-10 text-center">
      <p className="font-medium text-brand-charcoal">No frames match your filters</p>
      <p className="mt-1 text-sm text-brand-charcoal-light">Try another category or search term (e.g. WED-02, FC-015)</p>
      <button type="button" onClick={onClear} className="mt-4 text-sm font-semibold text-brand-maroon hover:underline">
        Clear all filters
      </button>
    </div>
  );
}
