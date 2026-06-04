/** Reliable CDN URLs (Pexels) — frame, wedding, family, home decor */

export function pexels(photoId: number, width = 800, height?: number): string {
  const h = height ? `&h=${height}` : '';
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}${h}&fit=crop`;
}

/** Gallery-quality frame & lifestyle photos */
export const FRAME_GALLERY = [
  pexels(1571468, 900), // frames on wall
  pexels(1128318, 900),
  pexels(271624, 900),
  pexels(1579715, 900),
  pexels(17742, 900),
  pexels(1571463, 900),
  pexels(584399, 900),
  pexels(1451903, 900), // couple
  pexels(265763, 900), // wedding
  pexels(1444442, 900),
  pexels(1024993, 900), // family
  pexels(3778558, 900),
  pexels(3279203, 900),
  pexels(1648387, 900), // baby
  pexels(3556686, 900),
  pexels(2253875, 900),
  pexels(2673996, 900), // graduation
  pexels(256490, 900),
  pexels(3992946, 900),
  pexels(3181718, 900),
  pexels(1571460, 900),
  pexels(1080721, 900),
  pexels(1571465, 900),
  pexels(1913472, 900),
] as const;

export const IMAGES = {
  hero: pexels(1128318, 1920, 1080),
  offerBg: pexels(1571468, 1200, 800),
  defaultProduct: pexels(1579715, 800),
} as const;

export const CATEGORY_IMAGES: Record<string, { thumb: string; banner: string }> = {
  wedding: {
    thumb: pexels(265763, 600, 800),
    banner: pexels(265763, 1600, 900),
  },
  anniversary: {
    thumb: pexels(1444442, 600, 800),
    banner: pexels(1444442, 1600, 900),
  },
  baby: {
    thumb: pexels(1648387, 600, 800),
    banner: pexels(3556686, 1600, 900),
  },
  family: {
    thumb: pexels(1024993, 600, 800),
    banner: pexels(3778558, 1600, 900),
  },
  couple: {
    thumb: pexels(1451903, 600, 800),
    banner: pexels(2253875, 1600, 900),
  },
  graduation: {
    thumb: pexels(2673996, 600, 800),
    banner: pexels(256490, 1600, 900),
  },
};

export const PRODUCT_IMAGES: Record<string, string[]> = {
  'love-story-frame': [FRAME_GALLERY[8], FRAME_GALLERY[9], FRAME_GALLERY[0]],
  'royal-wedding-collage': [FRAME_GALLERY[9], FRAME_GALLERY[18], FRAME_GALLERY[1]],
  'wedding-date-keepsake': [FRAME_GALLERY[18], FRAME_GALLERY[8], FRAME_GALLERY[2]],
  'golden-anniversary-frame': [FRAME_GALLERY[7], FRAME_GALLERY[3], FRAME_GALLERY[0]],
  'anniversary-memory-wall': [FRAME_GALLERY[1], FRAME_GALLERY[6], FRAME_GALLERY[4]],
  'baby-first-year-frame': [FRAME_GALLERY[13], FRAME_GALLERY[14], FRAME_GALLERY[2]],
  'baby-name-frame': [FRAME_GALLERY[14], FRAME_GALLERY[13], FRAME_GALLERY[5]],
  'family-portrait-frame': [FRAME_GALLERY[10], FRAME_GALLERY[11], FRAME_GALLERY[0]],
  'family-quote-frame': [FRAME_GALLERY[11], FRAME_GALLERY[10], FRAME_GALLERY[3]],
  'couple-love-frame': [FRAME_GALLERY[7], FRAME_GALLERY[15], FRAME_GALLERY[1]],
  'couple-travel-memories': [FRAME_GALLERY[15], FRAME_GALLERY[7], FRAME_GALLERY[6]],
  'graduation-achievement-frame': [FRAME_GALLERY[16], FRAME_GALLERY[17], FRAME_GALLERY[0]],
  'eternal-vows-frame': [FRAME_GALLERY[12], FRAME_GALLERY[8], FRAME_GALLERY[0]],
  'silver-years-frame': [FRAME_GALLERY[9], FRAME_GALLERY[7], FRAME_GALLERY[1]],
  'little-star-frame': [FRAME_GALLERY[13], FRAME_GALLERY[14], FRAME_GALLERY[2]],
  'generations-frame': [FRAME_GALLERY[10], FRAME_GALLERY[11], FRAME_GALLERY[6]],
  'date-night-frame': [FRAME_GALLERY[7], FRAME_GALLERY[15], FRAME_GALLERY[4]],
  'honor-roll-frame': [FRAME_GALLERY[16], FRAME_GALLERY[17], FRAME_GALLERY[5]],
};

export const DESIGN_IMAGES: Record<string, string> = {
  Classic: pexels(1571468, 400),
  Minimal: pexels(271624, 400),
  'Modern Black': pexels(1128318, 400),
  Floral: pexels(265763, 400),
  'Warm Wood': pexels(1579715, 400),
};

export const TESTIMONIAL_AVATARS = [
  pexels(774909, 120, 120),
  pexels(2379004, 120, 120),
  pexels(1181686, 120, 120),
];

export function galleryImage(index: number): string {
  return FRAME_GALLERY[index % FRAME_GALLERY.length];
}

export function getCategoryThumb(slug: string, imageUrl?: string | null) {
  if (imageUrl && !imageUrl.includes('unsplash.com')) return imageUrl;
  return CATEGORY_IMAGES[slug]?.thumb ?? IMAGES.defaultProduct;
}

export function getCategoryBanner(slug: string, bannerUrl?: string | null) {
  if (bannerUrl && !bannerUrl.includes('unsplash.com')) return bannerUrl;
  return CATEGORY_IMAGES[slug]?.banner ?? IMAGES.hero;
}

export function getProductImages(slug: string, images?: string[] | null) {
  const fromApi = images?.filter((u) => u && !u.includes('unsplash.com'));
  if (fromApi?.length) return fromApi;
  return PRODUCT_IMAGES[slug] ?? [galleryImage(slug.length), galleryImage(slug.length + 3)];
}

export function getProductImage(slug: string, images?: string[] | null) {
  return getProductImages(slug, images)[0];
}

export function getDesignImage(name: string) {
  return DESIGN_IMAGES[name] ?? IMAGES.defaultProduct;
}

export function getOfferBanner(url?: string | null) {
  if (url && !url.includes('unsplash.com')) return url;
  return IMAGES.offerBg;
}
