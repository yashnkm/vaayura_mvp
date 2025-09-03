# 🚀 Production Deployment Guide

## Step 1: Secure Database (DO THIS FIRST)
1. Go to your Supabase dashboard: https://sycayvesxlhljlbgafbx.supabase.co
2. Navigate to SQL Editor
3. Copy and run the SQL from `production_security.sql`
4. This will secure your orders table for production

## Step 2: Get Razorpay Live Keys
1. Go to Razorpay Dashboard: https://dashboard.razorpay.com
2. Complete KYC verification (required for live payments)
3. Switch from "Test Mode" to "Live Mode"
4. Get your live keys:
   - Live Key ID: `rzp_live_xxxxxxxx`
   - Live Key Secret: `rzp_live_secret_xxxxxxxx`

## Step 3: Deploy Backend to Vercel
```bash
cd vercel_backend
# Update .env with live keys
echo "RAZORPAY_KEY_ID=your_live_key_id" > .env
echo "RAZORPAY_KEY_SECRET=your_live_secret" >> .env
echo "SUPABASE_URL=https://sycayvesxlhljlbgafbx.supabase.co" >> .env
echo "SUPABASE_SERVICE_ROLE_KEY=your_service_role_key" >> .env

# Deploy
vercel --prod
```

## Step 4: Deploy Frontend
Options:
- **Vercel**: `vercel --prod` (recommended)
- **Netlify**: Connect GitHub repo
- **AWS/DigitalOcean**: Manual deployment

## Step 5: Update Environment Variables
In your frontend `.env`:
```env
# Update Razorpay key for production
VITE_RAZORPAY_KEY_ID=rzp_live_your_live_key
VITE_RAZORPAY_KEY_SECRET=rzp_live_your_live_secret
```

## Step 6: Update API Endpoints
In `CheckoutPage.tsx`, change:
```javascript
// From localhost
const response = await fetch('http://localhost:3000/api/create-order', {

// To your deployed backend URL
const response = await fetch('https://your-backend.vercel.app/api/create-order', {
```

## Step 7: Test Production
1. Use real payment methods (they will charge!)
2. Test with small amounts first
3. Verify orders appear in Supabase
4. Check Razorpay dashboard for transactions

## Security Checklist ✅
- [ ] Database RLS enabled
- [ ] Anonymous access removed
- [ ] Service role only access
- [ ] Live keys secured
- [ ] HTTPS enabled
- [ ] Environment variables protected

## Important Notes
⚠️ **Live Mode Charges Real Money** - Test thoroughly first!
🔒 **Keep Live Keys Secret** - Never commit to Git
📱 **Mobile Testing** - Test on actual devices
💰 **Start Small** - Test with ₹1 payments first