interface ProductDetailSectionsProps {
  description?: string;
  materialInfo?: string;
  sizes: string[];
  categoryName?: string;
}

export function ProductDetailSections({
  description,
  materialInfo,
  sizes,
  categoryName,
}: ProductDetailSectionsProps) {
  const bullets = [
    'Premium photo prints mounted in a handcrafted wooden frame',
    sizes.length > 0 && `Available in ${sizes.length} sizes: ${sizes.join(', ')}`,
    materialInfo && `Material: ${materialInfo}`,
    'Finish options: Matte or Glossy print',
    'Frame ready to hang — includes wall hardware',
    categoryName && `Perfect for ${categoryName.toLowerCase()} gifts and décor`,
  ].filter(Boolean) as string[];

  return (
    <div className="border-t border-neutral-200">
      <section className="py-5">
        <p className="text-sm leading-relaxed text-brand-charcoal-light">
          {description ??
            'Turn your images into art with premium framed prints — the perfect blend of elegance for any space.'}
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand-charcoal-light">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-brand-charcoal">
          Order via WhatsApp — we confirm delivery timeline for your city after you upload photos.
        </p>
      </section>

      <section className="border-t border-neutral-200 py-5">
        <h2 className="text-base font-bold text-violet-900">Print material</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal-light">
          {materialInfo ??
            '300 GSM archival print paper with protective coating. Engineered wood frame with clear glass and secure wall mounting.'}
        </p>
      </section>

      <section className="border-t border-neutral-200 py-5">
        <h2 className="text-base font-bold text-violet-900">Gallery frame sizes</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal-light">
          Show off your memories with a premium wall frame. Wooden construction with tight canvas-style wrap
          finish on selected designs.
        </p>
        {sizes.length > 0 && (
          <p className="mt-2 text-sm text-brand-charcoal">
            <strong>Sizes:</strong> {sizes.join(' · ')}
          </p>
        )}
      </section>

      <section className="border-t border-neutral-200 py-5">
        <h2 className="text-base font-bold text-violet-900">Frame components</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal-light">
          Lightweight and easy to hang. Engineered wood frame, HD glass front, and archival print — built to
          last for years on your wall.
        </p>
      </section>
    </div>
  );
}
