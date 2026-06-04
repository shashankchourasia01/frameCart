import { AdminHeader } from '../../components/admin/AdminHeader';
import { useCategories } from '../../hooks/useCategories';
import { CategoryIcon } from '../../components/icons';

export function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();

  return (
    <>
      <AdminHeader title="Categories" />
      <div className="p-6">
        <button type="button" className="mb-4 rounded-lg bg-brand-maroon px-4 py-2 text-sm text-white">
          + Add Category
        </button>
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Icon</th>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center">Loading...</td></tr>
              ) : (
                (categories ?? []).map((c) => (
                  <tr key={c.id} className="border-b">
                    <td className="p-3">
                      <CategoryIcon slug={c.slug} size="sm" variant="solid" />
                    </td>
                    <td className="p-3">{c.name}</td>
                    <td className="p-3 font-mono text-xs">{c.slug}</td>
                    <td className="p-3">{c.is_active ? 'Yes' : 'No'}</td>
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
