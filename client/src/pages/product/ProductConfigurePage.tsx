import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProductOrder } from '../../hooks/useProductOrder';
import { buildOrderPayload } from '../../lib/buildOrderPayload';
import { addRecentlyViewed } from '../../lib/recentlyViewed';
import { productFlowOuter, productFlowPad } from '../../lib/productFlowLayout';
import { PrintoProductGallery } from '../../components/product/printo/PrintoProductGallery';
import { PrintoOptionRow } from '../../components/product/printo/PrintoOptionRow';
import { PrintoPriceSummary } from '../../components/product/printo/PrintoPriceSummary';
import { PrintoUploadButton } from '../../components/product/printo/PrintoUploadButton';
import { DeliveryPincode } from '../../components/product/printo/DeliveryPincode';
import { FrameSizeGuide } from '../../components/product/printo/FrameSizeGuide';
import { ProductDetailSections } from '../../components/product/printo/ProductDetailSections';
import { ProductRecommendations } from '../../components/product/printo/ProductRecommendations';
import { DynamicFields } from '../../components/product/DynamicFields';
import { cn } from '../../lib/utils';

export function ProductConfigurePage() {
  const navigate = useNavigate();
  const {
    slug,
    product,
    isLoading,
    updateDraft,
    designs,
    sizes,
    selectedDesign,
    selectedSize,
    pricing,
    finish,
    orientation,
    quantity,
    dynamicFields,
    specialInstructions,
  } = useProductOrder();

  useEffect(() => {
    if (product) addRecentlyViewed(product);
  }, [product]);

  const goUpload = () => {
    if (!product || !selectedSize) {
      toast.error('Please select a frame size');
      return;
    }
    if (designs.length > 0 && !selectedDesign) {
      toast.error('Please select a frame style');
      return;
    }
    if (product.requires_dynamic_fields) {
      for (const f of product.dynamic_field_config?.fields ?? []) {
        if (!dynamicFields[f]?.trim()) {
          toast.error('Fill personalization fields');
          return;
        }
      }
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
        photos: [],
        instructions: specialInstructions,
        dynamicFields,
      })
    );
    navigate(`/product/${slug}/upload`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return <div className="bg-white p-8 text-center text-brand-charcoal-light">Product not found</div>;
  }

  const categoryName = product.categories?.name ?? 'Frames';
  const categorySlug = product.categories?.slug ?? 'family-relationship';
  const sizeLabels = sizes.map((s) => s.label || s.inches);

  const designOptions = designs.map((d) => ({ value: d.id, label: d.name }));
  const sizeOptions = sizes.map((s) => ({ value: s.inches, label: s.label || `${s.inches} in` }));
  const finishOptions = (product.print_finishes.length ? product.print_finishes : ['Matte', 'Glossy']).map(
    (f) => ({ value: f, label: f })
  );
  const orientationOptions = (product.orientations.length ? product.orientations : ['Portrait', 'Landscape']).map(
    (o) => ({ value: o, label: o })
  );

  return (
    <div className="min-h-screen bg-white pb-8 lg:pb-8">
      <div className={productFlowOuter}>
        <nav
          className={cn(productFlowPad, 'py-3 text-xs text-brand-charcoal-light lg:py-4 lg:text-sm')}
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-violet-700">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link to={`/category/${categorySlug}`} className="hover:text-violet-700">
            {categoryName}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-brand-charcoal">{product.name}</span>
        </nav>

        <div className={cn(productFlowPad, 'lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14')}>
          <div className="lg:sticky lg:top-20">
            <PrintoProductGallery
              images={product.images}
              productSlug={product.slug}
              designPreviewUrl={selectedDesign?.preview_url}
              sizeLabels={sizeLabels}
            />
          </div>

          <div className="py-4 lg:py-0">
            <h1 className="text-xl font-bold text-brand-charcoal lg:text-2xl xl:text-3xl">{product.name}</h1>
            {product.tagline && (
              <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light lg:text-base">
                {product.tagline}
              </p>
            )}

            <div className="mt-4 border-t border-neutral-100 lg:mt-6">
              {designs.length > 0 && (
                <PrintoOptionRow
                  label="Frame style"
                  value={selectedDesign?.id ?? designs[0].id}
                  options={designOptions}
                  onChange={(id) => updateDraft({ selectedDesignId: id })}
                />
              )}
              {sizes.length > 0 && (
                <PrintoOptionRow
                  label="Sizes"
                  value={selectedSize?.inches ?? sizes[0].inches}
                  options={sizeOptions}
                  onChange={(inches) => updateDraft({ selectedSize: inches })}
                />
              )}
              {orientationOptions.length > 0 && (
                <PrintoOptionRow
                  label="Orientation"
                  value={orientation}
                  options={orientationOptions}
                  onChange={(v) => updateDraft({ orientation: v })}
                />
              )}
              {finishOptions.length > 0 && (
                <PrintoOptionRow
                  label="Print finish"
                  value={finish}
                  options={finishOptions}
                  onChange={(v) => updateDraft({ selectedFinish: v })}
                />
              )}
            </div>

            <div className="mt-4 border-t border-neutral-100 pt-4">
              <PrintoUploadButton onClick={goUpload} />
            </div>

            <PrintoPriceSummary
              unitPrice={pricing.unitPrice}
              quantity={quantity}
              onQuantityChange={(q) => updateDraft({ quantity: q })}
            />

            {product.requires_dynamic_fields && product.dynamic_field_config?.fields && (
              <div className="mt-4 border-t border-neutral-200 pt-4">
                <DynamicFields
                  fields={product.dynamic_field_config.fields}
                  values={dynamicFields}
                  onChange={(v) => updateDraft({ dynamicFields: v })}
                />
              </div>
            )}

            <div className="mt-6 lg:mt-8">
              <DeliveryPincode />
              <FrameSizeGuide />
            </div>
          </div>
        </div>

        <div className={cn(productFlowPad, 'pb-8')}>
          <ProductDetailSections
            description={product.description}
            materialInfo={product.material_info}
            sizes={sizeLabels}
            categoryName={categoryName}
          />
          <ProductRecommendations categorySlug={categorySlug} currentSlug={product.slug} />
        </div>
      </div>
    </div>
  );
}
