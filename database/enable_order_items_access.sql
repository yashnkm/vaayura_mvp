-- ENABLE ADMIN ACCESS TO ORDER_ITEMS
-- Run this in your Supabase SQL Editor to allow admins to view order items

-- First, drop the policy if it exists (to avoid errors)
DROP POLICY IF EXISTS "Authenticated users can read order_items" ON order_items;

-- Allow all authenticated users to READ order_items
CREATE POLICY "Authenticated users can read order_items" ON order_items
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Grant SELECT permission to authenticated role
GRANT SELECT ON order_items TO authenticated;

-- Verify the policy is created
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'order_items';
