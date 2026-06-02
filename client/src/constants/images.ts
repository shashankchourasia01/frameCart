const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

export const IMAGES = {
  hero: u('photo-1618221190210-0a37f9dd5c0', 1600),
  offerBg: u('photo-1513519245088-0e1296e435a2', 1200),
  defaultProduct: u('photo-1578662996442-48f60103fc96', 800),
} as const;

export const CATEGORY_IMAGES: Record<
  string,
  { thumb: string; banner: string }
> = {
  wedding: {
    thumb: u('photo-1519741497674-611481863552', 600),
    banner: u('photo-1519741497674-611481863552', 1600),
  },
  anniversary: {
    thumb: u('photo-1522675457657-f6fa0973a7cd', 600),
    banner: u('photo-1522675457657-f6fa0973a7cd', 1600),
  },
  baby: {
    thumb: u('photo-1555252337-081a075da841', 600),
    banner: u('photo-1555252337-081a075da841', 1600),
  },
  family: {
    thumb: u('photo-1511895426328-dc8714191300', 600),
    banner: u('photo-1511895426328-dc8714191300', 1600),
  },
  couple: {
    thumb: u('photo-1516589178581-6b18321b8c92', 600),
    banner: u('photo-1516589178581-6b18321b8c92', 1600),
  },
  graduation: {
    thumb: u('photo-1523050852297-24b348553048', 600),
    banner: u('photo-1523050852297-24b348553048', 1600),
  },
};

export const PRODUCT_IMAGES: Record<string, string[]> = {
  'love-story-frame': [
    u('photo-1606216794074-58f7c5173a72', 900),
    u('photo-1617814076367-b75911741708', 900),
    u('photo-1513519245088-0e1296e435a2', 900),
  ],
  'family-portrait-frame': [
    u('photo-1578662996442-48f60103fc96', 900),
    u('photo-1586023492125-27b2c045efd7', 900),
  ],
};

export const DESIGN_IMAGES: Record<string, string> = {
  Classic: u('photo-1617814076367-b75911741708', 300),
  Floral: u('photo-1513519245088-0e1296e435a2', 300),
  Minimal: u('photo-1586023492125-27b2c045efd7', 300),
  'Warm Wood': u('photo-1615874956477-b78197bf4166', 300),
  'Modern Black': u('photo-1618221190210-0a37f9dd5c0', 300),
};

export const TESTIMONIAL_AVATARS = [
  u('photo-1494790108377-be9c29b29330', 120),
  u('photo-1507003211169-0a1dd7228f2d', 120),
  u('photo-1438761681033-6461ffad8d80', 120),
];

export function getCategoryThumb(slug: string, imageUrl?: string | null) {
  return imageUrl || CATEGORY_IMAGES[slug]?.thumb || IMAGES.defaultProduct;
}

export function getCategoryBanner(slug: string, bannerUrl?: string | null) {
  return bannerUrl || CATEGORY_IMAGES[slug]?.banner || IMAGES.hero;
}

export function getProductImages(slug: string, images?: string[] | null) {
  if (images?.length) return images;
  return PRODUCT_IMAGES[slug] ?? [IMAGES.defaultProduct];
}

export function getProductImage(slug: string, images?: string[] | null) {
  return getProductImages(slug, images)[0];
}

export function getDesignImage(name: string) {
  return DESIGN_IMAGES[name] ?? IMAGES.defaultProduct;
}
