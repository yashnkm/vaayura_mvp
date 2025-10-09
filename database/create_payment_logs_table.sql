-- Create payment_logs table for tracking payment events
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.payment_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    error_message TEXT,
    event_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payment_logs_order_id ON public.payment_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_logs_event_type ON public.payment_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_logs_created_at ON public.payment_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON public.payment_logs TO service_role;
GRANT SELECT ON public.payment_logs TO authenticated;

-- Add comments
COMMENT ON TABLE public.payment_logs IS 'Audit log for all payment-related events';
COMMENT ON COLUMN public.payment_logs.event_type IS 'Type of event: payment_success, payment_failed, payment_cancelled, etc.';
COMMENT ON COLUMN public.payment_logs.event_data IS 'JSON data containing event-specific information';
