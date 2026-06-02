import { useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProduct } from '../hooks/useProducts';
import { useOrderStore } from '../store/orderStore';
import { useCartStore } from '../store/cartStore';
import { ProductGallery } from '../components/product/ProductGallery';
import { DesignSelector } from '../components/product/DesignSelector';
import { SizeSelector } from '../components/product/SizeSelector';
import { FinishSelector } from '../components/product/FinishSelector';
import { OrientationSelector } from '../components/product/OrientationSelector';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { PhotoUploader } from '../components/product/PhotoUploader';
import { SpecialInstructions } from '../components/product/SpecialInstructions';
import { DynamicFields } from '../components/product/DynamicFields';
import { ProductDescription } from '../components/product/ProductDescription';
import { StickyOrderBar } from '../components/product/StickyOrderBar';
import { StarRating } from '../components/shared/StarRating';
import { AnimatedCounter } from '../components/shared/AnimatedCounter';
import type { ProductDesign, ProductSize } from '../types';
import { pageTransition } from '../animations/variants';

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(slug);
  const updateDraft = useOrderStore((s) => s.updateDraft);
  const addItem = useCartStore((s) => s.addItem);

  const [design, setDesign] = useState<ProductDesign | undefined>();
  const [size, setSize] = useState<ProductSize | undefined>();
  const [finish, setFinish] = useState('Matte');
  const [orientation, setOrientation] = useState('Portrait');
  const [quantity, setQuantity] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [dynamicFields, setDynamicFields] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const designs = product?.available_designs ?? [];
  const sizes = product?.available_sizes ?? [];
  const selectedDesign = design ?? designs[0];
  const selectedSize = size ?? sizes[0];

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const add = selectedSize?.price_add ?? 0;
    return Number(product.base_price) + Number(add);
  }, [product, selectedSize]);

  const totalPrice = unitPrice * quantity;

  const validate = (): boolean => {
    const e: string[] = [];
    if (!selectedDesign) e.push('Select a design');
    if (!selectedSize) e.push('Select a size');
    if (photos.length < 1) e.push('Upload at least 1 photo');
    if (product?.requires_dynamic_fields) {
      const fields = product.dynamic_field_config?.fields ?? [];
      for (const f of fields) {
        if (!dynamicFields[f]?.trim()) e.push('Fill personalization fields');
        break;
      }
    }
    setErrors(e);
    return e.length === 0;
  };

  const buildOrderPayload = () => ({
    productId: product!.id,
    productName: product!.name,
    categoryName: product!.categories?.name,
    selectedDesignId: selectedDesign?.id,
    selectedDesignName: selectedDesign?.name,
    selectedSize: selectedSize!.inches,
    selectedFinish: finish,
    orientation,
    quantity,
    unitPrice,
    totalPrice,
    specialInstructions: instructions,
    dynamicFields: Object.keys(dynamicFields).length ? dynamicFields : undefined,
    photoUrls: photos,
  });

  const goPreview = () => {
    if (!validate() || !product) return;
    updateDraft(buildOrderPayload());
    navigate('/preview');
  };

  const handleCart = () => {
    if (!validate() || !product || !selectedSize) return;
    addItem({
      id: crypto.randomUUID(),
      product,
      selectedDesign,
      selectedSize: selectedSize.inches,
      selectedFinish: finish,
      orientation,
      quantity,
      unitPrice,
      photoUrls: photos,
      specialInstructions: instructions,
      dynamicFields,
    });
  };

  if (isLoading) {
    return <div className="mx-auto max-w-7xl p-8 animate-pulse">Loading...</div>;
  }
  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" className="pb-36 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:flex lg:gap-12 lg:px-8">
        <div className="lg:w-[60%]">
          <ProductGallery
            images={product.images}
            designPreviewUrl={selectedDesign?.preview_url}
            productSlug={product.slug}
          />
        </div>
        <div className="mt-8 space-y-8 lg:mt-0 lg:w-[40%]">
          <nav className="text-xs text-brand-charcoal-light">
            <Link to="/">Home</Link>
            {' > '}
            <Link to={`/category/${product.categories?.slug ?? 'wedding'}`}>
              {product.categories?.name ?? 'Frames'}
            </Link>
            {' > '}
            <span className="text-brand-charcoal">{product.name}</span>
          </nav>
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-maroon sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-2xl font-bold tabular-nums text-brand-maroon sm:text-3xl">
              <AnimatedCounter value={totalPrice} prefix="₹" />
            </p>
            <StarRating rating={Number(product.avg_rating)} count={product.review_count} />
            <p className="mt-2 text-sm text-brand-charcoal-light">
              ❤️ {product.review_count} people wishlisted this
            </p>
          </div>

          {designs.length > 0 && (
            <DesignSelector designs={designs} selected={selectedDesign} onSelect={setDesign} />
          )}
          {sizes.length > 0 && (
            <SizeSelector
              sizes={sizes}
              selected={selectedSize?.inches}
              onSelect={setSize}
            />
          )}
          <FinishSelector
            finishes={product.print_finishes}
            selected={finish}
            onSelect={setFinish}
          />
          <OrientationSelector
            orientations={product.orientations}
            selected={orientation}
            onSelect={setOrientation}
          />
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <PhotoUploader maxPhotos={product.max_photos} urls={photos} onChange={setPhotos} />
          <SpecialInstructions value={instructions} onChange={setInstructions} />
          {product.requires_dynamic_fields && product.dynamic_field_config?.fields && (
            <DynamicFields
              fields={product.dynamic_field_config.fields}
              values={dynamicFields}
              onChange={setDynamicFields}
            />
          )}
          <ProductDescription description={product.description} materialInfo={product.material_info} />
          <div className="hidden md:block">
            <StickyOrderBar
              totalPrice={totalPrice}
              onWhatsApp={goPreview}
              onAddToCart={handleCart}
              errors={errors}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <StickyOrderBar
          totalPrice={totalPrice}
          onWhatsApp={goPreview}
          onAddToCart={handleCart}
          errors={errors}
        />
      </div>
    </motion.div>
  );
}
