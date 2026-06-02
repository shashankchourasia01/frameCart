-- FrameCraft Database Schema

CREATE TABLE categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  emoji         TEXT,
  description   TEXT,
  image_url     TEXT,
  banner_url    TEXT,
  sort_order    INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id             UUID REFERENCES categories(id) ON DELETE SET NULL,
  name                    TEXT NOT NULL,
  slug                    TEXT UNIQUE NOT NULL,
  tagline                 TEXT,
  description             TEXT,
  material_info           TEXT,
  base_price              NUMERIC(10,2) NOT NULL,
  available_sizes         JSONB NOT NULL DEFAULT '[]',
  available_designs       JSONB NOT NULL DEFAULT '[]',
  max_photos              INT DEFAULT 1,
  print_finishes          TEXT[] DEFAULT ARRAY['Matte','Glossy'],
  orientations            TEXT[] DEFAULT ARRAY['Portrait','Landscape'],
  requires_dynamic_fields BOOLEAN DEFAULT false,
  dynamic_field_config    JSONB DEFAULT NULL,
  images                  TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_featured             BOOLEAN DEFAULT false,
  is_bestseller           BOOLEAN DEFAULT false,
  is_active               BOOLEAN DEFAULT true,
  sort_order              INT DEFAULT 0,
  review_count            INT DEFAULT 0,
  avg_rating              NUMERIC(3,2) DEFAULT 0,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number          TEXT UNIQUE NOT NULL,
  product_id            UUID REFERENCES products(id),
  product_name          TEXT NOT NULL,
  category_name         TEXT,
  selected_design_id    TEXT,
  selected_design_name  TEXT,
  selected_size         TEXT NOT NULL,
  selected_finish       TEXT NOT NULL,
  selected_orientation  TEXT NOT NULL,
  quantity              INT NOT NULL DEFAULT 1,
  unit_price            NUMERIC(10,2) NOT NULL,
  total_price           NUMERIC(10,2) NOT NULL,
  coupon_code           TEXT,
  discount_amount       NUMERIC(10,2) DEFAULT 0,
  customer_name         TEXT,
  customer_phone        TEXT,
  customer_email        TEXT,
  customer_city         TEXT,
  special_instructions  TEXT,
  dynamic_field_values  JSONB DEFAULT NULL,
  uploaded_photo_urls   TEXT[] DEFAULT ARRAY[]::TEXT[],
  preview_image_url     TEXT,
  status                TEXT DEFAULT 'pending'
                        CHECK (status IN (
                          'pending','confirmed','designing',
                          'printing','shipped','delivered','cancelled'
                        )),
  whatsapp_notified     BOOLEAN DEFAULT false,
  admin_notes           TEXT,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE offers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  description      TEXT,
  coupon_code      TEXT UNIQUE,
  discount_type    TEXT NOT NULL CHECK (discount_type IN ('percentage','flat')),
  discount_value   NUMERIC(10,2) NOT NULL,
  min_order_value  NUMERIC(10,2) DEFAULT 0,
  max_uses         INT DEFAULT NULL,
  used_count       INT DEFAULT 0,
  applicable_to    TEXT DEFAULT 'all',
  valid_from       TIMESTAMPTZ DEFAULT now(),
  valid_till       TIMESTAMPTZ NOT NULL,
  is_featured      BOOLEAN DEFAULT false,
  is_active        BOOLEAN DEFAULT true,
  banner_image_url TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE admin_profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id),
  name       TEXT NOT NULL,
  role       TEXT DEFAULT 'admin' CHECK (role IN ('super_admin','admin','staff')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_categories_updated BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active, sort_order);
CREATE INDEX idx_orders_status ON orders(status, created_at DESC);
CREATE INDEX idx_orders_phone ON orders(customer_phone);
CREATE INDEX idx_offers_active ON offers(is_active, valid_till);
