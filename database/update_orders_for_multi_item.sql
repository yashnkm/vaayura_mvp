-- Update orders table to support multi-item carts
-- Run this in your Supabase SQL Editor AFTER creating order_items table

-- Add column to track total number of items in the order
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS total_items INTEGER DEFAULT 1;

-- Add comment
COMMENT ON COLUMN public.orders.total_items IS 'Total number of distinct products in this order';

-- Note: product_id, product_name, and quantity columns in orders table
-- will now represent summary/primary product for backward compatibility
-- Actual line items are stored in order_items table
