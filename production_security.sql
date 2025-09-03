-- PRODUCTION SECURITY SETUP
-- Copy and paste this into your Supabase SQL Editor and run it

-- 1. Remove dangerous public access to orders
REVOKE ALL ON orders FROM anon;
REVOKE ALL ON orders FROM authenticated;

-- 2. Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Only allow backend service role to access orders
GRANT ALL ON orders TO service_role;

-- 4. Create policy allowing only service role access
CREATE POLICY "Service role manages orders" ON orders
    FOR ALL 
    USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- 5. Verify security is working
SELECT 
    schemaname, 
    tablename, 
    rowsecurity, 
    relowner::regrole 
FROM pg_tables 
JOIN pg_class ON pg_class.relname = pg_tables.tablename 
WHERE tablename = 'orders';