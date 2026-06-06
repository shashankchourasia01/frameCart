import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProductOrder } from '../../hooks/useProductOrder';
import { buildOrderPayload } from '../../lib/buildOrderPayload';
import { ZoominPhotoUploader } from '../../components/product/flow/ZoominPhotoUploader';
import { PrintoUploadButton } from '../../components/product/printo/PrintoUploadButton';
import { formatPrice } from '../../lib/utils';
import { productFlowOuter, productFlowPad, productFlowStickyInner } from '../../lib/productFlowLayout';
import { cn } from '../../lib/utils';

export function ProductUploadPage() {
  const navigate = useNavigate();
  const {
    slug,
    product,
    isLoading,
    updateDraft,
    selectedDesign,
    selectedSize,
    finish,
    orientation,
    quantity,
    pricing,
    photoUrls,
    specialInstructions,
    dynamicFields,
  } = useProductOrder();

  const maxPhotos = product?.max_photos ?? 1;

  const continueReview = () => {
    if (!product || !selectedSize) {
      navigate(`/product/${slug}`);
      return;
    }
    if (photoUrls.length < 1) {
      toast.error('Please add at least 1 photo');
      return;
    }
    if (photoUrls.length < maxPhotos && maxPhotos > 1) {
      toast.error(`Please add ${maxPhotos} photos`);
      return;
    }

    updateDraft(
      buildOrderPayload({
        product,
        selectedDesign,
        selectedSize,
        finish,
        orientation,
        quantity,
        unitPrice: pricing.unitPrice,
        photos: photoUrls,
        instructions: specialInstructions,
        dynamicFields,
      })
    );
    navigate(`/product/${slug}/review`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }
  if (!product) {
    return <div className="bg-white p-8 text-center">Product not found</div>;
  }

  const total = pricing.unitPrice * quantity;

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-8">
      <div className={productFlowOuter}>
        <div className={cn(productFlowPad, 'border-b border-neutral-200 py-3 lg:py-4')}>
          <p className="text-xs text-brand-charcoal-light lg:text-sm">
            Step 2 of 3 — <span className="font-semibold text-brand-charcoal">Upload photos</span>
          </p>
          <h1 className="mt-1 text-lg font-bold text-brand-charcoal lg:text-2xl">{product.name}</h1>
          <Link
            to={`/product/${slug}`}
            className="mt-1 inline-block text-xs font-medium text-violet-700 hover:underline lg:text-sm"
          >
            ← Change size or options
          </Link>
        </div>

        <div className={cn(productFlowPad, 'py-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14')}>
          <div className="lg:max-w-xl">
            <ZoominPhotoUploader
              maxPhotos={maxPhotos}
              urls={photoUrls}
              onChange={(urls) => updateDraft({ photoUrls: urls })}
              productName={product.name}
            />
          </div>

          <div className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm lg:mt-0 lg:rounded-xl lg:border lg:border-neutral-200 lg:p-6 lg:pt-6">
            <div className="flex justify-between text-brand-charcoal-light">
              <span>Per piece</span>
              <span>{formatPrice(pricing.unitPrice)}</span>
            </div>
            <div className="flex justify-between font-bold text-brand-charcoal">
              <span>Total</span>
              <span className="text-orange-600">{formatPrice(total)}</span>
            </div>
            <div className="hidden pt-4 lg:block">
              <PrintoUploadButton
                label="Continue to preview"
                onClick={continueReview}
                disabled={photoUrls.length < 1}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className={productFlowStickyInner}>
          <PrintoUploadButton
            label="Continue to preview"
            onClick={continueReview}
            disabled={photoUrls.length < 1}
          />
        </div>
      </div>
    </div>
  );
}
