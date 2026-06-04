import { useState } from 'react';
import { LazyImage } from '../shared/LazyImage';
import { cn } from '../../lib/utils';
import { getProductImages } from '../../constants/images';

interface ProductGalleryProps {
  images: string[];
  designPreviewUrl?: string;
  productSlug?: string;
  variant?: 'default' | 'hero';
}

export function ProductGallery({
  images,
  designPreviewUrl,
  productSlug = '',
  variant = 'default',
}: ProductGalleryProps) {
  const baseImages = getProductImages(productSlug, images);
  const gallery = designPreviewUrl
    ? [designPreviewUrl, ...baseImages.filter((i) => i !== designPreviewUrl)]
    : baseImages;
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const slides = gallery.slice(0, 6);

  if (variant === 'hero') {
    return (
      <div className="relative w-full bg-white">
        <div className="relative aspect-square w-full overflow-hidden sm:mx-auto sm:max-w-md sm:rounded-2xl">
          <LazyImage src={current} alt="Product" className="h-full w-full" aspect="square" />
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    active === i ? 'w-6 bg-brand-maroon' : 'w-2 bg-white/80'
                  )}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-card shadow-card">
        <LazyImage src={current} alt="Product" className="w-full" aspect="square" />
      </div>
      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((_, i) => (
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
