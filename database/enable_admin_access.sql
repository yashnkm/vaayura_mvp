-- ENABLE ADMIN ACCESS TO ORDERS
-- Run this in your Supabase SQL Editor to allow admins to view orders

-- First, drop the policy if it exists (to avoid errors)
DROP POLICY IF EXISTS "Authenticated users can read orders" ON orders;

-- Option 1: Allow all authenticated users to READ orders (simpler)
-- This works if you only give admin access to trusted users
CREATE POLICY "Authenticated users can read orders" ON orders
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Option 2: If you want to restrict to specific admin emails, use this instead:
-- First uncomment the DROP and CREATE below, and comment out the CREATE above
-- Replace 'your-admin@email.com' with your actual admin email

-- DROP POLICY IF EXISTS "Specific admins can read orders" ON orders;
-- CREATE POLICY "Specific admins can read orders" ON orders
--     FOR SELECT
--     USING (
--         auth.role() = 'authenticated'
--         AND auth.jwt() ->> 'email' = 'your-admin@email.com'
--     );

-- Grant SELECT permission to authenticated role
GRANT SELECT ON orders TO authenticated;

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
WHERE tablename = 'orders';
