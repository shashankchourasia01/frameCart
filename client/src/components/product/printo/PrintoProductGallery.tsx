import { useState } from 'react';
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
      <div className="relative flex min-h-[11rem] w-full items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100/90 px-6 py-8 sm:min-h-[13rem] lg:min-h-[22rem] lg:rounded-xl lg:border lg:border-neutral-200">
        {showSizeChart ? (
          <div className="flex w-full flex-col items-center justify-center py-2 text-center lg:py-6">
            <p className="text-sm font-bold text-brand-charcoal lg:text-base">Available sizes</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-brand-charcoal-light lg:mt-6">
              {sizeLabels.map((s) => (
                <li
                  key={s}
                  className="rounded border border-neutral-200 bg-white px-4 py-2 font-medium text-brand-charcoal lg:px-5 lg:py-2.5"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-brand-charcoal-light lg:text-sm">
              Select size below to continue
            </p>
          </div>
        ) : mainSrc ? (
          <img
            src={mainSrc}
            alt="Product"
            className="max-h-[9.5rem] w-full max-w-[min(100%,18rem)] object-contain drop-shadow-md sm:max-h-[11rem] lg:max-h-[18rem] lg:max-w-[min(100%,26rem)] xl:max-h-[20rem] xl:max-w-[min(100%,28rem)]"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
      </div>

      <div className="relative border-t border-neutral-100 px-3 py-3 lg:border-t-0 lg:px-0 lg:pt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide lg:gap-3">
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                setShowSizeChart(false);
                setActive(i);
              }}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 bg-neutral-50 lg:h-20 lg:w-20',
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
                'flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded border-2 bg-white p-1 text-[9px] font-bold leading-tight text-violet-700 lg:h-20 lg:w-20 lg:text-[10px]',
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
