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
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer bg-shimmer bg-[length:200%_100%]" />
      )}
      <motion.img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) {
            setLoaded(false);
            setFailed(true);
          }
        }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: loaded ? 1 : 0.5 }}
        transition={{ duration: 0.4 }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
