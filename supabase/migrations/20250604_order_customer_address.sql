-- Add delivery address fields to orders (run if upgrading existing DB)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_address TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_state TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_pincode TEXT;
