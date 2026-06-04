import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductOrder } from '../../hooks/useProductOrder';
import { ProductFlowLayout } from '../../components/product/flow/ProductFlowLayout';
import { PhotoEditModal } from '../../components/product/flow/PhotoEditModal';
import { PriceDisplay } from '../../components/product/flow/PriceDisplay';
import { CreateNowButton } from '../../components/product/flow/CreateNowButton';
import { FramePreview } from '../../components/product/FramePreview';
import { pageTransition } from '../../animations/variants';

export function ProductReviewPage() {
  const navigate = useNavigate();
  const {
    slug,
    product,
    isLoading,
    updateDraft,
    photoUrls,
    finish,
    orientation,
    selectedSize,
    pricing,
    draft,
  } = useProductOrder();

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const reviewed = photoUrls.length > 0 ? 1 : 0;
  const reviewPercent = Math.min(60 + Math.round((reviewed / Math.max(photoUrls.length, 1)) * 35), 95);

  const goCheckout = () => {
    navigate('/preview');
  };

  const updatePhoto = (index: number, url: string) => {
    const next = [...photoUrls];
    next[index] = url;
    updateDraft({ photoUrls: next });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-maroon border-t-transparent" />
      </div>
    );
  }
  if (!product || photoUrls.length < 1) {
    navigate(`/product/${slug}/upload`, { replace: true });
    return null;
  }

  const orient = (orientation === 'Landscape' ? 'Landscape' : 'Portrait') as 'Portrait' | 'Landscape';

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate">
      <ProductFlowLayout step={3} percent={reviewPercent} title={product.name}>
        <div className="py-5">
          <p className="text-center text-xs font-semibold tracking-wide text-brand-charcoal-light">
            ALERT — IMPORTANT
          </p>
          <p className="mt-2 text-center text-sm text-brand-charcoal-light">
            Tap a photo to edit crop, rotate, or replace. Your print will match the preview.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setEditIndex(0)}
              className="w-full max-w-xs overflow-hidden rounded-xl bg-brand-ivory-dark"
            >
              <FramePreview
                photoUrl={photoUrls[0]}
                orientation={orient}
                finish={finish}
              />
            </button>
          </div>

          {photoUrls.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {photoUrls.map((url, i) => (
                <button
                  key={`${url}-${i}`}
                  type="button"
                  onClick={() => setEditIndex(i)}
                  className="aspect-square overflow-hidden rounded-lg border-2 border-brand-ivory-dark hover:border-brand-maroon"
                >
                  <img src={url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-brand-ivory-dark">
              <div
                className="h-full rounded-full bg-brand-maroon transition-all"
                style={{ width: `${reviewPercent}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-brand-charcoal-light">{reviewPercent}% complete</p>
          </div>

          <div className="mt-6 border-t border-brand-ivory-dark pt-5">
            <p className="text-sm font-bold text-brand-charcoal">{draft.productName}</p>
            {selectedSize && (
              <p className="text-xs text-brand-charcoal-light">
                {selectedSize.inches} · {finish} · {orientation}
              </p>
            )}
            <PriceDisplay
              unitPrice={pricing.unitPrice}
              mrp={pricing.mrp}
              discount={pricing.discount}
              compact
            />
          </div>

          <div className="mt-6 space-y-3">
            <CreateNowButton label="CONTINUE TO CHECKOUT" onClick={goCheckout} />
            <button
              type="button"
              onClick={() => navigate(`/product/${slug}/upload`)}
              className="w-full text-center text-sm text-brand-maroon"
            >
              Back to upload
            </button>
          </div>
        </div>
      </ProductFlowLayout>

      {editIndex !== null && photoUrls[editIndex] && (
        <PhotoEditModal
          photoUrl={photoUrls[editIndex]}
          onClose={() => setEditIndex(null)}
          onUpdate={(url) => {
            updatePhoto(editIndex, url);
            setEditIndex(null);
          }}
        />
      )}
    </motion.div>
  );
}
