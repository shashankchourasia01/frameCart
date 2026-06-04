interface ZoominProductSectionsProps {
  description?: string;
  materialInfo?: string;
  sizes?: string[];
}

export function ZoominProductSections({
  description,
  materialInfo,
  sizes = [],
}: ZoominProductSectionsProps) {
  const specs = [
    materialInfo && `Material: ${materialInfo}`,
    sizes.length > 0 && `Available sizes: ${sizes.join(', ')}`,
    'Customizable design and orientation',
    'Made in India · Secure gift-ready packaging',
  ].filter(Boolean) as string[];

  return (
    <div className="mt-2 border-t border-brand-ivory-dark">
      <section className="border-b border-brand-ivory-dark py-5">
        <h2 className="text-sm font-bold text-brand-charcoal">Product Details</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-charcoal-light">
          {description ??
            'Premium framed prints crafted for your memories. Choose your size and finish, upload photos, and we handle the rest.'}
        </p>
      </section>
      <section className="py-5">
        <h2 className="text-sm font-bold text-brand-charcoal">Product Specifications</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-brand-charcoal-light">
          {specs.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      <section className="border-t border-brand-ivory-dark py-5">
        <h2 className="text-sm font-bold text-brand-charcoal">Estimated delivery time</h2>
        <p className="mt-2 text-sm text-brand-charcoal-light">
          Share your pin code on WhatsApp after ordering — we will confirm delivery timeline.
        </p>
      </section>
    </div>
  );
}
