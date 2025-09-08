import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const validateCouponData = (coupon, orderAmount) => {
  // Check if coupon exists
  if (!coupon) {
    return { isValid: false, errorMessage: 'Coupon code not found' }
  }

  // Check if coupon is active
  if (!coupon.isActive) {
    return { isValid: false, errorMessage: 'This coupon is not active' }
  }

  // Check validity dates
  const now = new Date()
  const validFrom = new Date(coupon.validFrom)
  const validUntil = new Date(coupon.validUntil)

  if (now < validFrom) {
    return { isValid: false, errorMessage: 'This coupon is not yet valid' }
  }

  if (now > validUntil) {
    return { isValid: false, errorMessage: 'This coupon has expired' }
  }

  // Check minimum order amount
  if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
    return { 
      isValid: false, 
      errorMessage: `Minimum order amount of ₹${coupon.minOrderAmount} required` 
    }
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { isValid: false, errorMessage: 'This coupon has reached its usage limit' }
  }

  // Calculate discount amount
  let discountAmount = 0
  if (coupon.discountType === 'fixed') {
    discountAmount = coupon.discountValue
  } else if (coupon.discountType === 'percentage') {
    discountAmount = (orderAmount * coupon.discountValue) / 100
    
    // Apply maximum discount amount if specified
    if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
      discountAmount = coupon.maxDiscountAmount
    }
  }

  // Ensure discount doesn't exceed order amount
  if (discountAmount > orderAmount) {
    discountAmount = orderAmount
  }

  return {
    isValid: true,
    discountAmount: Math.round(discountAmount),
    coupon: coupon
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    })
  }
  
  try {
    const { couponCode, orderAmount } = req.body
    
    // Validation
    if (!couponCode || !couponCode.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code is required'
      })
    }
    
    if (!orderAmount || orderAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid order amount is required'
      })
    }
    
    // Get coupon from database
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.trim().toUpperCase())
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Database error:', error)
      return res.status(500).json({
        success: false,
        message: 'Database error'
      })
    }
    
    // Validate coupon
    const validation = validateCouponData(coupon, orderAmount)
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.errorMessage
      })
    }
    
    // Update usage count (increment by 1)
    if (coupon) {
      await supabase
        .from('coupons')
        .update({ 
          usageCount: coupon.usageCount + 1 
        })
        .eq('id', coupon.id)
    }
    
    return res.status(200).json({
      success: true,
      message: 'Coupon is valid',
      data: {
        discountAmount: validation.discountAmount,
        coupon: {
          id: validation.coupon.id,
          code: validation.coupon.code,
          name: validation.coupon.name,
          discountType: validation.coupon.discountType,
          discountValue: validation.coupon.discountValue
        }
      }
    })
    
  } catch (error) {
    console.error('Error validating coupon:', error)
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}