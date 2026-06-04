import type { OrderDetails, Product, ProductDesign, ProductSize } from '../types';

export function buildOrderPayload(params: {
  product: Product;
  selectedDesign?: ProductDesign;
  selectedSize?: ProductSize;
  finish: string;
  orientation: string;
  quantity: number;
  unitPrice: number;
  photos: string[];
  instructions?: string;
  dynamicFields?: Record<string, string>;
}): OrderDetails {
  const { product, selectedDesign, selectedSize, finish, orientation, quantity, unitPrice, photos, instructions, dynamicFields } =
    params;
  const totalPrice = unitPrice * quantity;
  return {
    productId: product.id,
    productName: product.name,
    categoryName: product.categories?.name,
    selectedDesignId: selectedDesign?.id,
    selectedDesignName: selectedDesign?.name,
    selectedSize: selectedSize!.inches,
    selectedFinish: finish,
    orientation,
    quantity,
    unitPrice,
    totalPrice,
    specialInstructions: instructions,
    dynamicFields: dynamicFields && Object.keys(dynamicFields).length ? dynamicFields : undefined,
    photoUrls: photos,
  };
}
