import { AdminHeader } from '../../components/admin/AdminHeader';
import { useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../lib/utils';
import { ImagePlaceholder } from '../../components/shared/ImagePlaceholder';

export function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();

  return (
    <>
      <AdminHeader title="Products" />
      <div className="p-6">
        <button type="button" className="mb-4 rounded-lg bg-brand-maroon px-4 py-2 text-sm text-white">
          + Add New Product
        </button>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
              ) : (
                (products ?? []).map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-3">
                      {p.images[0] ? (
                        <img src={p.images[0]} alt="" className="h-12 w-12 rounded object-cover" />
                      ) : (
                        <ImagePlaceholder className="h-12 w-12" aspect="auto" label="" />
                      )}
                    </td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">{formatPrice(Number(p.base_price))}</td>
                    <td className="p-3">
                      <span className={p.is_active ? 'text-brand-success' : 'text-brand-charcoal-light'}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
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
