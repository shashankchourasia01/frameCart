import type { ProductBadge } from '../constants/productBadges';

export type { ProductBadge };

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji?: string;
  description?: string;
  image_url?: string;
  banner_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface ProductSize {
  label: string;
  inches: string;
  price_add: number;
}

export interface ProductDesign {
  id: string;
  name: string;
  thumbnail_url?: string;
  preview_url?: string;
}

export interface DynamicFieldConfig {
  fields: string[];
}

export interface Product {
  id: string;
  category_id?: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  material_info?: string;
  base_price: number;
  available_sizes: ProductSize[];
  available_designs: ProductDesign[];
  max_photos: number;
  print_finishes: string[];
  orientations: string[];
  requires_dynamic_fields: boolean;
  dynamic_field_config?: DynamicFieldConfig | null;
  images: string[];
  is_featured: boolean;
  is_bestseller: boolean;
  badge?: ProductBadge | null;
  is_active: boolean;
  sort_order: number;
  review_count: number;
  avg_rating: number;
  categories?: { name: string; slug: string };
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'designing'
  | 'printing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  order_number: string;
  product_id?: string;
  product_name: string;
  category_name?: string;
  selected_design_id?: string;
  selected_design_name?: string;
  selected_size: string;
  selected_finish: string;
  selected_orientation: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  coupon_code?: string;
  discount_amount: number;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  customer_address?: string;
  customer_city?: string;
  customer_state?: string;
  customer_pincode?: string;
  special_instructions?: string;
  dynamic_field_values?: Record<string, string> | null;
  uploaded_photo_urls: string[];
  preview_image_url?: string;
  status: OrderStatus;
  whatsapp_notified: boolean;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description?: string;
  coupon_code?: string;
  discount_type: 'percentage' | 'flat';
  discount_value: number;
  min_order_value: number;
  max_uses?: number | null;
  used_count: number;
  applicable_to: string;
  valid_from: string;
  valid_till: string;
  is_featured: boolean;
  is_active: boolean;
  banner_image_url?: string;
}

export interface OrderDetails {
  productId?: string;
  productName: string;
  categoryName?: string;
  selectedDesignId?: string;
  selectedDesignName?: string;
  selectedSize: string;
  selectedFinish: string;
  orientation: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  couponCode?: string;
  specialInstructions?: string;
  dynamicFields?: Record<string, string>;
  photoUrls: string[];
  previewUrl?: string;
  orderNumber?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  customerCity?: string;
  customerState?: string;
  customerPincode?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedDesign?: ProductDesign;
  selectedSize: string;
  selectedFinish: string;
  orientation: string;
  quantity: number;
  unitPrice: number;
  photoUrls: string[];
  specialInstructions?: string;
  dynamicFields?: Record<string, string>;
}

export interface AdminDashboardStats {
  todayOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  activeProducts: number;
  ordersTrend: { date: string; count: number }[];
  categoryBreakdown: { name: string; value: number }[];
  revenueTrend: { date: string; revenue: number }[];
}
