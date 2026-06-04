const pexels = (id, w = 800, h) => {
  const hp = h ? `&h=${h}` : '';
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${hp}&fit=crop`;
};

const categories = [
  {
    id: '1',
    name: 'Wedding',
    slug: 'wedding',
    emoji: '💒',
    description: 'Celebrate your special day',
    image_url: pexels(265763, 600, 800),
    banner_url: pexels(265763, 1600, 900),
    sort_order: 1,
    is_active: true,
  },
  {
    id: '2',
    name: 'Anniversary',
    slug: 'anniversary',
    emoji: '💑',
    description: 'Mark every year together',
    image_url: pexels(1444442, 600, 800),
    banner_url: pexels(1444442, 1600, 900),
    sort_order: 2,
    is_active: true,
  },
  {
    id: '3',
    name: 'Baby',
    slug: 'baby',
    emoji: '👶',
    description: 'Welcome the little one',
    image_url: pexels(1648387, 600, 800),
    banner_url: pexels(3556686, 1600, 900),
    sort_order: 3,
    is_active: true,
  },
  {
    id: '4',
    name: 'Family',
    slug: 'family',
    emoji: '👨‍👩‍👧',
    description: 'Cherish family moments',
    image_url: pexels(1024993, 600, 800),
    banner_url: pexels(3778558, 1600, 900),
    sort_order: 4,
    is_active: true,
  },
  {
    id: '5',
    name: 'Couple',
    slug: 'couple',
    emoji: '❤️',
    description: 'Romantic frames',
    image_url: pexels(1451903, 600, 800),
    banner_url: pexels(2253875, 1600, 900),
    sort_order: 5,
    is_active: true,
  },
  {
    id: '6',
    name: 'Graduation',
    slug: 'graduation',
    emoji: '🎓',
    description: 'Proud achievements',
    image_url: pexels(2673996, 600, 800),
    banner_url: pexels(256490, 1600, 900),
    sort_order: 6,
    is_active: true,
  },
];

const FRAME_IMAGES = [
  pexels(1571468, 900),
  pexels(1128318, 900),
  pexels(271624, 900),
  pexels(1579715, 900),
  pexels(17742, 900),
  pexels(1571463, 900),
  pexels(584399, 900),
  pexels(1451903, 900),
  pexels(265763, 900),
  pexels(1444442, 900),
  pexels(1024993, 900),
  pexels(3778558, 900),
  pexels(1648387, 900),
  pexels(3556686, 900),
  pexels(2253875, 900),
  pexels(2673996, 900),
  pexels(256490, 900),
  pexels(3992946, 900),
  pexels(3181718, 900),
  pexels(1571460, 900),
  pexels(1080721, 900),
  pexels(1571465, 900),
  pexels(1913472, 900),
];

const makeProduct = ({
  id,
  category_id,
  categorySlug,
  categoryName,
  name,
  slug,
  tagline,
  price,
  sort_order,
  imageIndex,
  is_bestseller = true,
  is_featured = false,
}) => ({
  id,
  category_id,
  name,
  slug,
  tagline,
  description: `${name} with premium framing, clear print finish, and elegant wall-ready design.`,
  material_info: 'Engineered wood frame with HD glass and archival print paper',
  base_price: price,
  available_sizes: [
    { label: '6x8', inches: '6x8', price_add: 0 },
    { label: '8x10', inches: '8x10', price_add: 180 },
    { label: '12x16', inches: '12x16', price_add: 420 },
  ],
  available_designs: [
    { id: 'd1', name: 'Classic' },
    { id: 'd2', name: 'Minimal' },
    { id: 'd3', name: 'Modern Black' },
  ],
  max_photos: 2,
  print_finishes: ['Matte', 'Glossy'],
  orientations: ['Portrait', 'Landscape'],
  requires_dynamic_fields: false,
  images: [
    FRAME_IMAGES[imageIndex % FRAME_IMAGES.length],
    FRAME_IMAGES[(imageIndex + 1) % FRAME_IMAGES.length],
    FRAME_IMAGES[(imageIndex + 2) % FRAME_IMAGES.length],
  ],
  is_featured,
  is_bestseller,
  is_active: true,
  sort_order,
  review_count: 18 + imageIndex * 3,
  avg_rating: 4.4 + (imageIndex % 5) * 0.1,
  categories: { name: categoryName, slug: categorySlug },
});

const { CATALOG } = require('./productCatalog');

const products = CATALOG.map((item, index) =>
  makeProduct({
    id: `p${index + 1}`,
    ...item,
    sort_order: index + 1,
    imageIndex: index,
    is_bestseller: item.is_bestseller !== false,
    is_featured: item.is_featured ?? false,
  })
);

products[0].requires_dynamic_fields = true;
products[0].dynamic_field_config = {
  fields: ['boy_name', 'girl_name', 'first_meet_date', 'engagement_date', 'wedding_date'],
};

const offers = [
  {
    id: 'o1',
    title: 'Welcome Offer',
    description: 'Flat ₹100 off on your first order',
    coupon_code: 'WELCOME100',
    discount_type: 'flat',
    discount_value: 100,
    min_order_value: 499,
    used_count: 0,
    applicable_to: 'all',
    valid_from: new Date().toISOString(),
    valid_till: new Date(Date.now() + 90 * 86400000).toISOString(),
    is_featured: true,
    is_active: true,
    banner_image_url: pexels(1571468, 1200, 800),
  },
  {
    id: 'o2',
    title: 'Festival Sale',
    description: '15% off on all frames',
    coupon_code: 'FESTIVE15',
    discount_type: 'percentage',
    discount_value: 15,
    min_order_value: 799,
    used_count: 0,
    applicable_to: 'all',
    valid_from: new Date().toISOString(),
    valid_till: new Date(Date.now() + 30 * 86400000).toISOString(),
    is_featured: false,
    is_active: true,
    banner_image_url: pexels(1128318, 1200, 800),
  },
];

module.exports = { categories, products, offers };
