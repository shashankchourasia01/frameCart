export function ProductCardCompactSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
      <div className="flex h-[7.5rem] items-center justify-center bg-neutral-100 px-3 py-4 sm:h-32">
        <div className="h-20 w-[70%] animate-shimmer rounded-md bg-shimmer bg-[length:200%_100%]" />
      </div>
      <div className="space-y-2 border-t border-neutral-100 px-2 py-2.5 text-center">
        <div className="mx-auto h-8 w-[85%] animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
        <div className="mx-auto h-4 w-14 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
        <div className="mx-auto h-3 w-12 animate-shimmer rounded bg-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  );
}
