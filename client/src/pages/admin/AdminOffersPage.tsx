import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { OfferFormModal } from '../../components/admin/OfferFormModal';
import { FilterChip, StatusBadge } from '../../components/admin/AdminTableHelpers';
import { StarIcon } from '../../components/icons';
import {
  useAdminOffers,
  useDeleteOffer,
  useToggleOfferActive,
  useToggleOfferFeatured,
} from '../../hooks/useAdminOffers';
import {
  formatOfferDate,
  getOfferDiscountLabel,
  getOfferScopeLabel,
  getOfferTypeLabel,
  isOfferExpired,
  isOfferLive,
} from '../../lib/offerDisplay';
import { cn } from '../../lib/utils';
import type { Offer } from '../../types';

type StatusFilter = 'all' | 'live' | 'inactive' | 'expired';

export function AdminOffersPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [editing, setEditing] = useState<Offer | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const { data: offers, isLoading } = useAdminOffers();
  const toggleActive = useToggleOfferActive();
  const toggleFeatured = useToggleOfferFeatured();
  const deleteOffer = useDeleteOffer();

  const filtered = useMemo(() => {
    const now = Date.now();
    let list = [...(offers ?? [])];
    if (statusFilter === 'live') list = list.filter((o) => isOfferLive(o, now));
    if (statusFilter === 'inactive') list = list.filter((o) => !o.is_active);
    if (statusFilter === 'expired') list = list.filter((o) => isOfferExpired(o, now));
    return list.sort((a, b) => new Date(b.valid_from).getTime() - new Date(a.valid_from).getTime());
  }, [offers, statusFilter]);

  const liveCount = offers?.filter((o) => isOfferLive(o)).length ?? 0;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (offer: Offer) => {
    setEditing(offer);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };

  const handleToggleActive = (offer: Offer) => {
    toggleActive.mutate(offer, {
      onSuccess: () =>
        toast.success(
          offer.is_active
            ? `"${offer.title}" deactivated — hidden from website`
            : `"${offer.title}" is now active on website`
        ),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Update failed'),
    });
  };

  const handleToggleFeatured = (offer: Offer) => {
    toggleFeatured.mutate(offer, {
      onSuccess: () =>
        toast.success(offer.is_featured ? 'Removed from featured slot' : 'Set as featured offer'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Update failed'),
    });
  };

  const handleDelete = (offer: Offer) => {
    if (!window.confirm(`Delete offer "${offer.title}"?`)) return;
    deleteOffer.mutate(offer.id, {
      onSuccess: () => toast.success('Offer deleted'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Delete failed'),
    });
  };

  return (
    <>
      <AdminHeader
        title="Offers"
        subtitle={`${liveCount} live on website · ${offers?.length ?? 0} total`}
      />

      <div className="space-y-4 p-4 sm:p-6">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-brand-charcoal-light">
              Create percentage or flat discounts. Only <strong>active</strong> and{' '}
              <strong>not expired</strong> offers show on the website. Featured offers appear in the
              home banner and top strip.
            </p>
            <button
              type="button"
              onClick={openCreate}
              className="shrink-0 rounded-lg bg-brand-maroon px-4 py-2 text-sm font-semibold text-white hover:bg-brand-maroon-dark"
            >
              + Add offer
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
              All
            </FilterChip>
            <FilterChip active={statusFilter === 'live'} onClick={() => setStatusFilter('live')}>
              Live on website
            </FilterChip>
            <FilterChip active={statusFilter === 'inactive'} onClick={() => setStatusFilter('inactive')}>
              Inactive
            </FilterChip>
            <FilterChip active={statusFilter === 'expired'} onClick={() => setStatusFilter('expired')}>
              Expired
            </FilterChip>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-brand-charcoal-light">
                <tr>
                  <th className="p-3 font-medium">Offer</th>
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Coupon</th>
                  <th className="p-3 font-medium">Valid till</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-brand-charcoal-light">
                      Loading offers…
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-brand-charcoal-light">
                      No offers match this filter
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => (
                    <OfferRow
                      key={o.id}
                      offer={o}
                      onEdit={() => openEdit(o)}
                      onToggleActive={() => handleToggleActive(o)}
                      onToggleFeatured={() => handleToggleFeatured(o)}
                      onDelete={() => handleDelete(o)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-3 lg:hidden">
            {isLoading ? (
              <p className="p-6 text-center text-sm text-brand-charcoal-light">Loading…</p>
            ) : (
              filtered.map((o) => (
                <OfferMobileCard
                  key={o.id}
                  offer={o}
                  onEdit={() => openEdit(o)}
                  onToggleActive={() => handleToggleActive(o)}
                  onToggleFeatured={() => handleToggleFeatured(o)}
                  onDelete={() => handleDelete(o)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <OfferFormModal open={formOpen} offer={editing} onClose={closeForm} />
    </>
  );
}

function OfferRow({
  offer,
  onEdit,
  onToggleActive,
  onToggleFeatured,
  onDelete,
}: {
  offer: Offer;
  onEdit: () => void;
  onToggleActive: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  const expired = isOfferExpired(offer);
  const live = isOfferLive(offer);

  return (
    <tr className="border-b last:border-0 hover:bg-gray-50/60">
      <td className="p-3">
        <div className="flex items-start gap-2">
          {offer.is_featured ? <StarIcon filled size="sm" className="mt-0.5 shrink-0" /> : null}
          <div>
            <p className="font-medium text-brand-charcoal">{offer.title}</p>
            <p className="text-xs font-semibold text-brand-maroon">{getOfferDiscountLabel(offer)}</p>
            <p className="text-[11px] text-brand-charcoal-light">{getOfferScopeLabel(offer)}</p>
          </div>
        </div>
      </td>
      <td className="p-3">
        <TypeBadge offer={offer} />
      </td>
      <td className="p-3 font-mono text-xs">{offer.coupon_code ?? '—'}</td>
      <td className="p-3 text-xs text-brand-charcoal-light">{formatOfferDate(offer.valid_till)}</td>
      <td className="p-3">
        {expired ? (
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            Expired
          </span>
        ) : (
          <StatusBadge active={live} label={{ on: 'Live', off: 'Hidden' }} />
        )}
      </td>
      <td className="p-3">
        <div className="flex flex-wrap justify-end gap-1">
          <ActionBtn onClick={onEdit}>Edit</ActionBtn>
          <ActionBtn onClick={onToggleActive}>{offer.is_active ? 'Deactivate' : 'Activate'}</ActionBtn>
          <ActionBtn onClick={onToggleFeatured}>{offer.is_featured ? 'Unfeature' : 'Feature'}</ActionBtn>
          <ActionBtn variant="danger" onClick={onDelete}>
            Delete
          </ActionBtn>
        </div>
      </td>
    </tr>
  );
}

function OfferMobileCard({
  offer,
  onEdit,
  onToggleActive,
  onToggleFeatured,
  onDelete,
}: {
  offer: Offer;
  onEdit: () => void;
  onToggleActive: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}) {
  const expired = isOfferExpired(offer);
  const live = isOfferLive(offer);

  return (
    <article className="rounded-lg border border-neutral-200 p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1">
            {offer.is_featured ? <StarIcon filled size="sm" /> : null}
            <p className="font-semibold text-brand-charcoal">{offer.title}</p>
          </div>
          <p className="text-xs font-semibold text-brand-maroon">{getOfferDiscountLabel(offer)}</p>
        </div>
        {expired ? (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
            Expired
          </span>
        ) : (
          <StatusBadge active={live} label={{ on: 'Live', off: 'Hidden' }} />
        )}
      </div>
      <TypeBadge offer={offer} />
      <div className="mt-3 flex flex-wrap gap-1 border-t border-neutral-200 pt-3">
        <ActionBtn onClick={onEdit}>Edit</ActionBtn>
        <ActionBtn onClick={onToggleActive}>{offer.is_active ? 'Deactivate' : 'Activate'}</ActionBtn>
        <ActionBtn onClick={onToggleFeatured}>{offer.is_featured ? 'Unfeature' : 'Feature'}</ActionBtn>
        <ActionBtn variant="danger" onClick={onDelete}>
          Delete
        </ActionBtn>
      </div>
    </article>
  );
}

function TypeBadge({ offer }: { offer: Offer }) {
  const isPercent = offer.discount_type === 'percentage';
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
        isPercent ? 'bg-violet-50 text-violet-700' : 'bg-orange-50 text-orange-700'
      )}
    >
      {getOfferTypeLabel(offer)}
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
