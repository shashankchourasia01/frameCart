import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { IMAGES } from '../../constants/images';

interface LazyImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  aspect?: 'square' | 'video' | 'banner' | 'auto';
  placeholderLabel?: string;
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  banner: 'aspect-[21/9]',
  auto: '',
};

export function LazyImage({
  src,
  alt,
  className,
  aspect = 'square',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imageSrc = failed ? IMAGES.defaultProduct : src || IMAGES.defaultProduct;

  return (
    <div className={cn('relative overflow-hidden bg-brand-ivory-dark', aspectClasses[aspect], className)}>
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-shimmer bg-shimmer bg-[length:200%_100%]" />
      )}
      <motion.img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) {
            setFailed(true);
            setLoaded(true);
          }
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: loaded || failed ? 1 : 0.6 }}
        transition={{ duration: 0.35 }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
