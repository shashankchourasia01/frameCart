import { AnimatedCounter } from '../shared/AnimatedCounter';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  prefix?: string;
  trend?: string;
}

export function StatCard({ label, value, icon, prefix = '', trend }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        {trend && <span className="text-xs text-brand-success">{trend}</span>}
      </div>
      <p className="mt-4 text-2xl font-bold">
        <AnimatedCounter value={value} prefix={prefix} />
      </p>
      <p className="text-sm text-brand-charcoal-light">{label}</p>
    </div>
  );
}
