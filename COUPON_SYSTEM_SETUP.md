# Coupon System Setup Guide

This guide explains how to set up the complete coupon system for the Vaayura website.

## 🗄️ Database Setup

### 1. Create Coupons Table
Run the SQL script to create the coupons table and sample data:

```sql
-- Execute the contents of: create_coupons_table.sql
```

### 2. Update Orders Table  
Run the SQL script to add coupon support to the orders table:

```sql
-- Execute the contents of: update_orders_table_for_coupons.sql
```

## 🚀 Backend API Endpoints

The following API endpoints have been created:

### 1. `/api/validate-coupon` (POST)
**Purpose**: Validate coupon codes and calculate discount amounts

**Request Body**:
```json
{
  "couponCode": "WELCOME10",
  "orderAmount": 15000
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "coupon": {
      "id": "uuid",
      "code": "WELCOME10",
      "name": "Welcome 10% Off",
      "discountType": "percentage",
      "discountValue": 10,
      // ... other coupon fields
    },
    "discountAmount": 1500
  }
}
```

### 2. `/api/admin/coupons` (GET, POST, PUT, DELETE)
**Purpose**: CRUD operations for coupon management

#### GET - List all coupons
```bash
GET /api/admin/coupons
```

#### POST - Create new coupon
```json
{
  "code": "SAVE500",
  "name": "Save ₹500",
  "description": "Flat ₹500 off",
  "discountType": "fixed",
  "discountValue": 500,
  "minOrderAmount": 5000,
  "isActive": true,
  "validFrom": "2024-01-01T00:00:00Z",
  "validUntil": "2024-12-31T23:59:59Z",
  "usageLimit": 100
}
```

#### PUT - Update coupon
```bash
PUT /api/admin/coupons?id=uuid
```

#### DELETE - Delete coupon
```bash
DELETE /api/admin/coupons?id=uuid
```

### 3. `/api/create-order` (Updated)
**Purpose**: Create orders with coupon support

**Updated Request Body**:
```json
{
  "productId": "uuid",
  "quantity": 1,
  "customerData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": {
      "line1": "123 Street",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001"
    }
  },
  "coupon": {
    "code": "WELCOME10",
    "discountAmount": 1500
  }
}
```

## 🔧 Environment Variables

Ensure these environment variables are set in your backend `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## 📱 Frontend Integration

The frontend is already configured to work with the coupon system:

### Components:
- ✅ **CheckoutPage2.tsx** - Coupon input and validation
- ✅ **CouponService** - API communication
- ✅ **Admin Dashboard** - Coupon management

### Usage Flow:
1. User enters coupon code in checkout
2. Frontend calls `/api/validate-coupon`
3. If valid, discount is applied to order total
4. Order is created with coupon information via `/api/create-order`

## 🧪 Testing

### Sample Coupons (Auto-created):
- **WELCOME10** - 10% off (min ₹1000, max discount ₹2000)
- **SAVE500** - Flat ₹500 off (min ₹5000)  
- **NEWUSER** - 15% off for new users (min ₹2000, max discount ₹1500)

### Test Cases:
1. **Valid coupon**: Use "WELCOME10" with order > ₹1000
2. **Invalid coupon**: Use "INVALID" code
3. **Expired coupon**: Create expired coupon and test
4. **Usage limit**: Create coupon with usage limit and exceed it
5. **Minimum amount**: Use coupon below minimum order amount

## 🚀 Deployment Steps

1. **Database**: Run both SQL scripts in your Supabase database
2. **Backend**: Deploy the new API files to Vercel
3. **Environment**: Ensure all environment variables are set
4. **Testing**: Test coupon validation and order creation
5. **Admin**: Use admin dashboard to manage coupons

## 🔒 Security Features

- ✅ **Row Level Security** on coupons table
- ✅ **Service role authentication** for admin operations  
- ✅ **Input validation** and sanitization
- ✅ **Usage tracking** and limits
- ✅ **Automatic expiration** handling

## 📊 Analytics & Tracking

The system tracks:
- Coupon usage count
- Discount amounts applied
- Order information with coupon data
- Customer information

## 🛠️ Admin Features

Admins can:
- Create/edit/delete coupons
- Set usage limits and expiration dates
- Monitor coupon usage and performance
- Manage discount types (fixed/percentage)
- Set minimum order amounts and maximum discounts

## 📝 Notes

- All monetary values are stored in INR
- Coupon codes are case-insensitive and automatically uppercased
- Usage counts are automatically incremented when coupons are validated
- Failed validations don't increment usage counts
- Orders store both base amount and final amount after discount

---

**Status**: ✅ Complete - Ready for deployment and testing!