export function getDisplayPricing(unitPrice: number) {
  const mrp = Math.round(unitPrice * 1.75);
  const discount =
    mrp > unitPrice ? Math.round(((mrp - unitPrice) / mrp) * 100) : 0;
  return { unitPrice, mrp, discount };
}
