# Vaayura Backend - Vercel Serverless API

This backend handles payment processing, demo requests, and other server-side functionality for the Vaayura website.

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
cd vercel_backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your actual values:

```bash
cp .env.example .env
```

Required variables:
- `RAZORPAY_KEY_ID` - Your Razorpay key ID
- `RAZORPAY_KEY_SECRET` - Your Razorpay secret key
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `EMAIL_USER` - Your Gmail address
- `EMAIL_APP_PASSWORD` - Gmail app-specific password
- `ADMIN_EMAIL` - Email where demo requests should be sent

### 3. Gmail Setup (Recommended)

For Gmail SMTP:
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account Settings → Security → App Passwords
3. Generate an app-specific password for "Mail"
4. Use this password in `EMAIL_APP_PASSWORD`

### 4. Deploy to Vercel

```bash
npm run deploy
```

Or connect your GitHub repo to Vercel for automatic deployments.

### 5. Add Environment Variables to Vercel

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables
3. Add all variables from your `.env` file

## 📍 API Endpoints

### Payment Endpoints
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment signature
- `POST /api/payment-failed` - Handle failed payments

### Demo Request Endpoint
- `POST /api/send-demo-request` - Send demo booking email to admin

### Coupon Endpoints
- `POST /api/validate-coupon` - Validate coupon code and calculate discount
- `GET /api/admin/coupons` - Get all coupons (admin)
- `POST /api/admin/coupons` - Create new coupon (admin)
- `PUT /api/admin/coupons?id=<coupon_id>` - Update coupon (admin)
- `DELETE /api/admin/coupons?id=<coupon_id>` - Delete coupon (admin)

#### Demo Request Payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "+91 9999999999",
  "company": "Example Corp",
  "product": "storm",
  "quantity": 10,
  "message": "Looking forward to the demo"
}
```

#### Response:
```json
{
  "success": true,
  "message": "Demo request sent successfully",
  "data": {
    "customerName": "John Doe",
    "productRequested": "Vaayura Storm Air Purifier",
    "quantityRequested": 10,
    "submittedAt": "12/7/2025, 5:30:00 PM"
  }
}
```

#### Coupon Validation Payload:
```json
{
  "couponCode": "WELCOME10",
  "orderAmount": 15000
}
```

#### Coupon Validation Response:
```json
{
  "success": true,
  "message": "Coupon is valid",
  "data": {
    "discountAmount": 1500,
    "coupon": {
      "id": "uuid",
      "code": "WELCOME10",
      "name": "Welcome Discount",
      "discountType": "percentage",
      "discountValue": 10
    }
  }
}
```

#### Create Coupon Payload:
```json
{
  "code": "SAVE20",
  "name": "Save 20%",
  "description": "Get 20% off on orders above ₹5000",
  "discountType": "percentage",
  "discountValue": 20,
  "minOrderAmount": 5000,
  "maxDiscountAmount": 3000,
  "validFrom": "2025-01-01T00:00:00.000Z",
  "validUntil": "2025-12-31T23:59:59.000Z",
  "usageLimit": 100,
  "isActive": true
}
```

## 🔧 Development

### Local Testing
```bash
# Install Vercel CLI
npm i -g vercel

# Start local development server
vercel dev
```

Your API will be available at `http://localhost:3000`

### Testing Demo Request API
```bash
curl -X POST http://localhost:3000/api/send-demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9999999999",
    "product": "storm",
    "quantity": 5
  }'
```

## 🛡️ Security Features

- Input validation for all endpoints
- CORS headers configured
- Rate limiting (recommended for production)
- Environment variable protection

## 📧 Email Services Supported

### Gmail SMTP (Default)
- Easy setup with app passwords
- Reliable delivery
- Free for moderate usage

### SendGrid (Alternative)
- Professional email service
- Better deliverability 
- Paid service with free tier

### Custom SMTP (Alternative)
- Use any SMTP provider
- Configure host, port, credentials

## 🚨 Important Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **Use app passwords for Gmail** - Don't use your regular password
3. **Test email delivery** - Verify emails aren't going to spam
4. **Monitor API usage** - Set up alerts for high usage
5. **Update Vercel backend URL** - In frontend `emailService.ts` for production

## 📝 Frontend Integration

Update the API URL in your frontend:
```typescript
// src/services/emailService.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-backend-url.vercel.app'  // Replace with actual URL
  : 'http://localhost:3000'
```

## 🐛 Troubleshooting

### Email not sending?
1. Check Gmail app password is correct
2. Verify ADMIN_EMAIL is set
3. Check Vercel function logs
4. Test with curl/Postman first

### API not working?
1. Check environment variables in Vercel
2. Verify CORS settings
3. Check function timeout limits
4. Review Vercel function logs

---

**Need help?** Check Vercel documentation or create an issue in the repository.