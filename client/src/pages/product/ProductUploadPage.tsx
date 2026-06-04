import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useProductOrder } from '../../hooks/useProductOrder';
import { buildOrderPayload } from '../../lib/buildOrderPayload';
import { ProductFlowLayout } from '../../components/product/flow/ProductFlowLayout';
import { ZoominPhotoUploader } from '../../components/product/flow/ZoominPhotoUploader';
import { CreateNowButton } from '../../components/product/flow/CreateNowButton';
import { pageTransition } from '../../animations/variants';

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
  const uploadPercent = maxPhotos > 0 ? Math.min(15 + Math.round((photoUrls.length / maxPhotos) * 40), 55) : 30;

  const continueReview = () => {
    if (!product || !selectedSize) {
      navigate(`/product/${slug}`);
      return;
    }
    if (photoUrls.length < 1) {
      toast.error(`Please add at least 1 photo`);
      return;
    }
    if (photoUrls.length < maxPhotos && maxPhotos > 1) {
      toast.error(`Please pick ${maxPhotos} photos`);
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-maroon border-t-transparent" />
      </div>
    );
  }
  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate">
      <ProductFlowLayout
        step={2}
        percent={uploadPercent}
        title={product.name}
      >
        <div className="py-6">
          <ZoominPhotoUploader
            maxPhotos={maxPhotos}
            urls={photoUrls}
            onChange={(urls) => updateDraft({ photoUrls: urls })}
            productName={product.name}
          />

          <div className="mt-8">
            <CreateNowButton
              label="CONTINUE"
              onClick={continueReview}
              disabled={photoUrls.length < 1}
            />
          </div>
        </div>
      </ProductFlowLayout>
    </motion.div>
  );
}
