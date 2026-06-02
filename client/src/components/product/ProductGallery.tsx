import { useState } from 'react';
import { LazyImage } from '../shared/LazyImage';
import { cn } from '../../lib/utils';
import { getProductImages } from '../../constants/images';

interface ProductGalleryProps {
  images: string[];
  designPreviewUrl?: string;
  productSlug?: string;
}

export function ProductGallery({ images, designPreviewUrl, productSlug = '' }: ProductGalleryProps) {
  const baseImages = getProductImages(productSlug, images);
  const gallery = designPreviewUrl
    ? [designPreviewUrl, ...baseImages.filter((i) => i !== designPreviewUrl)]
    : baseImages;
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const thumbs = gallery.slice(0, 4);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-card shadow-card">
        <LazyImage src={current} alt="Product" className="w-full" aspect="square" />
      </div>

      {thumbs.length > 1 && (
        <div className="mt-4 hidden gap-3 sm:grid sm:grid-cols-4">
          {thumbs.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'overflow-hidden rounded-lg border-2 transition',
                active === i ? 'border-brand-maroon ring-1 ring-brand-maroon/30' : 'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              <LazyImage src={img} alt="" className="aspect-square w-full" />
            </button>
          ))}
        </div>
      )}

      {thumbs.length > 1 && (
        <div className="mt-3 flex justify-center gap-2 sm:hidden">
          {thumbs.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                active === i ? 'w-6 bg-brand-maroon' : 'w-2 bg-brand-ivory-dark'
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
