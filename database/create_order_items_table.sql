-- Create order_items table for multi-item cart support
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- Add RLS (Row Level Security) - same as orders table
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.order_items TO service_role;
GRANT ALL ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO anon;

-- Add comments for documentation
COMMENT ON TABLE public.order_items IS 'Line items for each order - supports multi-product orders';
COMMENT ON COLUMN public.order_items.order_id IS 'Reference to the parent order';
COMMENT ON COLUMN public.order_items.product_id IS 'Product identifier';
COMMENT ON COLUMN public.order_items.unit_price IS 'Price per unit at time of purchase';
COMMENT ON COLUMN public.order_items.subtotal IS 'Unit price × quantity';
