const SIZES = [
  { label: '6×8 in', w: 28, h: 38 },
  { label: '8×10 in', w: 38, h: 48 },
  { label: '12×16 in', w: 52, h: 68 },
];

export function FrameSizeGuide() {
  return (
    <section className="border-t border-neutral-200 py-6">
      <h2 className="text-base font-bold text-brand-charcoal">Frame sizes</h2>
      <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light">
        Outer frame size — your photo may be cropped slightly for a perfect fit.
      </p>
      <div className="relative mt-6 flex h-44 items-end justify-start pl-4">
        <div className="absolute left-8 top-4 h-24 w-24 rounded-full bg-violet-100/60" aria-hidden />
        {SIZES.map((s, i) => (
          <div
            key={s.label}
            className="relative border-2 border-violet-400/80 bg-white/80"
            style={{
              width: s.w,
              height: s.h,
              marginLeft: i === 0 ? 0 : -8,
              zIndex: SIZES.length - i,
            }}
          >
            <span className="absolute -bottom-5 left-0 whitespace-nowrap text-[10px] font-medium text-brand-charcoal">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
