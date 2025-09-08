import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const validateCouponData = (data) => {
  const errors = []
  
  if (!data.code?.trim()) errors.push('Coupon code is required')
  if (!data.name?.trim()) errors.push('Coupon name is required')
  if (!data.discountType || !['fixed', 'percentage'].includes(data.discountType)) {
    errors.push('Valid discount type is required (fixed or percentage)')
  }
  if (!data.discountValue || data.discountValue <= 0) {
    errors.push('Discount value must be greater than 0')
  }
  if (data.discountType === 'percentage' && data.discountValue > 100) {
    errors.push('Percentage discount cannot exceed 100%')
  }
  if (!data.validFrom) errors.push('Valid from date is required')
  if (!data.validUntil) errors.push('Valid until date is required')
  if (new Date(data.validUntil) <= new Date(data.validFrom)) {
    errors.push('Valid until date must be after valid from date')
  }
  
  return errors
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  try {
    switch (req.method) {
      case 'GET':
        return await handleGetCoupons(req, res)
      case 'POST':
        return await handleCreateCoupon(req, res)
      case 'PUT':
        return await handleUpdateCoupon(req, res)
      case 'DELETE':
        return await handleDeleteCoupon(req, res)
      default:
        return res.status(405).json({ 
          success: false, 
          message: 'Method not allowed' 
        })
    }
  } catch (error) {
    console.error('Error in coupons API:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// GET /api/admin/coupons - Get all coupons
async function handleGetCoupons(req, res) {
  const { data: coupons, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Database error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch coupons'
    })
  }
  
  return res.status(200).json({
    success: true,
    data: coupons
  })
}

// POST /api/admin/coupons - Create new coupon
async function handleCreateCoupon(req, res) {
  const couponData = req.body
  
  // Validate input
  const errors = validateCouponData(couponData)
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    })
  }
  
  // Check if coupon code already exists
  const { data: existingCoupon } = await supabase
    .from('coupons')
    .select('id')
    .eq('code', couponData.code.trim().toUpperCase())
    .single()
  
  if (existingCoupon) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code already exists'
    })
  }
  
  // Prepare coupon data
  const newCoupon = {
    code: couponData.code.trim().toUpperCase(),
    name: couponData.name.trim(),
    description: couponData.description?.trim() || null,
    discountType: couponData.discountType,
    discountValue: Number(couponData.discountValue),
    minOrderAmount: couponData.minOrderAmount ? Number(couponData.minOrderAmount) : null,
    maxDiscountAmount: couponData.maxDiscountAmount ? Number(couponData.maxDiscountAmount) : null,
    validFrom: new Date(couponData.validFrom).toISOString(),
    validUntil: new Date(couponData.validUntil).toISOString(),
    usageLimit: couponData.usageLimit ? Number(couponData.usageLimit) : null,
    usageCount: 0,
    isActive: couponData.isActive !== false,
    created_at: new Date().toISOString()
  }
  
  const { data: coupon, error } = await supabase
    .from('coupons')
    .insert([newCoupon])
    .select()
    .single()
  
  if (error) {
    console.error('Database error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to create coupon'
    })
  }
  
  return res.status(201).json({
    success: true,
    message: 'Coupon created successfully',
    data: coupon
  })
}

// PUT /api/admin/coupons?id=coupon_id - Update coupon
async function handleUpdateCoupon(req, res) {
  const { id } = req.query
  const updates = req.body
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
    })
  }
  
  // Validate updates if provided
  if (Object.keys(updates).length > 1 || !updates.hasOwnProperty('isActive')) {
    const errors = validateCouponData(updates)
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      })
    }
  }
  
  // Prepare update data
  const updateData = {}
  if (updates.code) updateData.code = updates.code.trim().toUpperCase()
  if (updates.name) updateData.name = updates.name.trim()
  if (updates.description !== undefined) updateData.description = updates.description?.trim() || null
  if (updates.discountType) updateData.discountType = updates.discountType
  if (updates.discountValue) updateData.discountValue = Number(updates.discountValue)
  if (updates.minOrderAmount !== undefined) updateData.minOrderAmount = updates.minOrderAmount ? Number(updates.minOrderAmount) : null
  if (updates.maxDiscountAmount !== undefined) updateData.maxDiscountAmount = updates.maxDiscountAmount ? Number(updates.maxDiscountAmount) : null
  if (updates.validFrom) updateData.validFrom = new Date(updates.validFrom).toISOString()
  if (updates.validUntil) updateData.validUntil = new Date(updates.validUntil).toISOString()
  if (updates.usageLimit !== undefined) updateData.usageLimit = updates.usageLimit ? Number(updates.usageLimit) : null
  if (updates.isActive !== undefined) updateData.isActive = updates.isActive
  
  const { data: coupon, error } = await supabase
    .from('coupons')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Database error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to update coupon'
    })
  }
  
  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    })
  }
  
  return res.status(200).json({
    success: true,
    message: 'Coupon updated successfully',
    data: coupon
  })
}

// DELETE /api/admin/coupons?id=coupon_id - Delete coupon
async function handleDeleteCoupon(req, res) {
  const { id } = req.query
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
    })
  }
  
  const { error } = await supabase
    .from('coupons')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Database error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to delete coupon'
    })
  }
  
  return res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully'
  })
}