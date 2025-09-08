// Vercel Serverless Function: /api/validate-coupon.js
// Validates coupon codes and calculates discount

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { couponCode, orderAmount } = req.body;

    if (!couponCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Coupon code is required' 
      });
    }

    if (!orderAmount || orderAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid order amount is required' 
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Find the coupon by code
    const { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase().trim())
      .eq('is_active', true)
      .single();

    if (couponError || !coupon) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Check if coupon is within valid date range
    const now = new Date();
    const validFrom = new Date(coupon.valid_from);
    const validUntil = new Date(coupon.valid_until);

    if (now < validFrom) {
      return res.status(400).json({
        success: false,
        message: 'Coupon is not yet active'
      });
    }

    if (now > validUntil) {
      return res.status(400).json({
        success: false,
        message: 'Coupon has expired'
      });
    }

    // Check usage limit
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) {
      return res.status(400).json({
        success: false,
        message: 'Coupon usage limit exceeded'
      });
    }

    // Check minimum order amount
    if (coupon.min_order_amount && orderAmount < coupon.min_order_amount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount of ₹${coupon.min_order_amount} required`
      });
    }

    // Calculate discount amount
    let discountAmount = 0;

    if (coupon.discount_type === 'fixed') {
      discountAmount = coupon.discount_value;
    } else if (coupon.discount_type === 'percentage') {
      discountAmount = (orderAmount * coupon.discount_value) / 100;
      
      // Apply max discount cap if specified
      if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
        discountAmount = coupon.max_discount_amount;
      }
    }

    // Ensure discount doesn't exceed order amount
    discountAmount = Math.min(discountAmount, orderAmount);

    // Increment usage count
    const { error: updateError } = await supabase
      .from('coupons')
      .update({ 
        usage_count: coupon.usage_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', coupon.id);

    if (updateError) {
      console.error('Error updating coupon usage count:', updateError);
      // Don't fail the request if usage count update fails
    }

    // Format coupon data for frontend
    const formattedCoupon = {
      id: coupon.id,
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
      minOrderAmount: coupon.min_order_amount,
      maxDiscountAmount: coupon.max_discount_amount,
      isActive: coupon.is_active,
      validFrom: coupon.valid_from,
      validUntil: coupon.valid_until,
      usageLimit: coupon.usage_limit,
      usageCount: coupon.usage_count + 1, // Updated count
      createdAt: coupon.created_at,
      updatedAt: coupon.updated_at
    };

    res.status(200).json({
      success: true,
      data: {
        coupon: formattedCoupon,
        discountAmount: Math.round(discountAmount * 100) / 100 // Round to 2 decimal places
      }
    });

  } catch (error) {
    console.error('Error validating coupon:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
}