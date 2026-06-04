import type { IconType } from 'react-icons';
import { AnimatedCounter } from '../shared/AnimatedCounter';
import { AppIcon } from '../icons';

interface StatCardProps {
  label: string;
  value: number;
  icon: IconType;
  prefix?: string;
  trend?: string;
}

export function StatCard({ label, value, icon, prefix = '', trend }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-maroon/10 text-brand-maroon">
          <AppIcon icon={icon} size="lg" />
        </span>
        {trend && <span className="text-xs text-brand-success">{trend}</span>}
      </div>
      <p className="mt-4 text-2xl font-bold">
        <AnimatedCounter value={value} prefix={prefix} />
      </p>
      <p className="text-sm text-brand-charcoal-light">{label}</p>
    </div>
  );
}
