import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProductOrder } from '../../hooks/useProductOrder';
import { PhotoEditModal } from '../../components/product/flow/PhotoEditModal';
import { PrintoUploadButton } from '../../components/product/printo/PrintoUploadButton';
import { FramePreview } from '../../components/product/FramePreview';
import { formatPrice } from '../../lib/utils';

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
    <div className="min-h-screen bg-white pb-24">
      <div className="mx-auto max-w-lg">
        <div className="border-b border-neutral-200 px-4 py-3">
          <p className="text-xs text-brand-charcoal-light">
            Step 3 of 3 — <span className="font-semibold text-brand-charcoal">Review & checkout</span>
          </p>
          <h1 className="mt-1 text-lg font-bold text-brand-charcoal">{product.name}</h1>
        </div>

        <div className="px-4 py-5">
          <p className="text-center text-sm text-brand-charcoal-light">
            Tap your photo to edit crop or rotation before we print.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setEditIndex(0)}
              className="w-full max-w-xs overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
            >
              <FramePreview photoUrl={photoUrls[0]} orientation={orient} finish={finish} />
            </button>
          </div>

          {photoUrls.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
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

          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <p className="font-semibold text-brand-charcoal">{draft.productName}</p>
            {selectedSize && (
              <p className="text-xs text-brand-charcoal-light">
                {selectedSize.inches} · {finish} · {orientation}
              </p>
            )}
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span className="text-orange-600">{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            to={`/product/${slug}/upload`}
            className="mt-4 block text-center text-sm font-medium text-violet-700 hover:underline"
          >
            Back to upload
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto max-w-lg">
          <PrintoUploadButton label="Continue to checkout" onClick={goCheckout} />
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
