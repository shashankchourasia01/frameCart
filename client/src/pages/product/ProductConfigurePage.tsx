import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useProductOrder } from '../../hooks/useProductOrder';
import { buildOrderPayload } from '../../lib/buildOrderPayload';
import { addRecentlyViewed } from '../../lib/recentlyViewed';
import { PrintoProductGallery } from '../../components/product/printo/PrintoProductGallery';
import { PrintoOptionRow } from '../../components/product/printo/PrintoOptionRow';
import { PrintoPriceSummary } from '../../components/product/printo/PrintoPriceSummary';
import { PrintoUploadButton } from '../../components/product/printo/PrintoUploadButton';
import { DeliveryPincode } from '../../components/product/printo/DeliveryPincode';
import { FrameSizeGuide } from '../../components/product/printo/FrameSizeGuide';
import { ProductDetailSections } from '../../components/product/printo/ProductDetailSections';
import { ProductRecommendations } from '../../components/product/printo/ProductRecommendations';
import { DynamicFields } from '../../components/product/DynamicFields';
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
  const categorySlug = product.categories?.slug ?? 'wedding';
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
    <div className="min-h-screen bg-white pb-24">
      <div className="mx-auto max-w-lg">
        {/* Breadcrumbs */}
        <nav className="px-4 py-3 text-xs text-brand-charcoal-light" aria-label="Breadcrumb">
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

        <PrintoProductGallery
          images={product.images}
          productSlug={product.slug}
          designPreviewUrl={selectedDesign?.preview_url}
          sizeLabels={sizeLabels}
        />

        <div className="px-4 py-4">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl font-bold text-brand-charcoal">{product.name}</h1>
          </div>
          {product.tagline && (
            <p className="mt-2 text-sm leading-relaxed text-brand-charcoal-light">{product.tagline}</p>
          )}

          <div className="mt-4 border-t border-neutral-100">
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

          <div className="mt-6">
            <PrintoUploadButton onClick={goUpload} />
          </div>

          <DeliveryPincode />
          <FrameSizeGuide />

          <ProductDetailSections
            description={product.description}
            materialInfo={product.material_info}
            sizes={sizeLabels}
            categoryName={categoryName}
          />

          <ProductRecommendations categorySlug={categorySlug} currentSlug={product.slug} />
        </div>
      </div>

      {/* Sticky upload bar on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur md:bottom-0 lg:max-w-lg lg:left-1/2 lg:-translate-x-1/2">
        <PrintoUploadButton onClick={goUpload} />
      </div>
    </div>
  );
}
