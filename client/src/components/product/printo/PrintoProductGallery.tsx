import { useState } from 'react';
import { LazyImage } from '../../shared/LazyImage';
import { cn } from '../../../lib/utils';
import { getProductImages } from '../../../constants/images';
import { HiChevronRight } from '../../icons';

interface PrintoProductGalleryProps {
  images: string[];
  productSlug: string;
  designPreviewUrl?: string;
  sizeLabels?: string[];
}

export function PrintoProductGallery({
  images,
  productSlug,
  designPreviewUrl,
  sizeLabels = [],
}: PrintoProductGalleryProps) {
  const base = getProductImages(productSlug, images);
  const gallery = designPreviewUrl ? [designPreviewUrl, ...base.filter((u) => u !== designPreviewUrl)] : base;
  const thumbs = gallery.slice(0, 5);
  const [active, setActive] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const mainSrc = showSizeChart ? null : thumbs[active];

  return (
    <div className="bg-white">
      <div className="relative aspect-square w-full bg-neutral-50">
        {showSizeChart ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <p className="text-sm font-bold text-brand-charcoal">Available sizes</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-charcoal-light">
              {sizeLabels.map((s) => (
                <li key={s} className="rounded border border-neutral-200 bg-white px-4 py-2 font-medium text-brand-charcoal">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-brand-charcoal-light">Select size below to continue</p>
          </div>
        ) : mainSrc ? (
          <LazyImage src={mainSrc} alt="Product" className="h-full w-full object-cover" aspect="square" />
        ) : null}
      </div>

      <div className="relative border-t border-neutral-100 px-3 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setShowSizeChart(false);
                setActive(i);
              }}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 bg-neutral-50',
                !showSizeChart && active === i
                  ? 'border-violet-600'
                  : 'border-neutral-200'
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
          {sizeLabels.length > 0 && (
            <button
              type="button"
              onClick={() => setShowSizeChart(true)}
              className={cn(
                'flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded border-2 bg-white p-1 text-[9px] font-bold leading-tight text-violet-700',
                showSizeChart ? 'border-violet-600' : 'border-neutral-200'
              )}
            >
              SIZE
              <br />
              CHART
            </button>
          )}
        </div>
        {thumbs.length > 3 && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow">
            <HiChevronRight className="h-4 w-4 text-brand-charcoal" />
          </span>
        )}
      </div>
    </div>
  );
}
