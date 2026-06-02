import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FramePreview } from '../components/product/FramePreview';
import { useOrderStore } from '../store/orderStore';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useCreateOrder } from '../hooks/useOrders';
import { pageTransition } from '../animations/variants';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export function PreviewPage() {
  const draft = useOrderStore((s) => s.draft);
  const { sendOrder } = useWhatsApp();
  const createOrder = useCreateOrder();

  const orientation = (draft.orientation === 'Landscape' ? 'Landscape' : 'Portrait') as 'Portrait' | 'Landscape';
  const finish = draft.selectedFinish ?? 'Matte';

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
      className="mx-auto max-w-2xl px-4 py-10 pb-24"
    >
      <h1 className="font-display text-3xl text-brand-maroon">Preview</h1>
      <p className="mt-2 text-sm text-brand-charcoal-light">
        Preview only — final design confirmed with you on WhatsApp
      </p>
      <div className="mt-8">
        <FramePreview
          photoUrl={draft.photoUrls?.[0]}
          orientation={orientation}
          finish={finish}
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {draft.selectedSize && (
          <span className="rounded-full bg-brand-maroon-light px-3 py-1 text-xs">{draft.selectedSize}</span>
        )}
        {draft.selectedFinish && (
          <span className="rounded-full bg-brand-maroon-light px-3 py-1 text-xs">{draft.selectedFinish}</span>
        )}
        {draft.orientation && (
          <span className="rounded-full bg-brand-maroon-light px-3 py-1 text-xs">{draft.orientation}</span>
        )}
      </div>
      <p className="mt-4 text-xl font-bold">{formatPrice(draft.totalPrice ?? 0)}</p>
      <ol className="mt-8 space-y-4 border-l-2 border-brand-gold pl-6">
        {['Order Placed', 'Design Confirmed', 'Printed & Shipped'].map((step, i) => (
          <li key={step} className={i === 0 ? 'font-semibold text-brand-maroon' : 'text-brand-charcoal-light'}>
            {step}
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => void confirm()}
        className="mt-8 w-full rounded-btn bg-brand-whatsapp py-4 font-semibold text-white"
      >
        Confirm Order on WhatsApp
      </button>
      <Link to="/" className="mt-4 block text-center text-sm text-brand-maroon">
        Go Back & Edit
      </Link>
      <button type="button" onClick={() => void share()} className="mt-2 w-full text-sm text-brand-charcoal-light">
        Share preview
      </button>
    </motion.div>
  );
}
