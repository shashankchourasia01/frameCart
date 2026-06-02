import { useState } from 'react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useAdminOrders, useUpdateOrderStatus } from '../../hooks/useOrders';
import { formatPrice } from '../../lib/utils';
import type { OrderStatus } from '../../types';
import { openWhatsApp } from '../../lib/whatsapp';

const STATUSES: (OrderStatus | 'all')[] = [
  'all', 'pending', 'confirmed', 'designing', 'printing', 'shipped', 'delivered', 'cancelled',
];

export function AdminOrdersPage() {
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { data: orders, isLoading } = useAdminOrders({
    status: status === 'all' ? undefined : status,
    search: search || undefined,
  });
  const updateStatus = useUpdateOrderStatus();

  return (
    <>
      <AdminHeader title="Orders" />
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="search"
            placeholder="Order # or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`rounded-full px-3 py-1 text-xs capitalize ${
                status === s ? 'bg-brand-maroon text-white' : 'bg-white border'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Order #</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-8 text-center">Loading...</td></tr>
              ) : (
                (orders ?? []).map((o) => (
                  <tr key={o.id} className="border-b">
                    <td className="p-3 font-mono text-xs">{o.order_number}</td>
                    <td className="p-3">{o.customer_phone ?? '—'}</td>
                    <td className="p-3">{o.product_name}</td>
                    <td className="p-3">{formatPrice(Number(o.total_price))}</td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={(e) =>
                          updateStatus.mutate({ id: o.id, status: e.target.value })
                        }
                        className="rounded border px-2 py-1 text-xs"
                      >
                        {STATUSES.filter((s) => s !== 'all').map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp(`Update for order ${o.order_number}: status is ${o.status}`)
                        }
                        className="text-brand-whatsapp text-xs font-medium"
                      >
                        WhatsApp
                      </button>
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
