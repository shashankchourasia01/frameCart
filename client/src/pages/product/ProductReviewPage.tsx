import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProductOrder } from '../../hooks/useProductOrder';
import { PhotoEditModal } from '../../components/product/flow/PhotoEditModal';
import { PrintoUploadButton } from '../../components/product/printo/PrintoUploadButton';
import { FramePreview } from '../../components/product/FramePreview';
import { formatPrice } from '../../lib/utils';
import { productFlowOuter, productFlowPad } from '../../lib/productFlowLayout';
import { cn } from '../../lib/utils';

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
    quantity,
  } = useProductOrder();

  const [editIndex, setEditIndex] = useState<number | null>(null);

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
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }
  if (!product || photoUrls.length < 1) {
    navigate(`/product/${slug}/upload`, { replace: true });
    return null;
  }

  const orient = (orientation === 'Landscape' ? 'Landscape' : 'Portrait') as 'Portrait' | 'Landscape';
  const total = pricing.unitPrice * quantity;

  return (
    <div className="min-h-screen bg-white pb-8 lg:pb-8">
      <div className={productFlowOuter}>
        <div className={cn(productFlowPad, 'border-b border-neutral-200 py-3 lg:py-4')}>
          <p className="text-xs text-brand-charcoal-light lg:text-sm">
            Step 3 of 3 — <span className="font-semibold text-brand-charcoal">Review & checkout</span>
          </p>
          <h1 className="mt-1 text-lg font-bold text-brand-charcoal lg:text-2xl">{product.name}</h1>
        </div>

        <div className={cn(productFlowPad, 'py-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14')}>
          <div>
            <p className="text-center text-sm text-brand-charcoal-light lg:text-left">
              Tap your photo to edit crop or rotation before we print.
            </p>

            <div className="mt-6 flex justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => setEditIndex(0)}
                className="w-full max-w-xs overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 lg:max-w-md xl:max-w-lg"
              >
                <FramePreview photoUrl={photoUrls[0]} orientation={orient} finish={finish} />
              </button>
            </div>

            {photoUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 lg:grid-cols-5">
                {photoUrls.map((url, i) => (
                  <button
                    key={`${url}-${i}`}
                    type="button"
                    onClick={() => setEditIndex(i)}
                    className="aspect-square overflow-hidden rounded-lg border-2 border-neutral-200"
                  >
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="space-y-2 rounded-xl border border-neutral-200 p-5 text-sm">
              <p className="font-semibold text-brand-charcoal">{draft.productName}</p>
              {selectedSize && (
                <p className="text-xs text-brand-charcoal-light">
                  {selectedSize.inches} · {finish} · {orientation}
                </p>
              )}
              <div className="flex justify-between border-t border-neutral-100 pt-3 font-bold">
                <span>Total</span>
                <span className="text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to={`/product/${slug}/upload`}
              className="mt-4 block text-center text-sm font-medium text-violet-700 hover:underline lg:text-left"
            >
              Back to upload
            </Link>

            <div className="mt-6">
              <PrintoUploadButton label="Continue to checkout" onClick={goCheckout} />
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}
