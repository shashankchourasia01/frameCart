export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-card">
      <div className="aspect-square animate-shimmer bg-shimmer bg-[length:200%_100%]" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
        <div className="h-3 w-1/2 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
        <div className="h-5 w-1/3 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  );
}
