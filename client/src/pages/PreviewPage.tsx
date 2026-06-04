import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FramePreview } from '../components/product/FramePreview';
import { CreateNowButton } from '../components/product/flow/CreateNowButton';
import { PriceDisplay } from '../components/product/flow/PriceDisplay';
import { useOrderStore } from '../store/orderStore';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useCreateOrder } from '../hooks/useOrders';
import { getDisplayPricing } from '../lib/productPricing';
import { pageTransition } from '../animations/variants';
import toast from 'react-hot-toast';

export function PreviewPage() {
  const draft = useOrderStore((s) => s.draft);
  const { sendOrder } = useWhatsApp();
  const createOrder = useCreateOrder();

  const orientation = (draft.orientation === 'Landscape' ? 'Landscape' : 'Portrait') as 'Portrait' | 'Landscape';
  const finish = draft.selectedFinish ?? 'Matte';
  const unitPrice = draft.unitPrice ?? 0;
  const pricing = getDisplayPricing(unitPrice);
  const editPath = draft.productSlug ? `/product/${draft.productSlug}/review` : '/';

  const confirm = async () => {
    if (!draft.productName) {
      toast.error('No order details');
      return;
    }
    try {
      await createOrder.mutateAsync({
        product_name: draft.productName,
        selected_size: draft.selectedSize,
        selected_finish: draft.selectedFinish,
        selected_orientation: draft.orientation,
        quantity: draft.quantity,
        unit_price: draft.unitPrice,
        total_price: draft.totalPrice,
        special_instructions: draft.specialInstructions,
        dynamic_field_values: draft.dynamicFields,
        uploaded_photo_urls: draft.photoUrls,
      });
    } catch {
      /* API optional */
    }
    sendOrder({
      productName: draft.productName!,
      selectedDesignName: draft.selectedDesignName,
      selectedSize: draft.selectedSize!,
      selectedFinish: draft.selectedFinish!,
      orientation: draft.orientation!,
      quantity: draft.quantity ?? 1,
      unitPrice: draft.unitPrice ?? 0,
      totalPrice: draft.totalPrice ?? 0,
      specialInstructions: draft.specialInstructions,
      dynamicFields: draft.dynamicFields,
      photoUrls: draft.photoUrls ?? [],
      previewUrl: draft.previewUrl,
    });
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'FrameCraft Preview',
        text: 'Check out my frame preview!',
      });
    }
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-lg px-4 py-8 pb-28"
    >
      <h1 className="text-center text-lg font-bold text-brand-charcoal">{draft.productName ?? 'Your order'}</h1>
      <p className="mt-2 text-center text-sm text-brand-charcoal-light">
        Review your frame — we confirm final details on WhatsApp
      </p>
      <div className="mt-6 overflow-hidden rounded-xl bg-brand-ivory-dark">
        <FramePreview
          photoUrl={draft.photoUrls?.[0]}
          orientation={orientation}
          finish={finish}
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {draft.selectedSize && (
          <span className="rounded-full bg-brand-ivory-dark px-3 py-1 text-xs">{draft.selectedSize}</span>
        )}
        {draft.selectedFinish && (
          <span className="rounded-full bg-brand-ivory-dark px-3 py-1 text-xs">{draft.selectedFinish}</span>
        )}
        {draft.orientation && (
          <span className="rounded-full bg-brand-ivory-dark px-3 py-1 text-xs">{draft.orientation}</span>
        )}
      </div>
      <div className="mt-4 text-center">
        <PriceDisplay unitPrice={pricing.unitPrice} mrp={pricing.mrp} discount={pricing.discount} />
      </div>
      <div className="mt-8">
        <CreateNowButton
          label="CONFIRM ON WHATSAPP"
          onClick={() => void confirm()}
        />
      </div>
      <Link to={editPath} className="mt-4 block text-center text-sm text-brand-maroon">
        Go back & edit
      </Link>
      <button type="button" onClick={() => void share()} className="mt-2 w-full text-sm text-brand-charcoal-light">
        Share preview
      </button>
    </motion.div>
  );
}
