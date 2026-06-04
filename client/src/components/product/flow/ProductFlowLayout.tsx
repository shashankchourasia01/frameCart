import type { ReactNode } from 'react';
import { FlowStepBar } from './FlowStepBar';

interface ProductFlowLayoutProps {
  step: 1 | 2 | 3;
  percent: number;
  children: ReactNode;
  title?: string;
  hideStepBar?: boolean;
}

export function ProductFlowLayout({
  step,
  percent,
  children,
  title,
  hideStepBar,
}: ProductFlowLayoutProps) {
  return (
    <div className="min-h-screen bg-white pb-28">
      {title && (
        <div className="border-b border-brand-ivory-dark bg-white px-4 py-3 text-center">
          <h1 className="text-base font-bold text-brand-charcoal sm:text-lg">{title}</h1>
        </div>
      )}
      {!hideStepBar && <FlowStepBar step={step} percent={percent} />}
      <div className="mx-auto w-full max-w-lg px-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        {children}
      </div>
    </div>
  );
}
