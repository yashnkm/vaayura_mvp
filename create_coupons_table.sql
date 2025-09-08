-- Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('fixed', 'percentage')) NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_amount DECIMAL(10,2),
    max_discount_amount DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    valid_from TIMESTAMPTZ NOT NULL,
    valid_until TIMESTAMPTZ NOT NULL,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON public.coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupons_valid_dates ON public.coupons(valid_from, valid_until);

-- Enable Row Level Security (RLS)
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Enable read access for all users" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Enable insert for service role only" ON public.coupons FOR INSERT WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Enable update for service role only" ON public.coupons FOR UPDATE USING (auth.role() = 'service_role');
CREATE POLICY "Enable delete for service role only" ON public.coupons FOR DELETE USING (auth.role() = 'service_role');

-- Insert some sample coupons for testing
INSERT INTO public.coupons (code, name, description, discount_type, discount_value, min_order_amount, max_discount_amount, is_active, valid_from, valid_until, usage_limit) VALUES
('WELCOME10', 'Welcome 10% Off', 'Get 10% off on your first order', 'percentage', 10, 1000, 2000, true, NOW(), NOW() + INTERVAL '30 days', 100),
('SAVE500', 'Save ₹500', 'Flat ₹500 off on orders above ₹5000', 'fixed', 500, 5000, NULL, true, NOW(), NOW() + INTERVAL '30 days', 50),
('NEWUSER', 'New User Special', '15% off for new users', 'percentage', 15, 2000, 1500, true, NOW(), NOW() + INTERVAL '7 days', 25);