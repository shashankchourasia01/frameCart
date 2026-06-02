import { AdminHeader } from '../../components/admin/AdminHeader';
import { useOffers } from '../../hooks/useOffers';
import { formatPrice } from '../../lib/utils';

export function AdminOffersPage() {
  const { data: offers, isLoading } = useOffers();

  return (
    <>
      <AdminHeader title="Offers" />
      <div className="p-6">
        <button type="button" className="mb-4 rounded-lg bg-brand-maroon px-4 py-2 text-sm text-white">
          + Add Offer
        </button>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Coupon</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Uses</th>
                <th className="p-3">Featured</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center">Loading...</td></tr>
              ) : (
                (offers ?? []).map((o) => (
                  <tr key={o.id} className="border-b">
                    <td className="p-3">{o.title}</td>
                    <td className="p-3 font-mono">{o.coupon_code}</td>
                    <td className="p-3">
                      {o.discount_type === 'percentage'
                        ? `${o.discount_value}%`
                        : formatPrice(Number(o.discount_value))}
                    </td>
                    <td className="p-3">{o.used_count}{o.max_uses ? ` / ${o.max_uses}` : ''}</td>
                    <td className="p-3">{o.is_featured ? '★' : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
