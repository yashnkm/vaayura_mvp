-- Create coupons table for Supabase
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('fixed', 'percentage')),
  discount_value DECIMAL(10,2) NOT NULL CHECK (discount_value > 0),
  min_order_amount DECIMAL(10,2) CHECK (min_order_amount >= 0),
  max_discount_amount DECIMAL(10,2) CHECK (max_discount_amount >= 0),
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  usage_limit INTEGER CHECK (usage_limit >= 0),
  usage_count INTEGER DEFAULT 0 CHECK (usage_count >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure valid_until is after valid_from
  CONSTRAINT valid_date_range CHECK (valid_until > valid_from)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_validity ON coupons(valid_from, valid_until);
CREATE INDEX IF NOT EXISTS idx_coupons_created_at ON coupons(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_coupons_updated_at 
  BEFORE UPDATE ON coupons 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample coupons for testing
INSERT INTO coupons (
  code, 
  name, 
  description, 
  discount_type, 
  discount_value, 
  min_order_amount, 
  max_discount_amount,
  valid_from, 
  valid_until, 
  usage_limit,
  is_active
) VALUES
(
  'WELCOME10', 
  'Welcome Discount', 
  'Get 10% off on your first order', 
  'percentage', 
  10.00, 
  5000.00, 
  2000.00,
  NOW(), 
  NOW() + INTERVAL '1 year',
  100,
  true
),
(
  'SAVE500', 
  'Save ₹500', 
  'Flat ₹500 off on orders above ₹10,000', 
  'fixed', 
  500.00, 
  10000.00, 
  NULL,
  NOW(), 
  NOW() + INTERVAL '6 months',
  50,
  true
),
(
  'BULK15', 
  'Bulk Order Discount', 
  '15% off for bulk orders', 
  'percentage', 
  15.00, 
  25000.00, 
  5000.00,
  NOW(), 
  NOW() + INTERVAL '3 months',
  NULL,
  true
);

-- Enable Row Level Security (RLS)
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Create policies for different access levels
-- Admin access (service role can do everything)
CREATE POLICY "Service role can manage coupons" ON coupons
  FOR ALL USING (auth.role() = 'service_role');

-- Public read access for active coupons only (for validation)
CREATE POLICY "Public can read active coupons" ON coupons
  FOR SELECT USING (is_active = true AND valid_until > NOW());

-- Grant necessary permissions
GRANT ALL ON coupons TO service_role;
GRANT SELECT ON coupons TO anon, authenticated;