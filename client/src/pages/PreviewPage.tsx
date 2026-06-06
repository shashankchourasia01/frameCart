import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FramePreview } from '../components/product/FramePreview';
import { CreateNowButton } from '../components/product/flow/CreateNowButton';
import { PriceDisplay } from '../components/product/flow/PriceDisplay';
import { CustomerDetailsForm } from '../components/checkout/CustomerDetailsForm';
import { useOrderStore } from '../store/orderStore';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useCreateOrder } from '../hooks/useOrders';
import { getDisplayPricing } from '../lib/productPricing';
import {
  customerFromDraft,
  validateCustomerDetails,
  normalizePhone,
  type CustomerDetailsInput,
} from '../lib/customerDetails';
import { pageTransition } from '../animations/variants';
import { WhatsAppIcon } from '../components/icons';
import { productFlowOuter, productFlowPad } from '../lib/productFlowLayout';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

export function PreviewPage() {
  const navigate = useNavigate();
  const draft = useOrderStore((s) => s.draft);
  const updateDraft = useOrderStore((s) => s.updateDraft);
  const clearDraft = useOrderStore((s) => s.clearDraft);
  const { sendOrder } = useWhatsApp();
  const createOrder = useCreateOrder();
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CustomerDetailsInput, string>>>({});

  const orientation = (draft.orientation === 'Landscape' ? 'Landscape' : 'Portrait') as 'Portrait' | 'Landscape';
  const finish = draft.selectedFinish ?? 'Matte';
  const unitPrice = draft.unitPrice ?? 0;
  const pricing = getDisplayPricing(unitPrice);
  const editPath = draft.productSlug ? `/product/${draft.productSlug}/review` : '/';

  const customer = customerFromDraft(draft);

  useEffect(() => {
    if (!draft.productName || !draft.selectedSize || !(draft.photoUrls?.length)) {
      navigate(draft.productSlug ? `/product/${draft.productSlug}` : '/', { replace: true });
    }
  }, [draft, navigate]);

  const handleCustomerChange = (patch: Partial<CustomerDetailsInput>) => {
    updateDraft(patch);
    setFieldErrors((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(patch) as (keyof CustomerDetailsInput)[]) {
        delete next[key];
      }
      return next;
    });
  };

  const confirm = async () => {
    if (!draft.productName) {
      toast.error('No order details');
      return;
    }

    const err = validateCustomerDetails(customer);
    if (err) {
      toast.error(err);
      return;
    }

    setSubmitting(true);
    let orderNumber: string | undefined;

    const phone = normalizePhone(customer.customerPhone);

    try {
      const res = await createOrder.mutateAsync({
        product_id: draft.productId,
        product_name: draft.productName,
        category_name: draft.categoryName,
        selected_design_id: draft.selectedDesignId,
        selected_design_name: draft.selectedDesignName,
        selected_size: draft.selectedSize!,
        selected_finish: draft.selectedFinish!,
        selected_orientation: draft.orientation!,
        quantity: draft.quantity ?? 1,
        unit_price: draft.unitPrice ?? 0,
        total_price: draft.totalPrice ?? 0,
        coupon_code: draft.couponCode,
        special_instructions: draft.specialInstructions,
        dynamic_field_values: draft.dynamicFields,
        uploaded_photo_urls: draft.photoUrls ?? [],
        preview_image_url: draft.previewUrl,
        customer_name: customer.customerName.trim(),
        customer_phone: phone,
        customer_email: customer.customerEmail?.trim() || undefined,
        customer_address: customer.customerAddress.trim(),
        customer_city: customer.customerCity.trim(),
        customer_state: customer.customerState.trim(),
        customer_pincode: customer.customerPincode.trim(),
      });
      orderNumber = res.order_number;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save order. Sending via WhatsApp anyway.');
    }

    const orderPayload = {
      productName: draft.productName,
      categoryName: draft.categoryName,
      selectedDesignName: draft.selectedDesignName,
      selectedSize: draft.selectedSize!,
      selectedFinish: draft.selectedFinish!,
      orientation: draft.orientation!,
      quantity: draft.quantity ?? 1,
      unitPrice: draft.unitPrice ?? 0,
      totalPrice: draft.totalPrice ?? 0,
      couponCode: draft.couponCode,
      specialInstructions: draft.specialInstructions,
      dynamicFields: draft.dynamicFields,
      photoUrls: draft.photoUrls ?? [],
      previewUrl: draft.previewUrl,
      orderNumber,
      customerName: customer.customerName.trim(),
      customerPhone: phone,
      customerEmail: customer.customerEmail?.trim(),
      customerAddress: customer.customerAddress.trim(),
      customerCity: customer.customerCity.trim(),
      customerState: customer.customerState.trim(),
      customerPincode: customer.customerPincode.trim(),
    };

    sendOrder(orderPayload);
    clearDraft();
    toast.success('Opening WhatsApp with your order details');
    navigate(`/order-confirm?order=${encodeURIComponent(orderNumber ?? 'pending')}`);
    setSubmitting(false);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'FrameCraft Preview',
        text: 'Check out my frame preview!',
      });
    }
  };

  if (!draft.productName) return null;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      className={cn(productFlowOuter, productFlowPad, 'py-8 pb-12 lg:pb-16')}
    >
      <h1 className="text-center text-lg font-bold text-brand-charcoal lg:text-2xl">Checkout</h1>
      <p className="mt-2 text-center text-sm text-brand-charcoal-light lg:text-base">
        Review your frame and enter delivery details
      </p>

      <div className="mt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
        <div>
          <div className="overflow-hidden rounded-xl bg-brand-ivory-dark lg:rounded-2xl">
            <FramePreview photoUrl={draft.photoUrls?.[0]} orientation={orientation} finish={finish} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
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
          <div className="mt-4 text-center lg:text-left">
            <p className="text-sm font-semibold text-brand-charcoal lg:text-base">{draft.productName}</p>
            <PriceDisplay unitPrice={pricing.unitPrice} mrp={pricing.mrp} discount={pricing.discount} />
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <CustomerDetailsForm value={customer} onChange={handleCustomerChange} errors={fieldErrors} />

          <div className="mt-6">
            <CreateNowButton
              label={submitting ? 'PLACING ORDER…' : 'PLACE ORDER ON WHATSAPP'}
              disabled={submitting}
              onClick={() => void confirm()}
            />
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-xs text-brand-charcoal-light lg:justify-start">
              <WhatsAppIcon size="sm" className="text-brand-whatsapp" />
              Order details are sent to FrameCraft on WhatsApp
            </p>
          </div>

          <Link to={editPath} className="mt-4 block text-center text-sm text-brand-maroon lg:text-left">
            Go back & edit
          </Link>
          <button
            type="button"
            onClick={() => void share()}
            className="mt-2 w-full text-sm text-brand-charcoal-light lg:w-auto"
          >
            Share preview
          </button>
        </div>
      </div>
    </motion.div>
  );
}
