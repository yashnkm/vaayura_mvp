-- Update orders table to support coupon functionality
-- Add coupon-related columns to existing orders table

ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS base_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS coupon_code VARCHAR(50),
ADD COLUMN IF NOT EXISTS coupon_id UUID REFERENCES public.coupons(id) ON DELETE SET NULL;

-- Create index for coupon code lookups
CREATE INDEX IF NOT EXISTS idx_orders_coupon_code ON public.orders(coupon_code);
CREATE INDEX IF NOT EXISTS idx_orders_coupon_id ON public.orders(coupon_id);

-- Update existing orders to set base_amount = amount where base_amount is null
UPDATE public.orders 
SET base_amount = amount 
WHERE base_amount IS NULL;

-- Add comment to document the schema changes
COMMENT ON COLUMN public.orders.base_amount IS 'Original order amount before any discounts';
COMMENT ON COLUMN public.orders.discount_amount IS 'Total discount amount applied from coupons';
COMMENT ON COLUMN public.orders.coupon_code IS 'Coupon code used for this order';
COMMENT ON COLUMN public.orders.coupon_id IS 'Reference to the coupon used for this order';