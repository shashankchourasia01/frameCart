import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from './useProducts';
import { useOrderStore } from '../store/orderStore';
import { getDisplayPricing } from '../lib/productPricing';
import type { ProductDesign, ProductSize } from '../types';

export function useProductOrder() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError } = useProduct(slug);
  const draft = useOrderStore((s) => s.draft);
  const updateDraft = useOrderStore((s) => s.updateDraft);

  const designs = product?.available_designs ?? [];
  const sizes = product?.available_sizes ?? [];

  useEffect(() => {
    if (!product) return;
    const patch: Partial<typeof draft> = { productSlug: product.slug };
    if (!draft.selectedSize && sizes[0]) patch.selectedSize = sizes[0].inches;
    if (!draft.selectedDesignId && designs[0]) patch.selectedDesignId = designs[0].id;
    if (!draft.selectedFinish && product.print_finishes?.[0])
      patch.selectedFinish = product.print_finishes[0];
    if (!draft.orientation && product.orientations?.[0]) patch.orientation = product.orientations[0];
    if (!draft.quantity) patch.quantity = 1;
    if (draft.productSlug !== product.slug || Object.keys(patch).length > 1) {
      updateDraft(patch);
    }
  }, [product, draft.productSlug, draft.selectedSize, draft.selectedDesignId, draft.selectedFinish, draft.orientation, draft.quantity, designs, sizes, updateDraft]);

  const selectedDesign = useMemo((): ProductDesign | undefined => {
    if (draft.selectedDesignId) {
      return designs.find((d) => d.id === draft.selectedDesignId) ?? designs[0];
    }
    return designs[0];
  }, [designs, draft.selectedDesignId]);

  const selectedSize = useMemo((): ProductSize | undefined => {
    if (draft.selectedSize) {
      return sizes.find((s) => s.inches === draft.selectedSize) ?? sizes[0];
    }
    return sizes[0];
  }, [sizes, draft.selectedSize]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    return Number(product.base_price) + Number(selectedSize?.price_add ?? 0);
  }, [product, selectedSize]);

  const quantity = draft.quantity ?? 1;
  const totalPrice = unitPrice * quantity;
  const pricing = getDisplayPricing(unitPrice);

  const finish = draft.selectedFinish ?? product?.print_finishes?.[0] ?? 'Matte';
  const orientation = draft.orientation ?? product?.orientations?.[0] ?? 'Portrait';
  const photoUrls = draft.photoUrls ?? [];
  const specialInstructions = draft.specialInstructions ?? '';
  const dynamicFields = draft.dynamicFields ?? {};

  return {
    slug,
    product,
    isLoading,
    isError,
    draft,
    updateDraft,
    designs,
    sizes,
    selectedDesign,
    selectedSize,
    unitPrice,
    totalPrice,
    quantity,
    pricing,
    finish,
    orientation,
    photoUrls,
    specialInstructions,
    dynamicFields,
  };
}
