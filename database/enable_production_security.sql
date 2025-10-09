-- Production Security Setup for Vaayura Payment System
-- Run this in your Supabase SQL Editor BEFORE deploying to production
-- This enables Row Level Security (RLS) to prevent unauthorized data access

-- ============================================================
-- STEP 1: Enable RLS on all payment-related tables
-- ============================================================

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 2: Create RLS Policies for orders table
-- ============================================================

-- Policy: Service role has full access (for backend API)
CREATE POLICY "Service role has full access to orders"
ON public.orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Users can only read their own orders (using email)
-- Note: Since you don't have authentication, we use email matching
CREATE POLICY "Users can view their own orders by email"
ON public.orders
FOR SELECT
TO anon
USING (user_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Policy: Backend can create orders (no restrictions for checkout)
-- This is needed for the create-order API endpoint
CREATE POLICY "Backend can create orders"
ON public.orders
FOR INSERT
TO service_role
WITH CHECK (true);

-- Policy: Backend can update order status (for payment verification)
CREATE POLICY "Backend can update orders"
ON public.orders
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================
-- STEP 3: Create RLS Policies for order_items table
-- ============================================================

-- Policy: Service role has full access
CREATE POLICY "Service role has full access to order_items"
ON public.order_items
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Users can view items for their orders
-- Joins with orders table to check email
CREATE POLICY "Users can view their own order items"
ON public.order_items
FOR SELECT
TO anon
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

-- ============================================================
-- STEP 4: Create RLS Policies for payment_logs table
-- ============================================================

-- Policy: Service role has full access (for logging)
CREATE POLICY "Service role has full access to payment_logs"
ON public.payment_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: No public access to payment logs (security audit trail)
-- Only backend service role can read/write logs
-- Users should never see internal payment logs

-- ============================================================
-- STEP 5: Grant necessary permissions
-- ============================================================

-- Ensure service role can do everything
GRANT ALL ON public.orders TO service_role;
GRANT ALL ON public.order_items TO service_role;
GRANT ALL ON public.payment_logs TO service_role;

-- Anonymous users can only SELECT their own data (via RLS policies)
GRANT SELECT ON public.orders TO anon;
GRANT SELECT ON public.order_items TO anon;

-- No access to payment_logs for anonymous users
REVOKE ALL ON public.payment_logs FROM anon;

-- ============================================================
-- STEP 6: Verify RLS is enabled
-- ============================================================

-- Run this query to confirm RLS is enabled on all tables
SELECT
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('orders', 'order_items', 'payment_logs', 'products', 'coupons');

-- Expected output:
-- orders: true
-- order_items: true
-- payment_logs: true
-- products: true (should already be enabled)
-- coupons: true (should already be enabled)

-- ============================================================
-- NOTES
-- ============================================================

-- 1. Since you don't have user authentication, the email-based policies
--    won't block anonymous users during checkout. They will only prevent
--    users from querying OTHER people's orders via SQL.

-- 2. Your backend uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
--    This is correct - your API endpoints need full access.

-- 3. The main security benefit: Even if someone gets your SUPABASE_URL
--    and anon key, they cannot query all orders from the browser console.

-- 4. For better security in the future, implement Supabase Auth and
--    replace email matching with user_id matching.

-- 5. Payment logs are completely hidden from public access - only your
--    backend can write to this table for audit trails.

