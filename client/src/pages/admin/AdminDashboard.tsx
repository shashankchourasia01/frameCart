import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { STAT_ICONS } from '../../components/icons';
import { apiFetch } from '../../lib/utils';
import { useAuthStore } from '../../store/authStore';
import type { AdminDashboardStats } from '../../types';

const COLORS = ['#7B1D2E', '#C9972B', '#2D2D2D', '#6B6B6B'];

export function AdminDashboard() {
  const token = useAuthStore((s) => s.accessToken);
  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => apiFetch<AdminDashboardStats>('/admin/dashboard', { token: token ?? undefined }),
    enabled: Boolean(token),
  });

  const stats = data ?? {
    todayOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeProducts: 0,
    ordersTrend: [],
    categoryBreakdown: [],
    revenueTrend: [],
  };

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Today's Orders" value={stats.todayOrders} icon={STAT_ICONS.orders} trend="+12%" />
          <StatCard label="Total Revenue" value={stats.totalRevenue} icon={STAT_ICONS.revenue} prefix="₹" />
          <StatCard label="Pending Orders" value={stats.pendingOrders} icon={STAT_ICONS.pending} />
          <StatCard label="Active Products" value={stats.activeProducts} icon={STAT_ICONS.products} />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-4 font-semibold">Orders (7 days)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats.ordersTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#7B1D2E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border bg-white p-4">
            <h3 className="mb-4 font-semibold">By Category</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={stats.categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {stats.categoryBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
