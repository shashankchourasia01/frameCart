ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public read offers" ON offers FOR SELECT
  USING (is_active = true AND valid_till > now());

CREATE POLICY "Anyone can insert order" ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access orders" ON orders
  USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'super_admin');

CREATE POLICY "Admin manage categories" ON categories
  USING (auth.jwt() ->> 'role' IN ('admin','super_admin'));
CREATE POLICY "Admin manage products" ON products
  USING (auth.jwt() ->> 'role' IN ('admin','super_admin'));
CREATE POLICY "Admin manage offers" ON offers
  USING (auth.jwt() ->> 'role' IN ('admin','super_admin'));
