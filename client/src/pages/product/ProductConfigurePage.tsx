import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useProductOrder } from '../../hooks/useProductOrder';
import { buildOrderPayload } from '../../lib/buildOrderPayload';
import { ProductGallery } from '../../components/product/ProductGallery';
import { DesignSelector } from '../../components/product/DesignSelector';
import { DynamicFields } from '../../components/product/DynamicFields';
import { Breadcrumbs } from '../../components/product/flow/Breadcrumbs';
import { PriceDisplay } from '../../components/product/flow/PriceDisplay';
import { ChipSelect } from '../../components/product/flow/ChipSelect';
import { CreateNowButton } from '../../components/product/flow/CreateNowButton';
import { ProductFlowLayout } from '../../components/product/flow/ProductFlowLayout';
import { ZoominProductSections } from '../../components/product/flow/ZoominProductSections';
import { pageTransition } from '../../animations/variants';
import type { ProductDesign } from '../../types';

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

  const goUpload = () => {
    if (!product || !selectedSize) {
      toast.error('Please select a frame size');
      return;
    }
    if (designs.length > 0 && !selectedDesign) {
      toast.error('Please select a design');
      return;
    }
    if (product.requires_dynamic_fields) {
      const fields = product.dynamic_field_config?.fields ?? [];
      for (const f of fields) {
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-maroon border-t-transparent" />
      </div>
    );
  }
  if (!product) {
    return <div className="p-8 text-center text-brand-charcoal-light">Product not found</div>;
  }

  const unitsSold = Math.max(product.review_count * 127, 1200);
  const sizeOptions = sizes.map((s) => ({ value: s.inches, label: s.inches }));
  const finishOptions = (product.print_finishes.length ? product.print_finishes : ['Matte', 'Glossy']).map(
    (f) => ({
      value: f,
      label: f === 'Matte' ? 'With Mat' : f === 'Glossy' ? 'Without Mat' : f,
    })
  );
  const orientationOptions = (product.orientations.length ? product.orientations : ['Portrait', 'Landscape']).map(
    (o) => ({ value: o, label: o })
  );

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate">
      <ProductFlowLayout step={1} percent={15}>
        <div className="py-4">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              {
                label: product.categories?.name ?? 'Frames',
                to: `/category/${product.categories?.slug ?? 'wedding'}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        <ProductGallery
          images={product.images}
          designPreviewUrl={selectedDesign?.preview_url}
          productSlug={product.slug}
          variant="hero"
        />

        <div className="py-5">
          <h1 className="text-xl font-bold text-brand-charcoal sm:text-2xl">{product.name}</h1>
          <p className="mt-1 text-sm text-brand-charcoal-light">
            {selectedSize?.label ?? selectedSize?.inches ?? product.tagline ?? product.name}
          </p>
          <p className="mt-2 text-xs text-brand-charcoal-light">{unitsSold.toLocaleString()} units sold</p>

          <PriceDisplay unitPrice={pricing.unitPrice} mrp={pricing.mrp} discount={pricing.discount} />

          <div className="mt-4 rounded-lg border border-brand-gold-light bg-brand-ivory-dark/50 px-3 py-2.5 text-sm">
            <p>
              Use code: <span className="font-bold text-brand-charcoal">FIRST</span>
            </p>
            <p className="mt-0.5 text-xs text-brand-charcoal-light">
              Offer valid on your first order with FrameCraft.
            </p>
          </div>

          {sizes.length > 0 && (
            <>
              <button
                type="button"
                className="mt-5 text-sm font-medium text-brand-maroon"
                onClick={() =>
                  toast('Outer frame size — photo may be cropped slightly for fit.')
                }
              >
                Frame size description
              </button>
              <ChipSelect
                label="Select Size"
                selectedLabel={selectedSize?.inches}
                options={sizeOptions}
                value={selectedSize?.inches ?? ''}
                onChange={(inches) => {
                  const s = sizes.find((x) => x.inches === inches);
                  if (s) updateDraft({ selectedSize: s.inches });
                }}
                columns={4}
              />
            </>
          )}

          {finishOptions.length > 0 && (
            <ChipSelect
              label="Type"
              selectedLabel={finishOptions.find((o) => o.value === finish)?.label ?? finish}
              options={finishOptions}
              value={finish}
              onChange={(v) => updateDraft({ selectedFinish: v })}
              columns={2}
            />
          )}

          {orientationOptions.length > 1 && (
            <ChipSelect
              label="Orientation"
              selectedLabel={orientation}
              options={orientationOptions}
              value={orientation}
              onChange={(v) => updateDraft({ orientation: v })}
              columns={2}
            />
          )}

          {designs.length > 0 && (
            <div className="border-t border-brand-ivory-dark py-5">
              <DesignSelector
                designs={designs}
                selected={selectedDesign}
                onSelect={(d: ProductDesign) => updateDraft({ selectedDesignId: d.id })}
              />
            </div>
          )}

          {product.requires_dynamic_fields && product.dynamic_field_config?.fields && (
            <div className="border-t border-brand-ivory-dark py-5">
              <DynamicFields
                fields={product.dynamic_field_config.fields}
                values={dynamicFields}
                onChange={(v) => updateDraft({ dynamicFields: v })}
              />
            </div>
          )}

          <div className="sticky bottom-20 z-10 -mx-4 border-t border-brand-ivory-dark bg-white/95 px-4 py-4 backdrop-blur md:bottom-0">
            <CreateNowButton onClick={goUpload} />
          </div>

          <ZoominProductSections
            description={product.description}
            materialInfo={product.material_info}
            sizes={sizes.map((s) => s.inches)}
          />
        </div>
      </ProductFlowLayout>
    </motion.div>
  );
}
