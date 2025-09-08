<<<<<<< HEAD
// Vercel Serverless Function: /api/admin/coupons.js
// CRUD operations for coupon management

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    switch (req.method) {
      case 'GET':
        return await handleGetCoupons(req, res, supabase);
      case 'POST':
        return await handleCreateCoupon(req, res, supabase);
      case 'PUT':
        return await handleUpdateCoupon(req, res, supabase);
      case 'DELETE':
        return await handleDeleteCoupon(req, res, supabase);
      default:
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in coupons API:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
}

// GET - Fetch all coupons
async function handleGetCoupons(req, res, supabase) {
  const { data: coupons, error } = await supabase
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coupons:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch coupons'
    });
  }

  // Format coupons for frontend
  const formattedCoupons = coupons.map(coupon => ({
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
    usageCount: coupon.usage_count,
    createdAt: coupon.created_at,
    updatedAt: coupon.updated_at
  }));

  res.status(200).json({
    success: true,
    data: formattedCoupons
  });
}

// POST - Create new coupon
async function handleCreateCoupon(req, res, supabase) {
  const {
    code,
    name,
    description,
    discountType,
    discountValue,
    minOrderAmount,
    maxDiscountAmount,
    isActive,
    validFrom,
    validUntil,
    usageLimit
  } = req.body;

  // Validation
  if (!code || !name || !discountType || !discountValue || !validFrom || !validUntil) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: code, name, discountType, discountValue, validFrom, validUntil'
    });
  }

  if (!['fixed', 'percentage'].includes(discountType)) {
    return res.status(400).json({
      success: false,
      message: 'discountType must be either "fixed" or "percentage"'
    });
  }

  if (discountValue <= 0) {
    return res.status(400).json({
      success: false,
      message: 'discountValue must be greater than 0'
    });
  }

=======
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
  
>>>>>>> 0c02b31d5c32753dc145f5cbbc8a8aab88bbb561
  // Check if coupon code already exists
  const { data: existingCoupon } = await supabase
    .from('coupons')
    .select('id')
<<<<<<< HEAD
    .eq('code', code.toUpperCase().trim())
    .single();

=======
    .eq('code', couponData.code.trim().toUpperCase())
    .single()
  
>>>>>>> 0c02b31d5c32753dc145f5cbbc8a8aab88bbb561
  if (existingCoupon) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code already exists'
<<<<<<< HEAD
    });
  }

  // Create coupon
  const { data: newCoupon, error } = await supabase
    .from('coupons')
    .insert([{
      code: code.toUpperCase().trim(),
      name: name.trim(),
      description: description?.trim() || null,
      discount_type: discountType,
      discount_value: parseFloat(discountValue),
      min_order_amount: minOrderAmount ? parseFloat(minOrderAmount) : null,
      max_discount_amount: maxDiscountAmount ? parseFloat(maxDiscountAmount) : null,
      is_active: isActive !== false,
      valid_from: validFrom,
      valid_until: validUntil,
      usage_limit: usageLimit ? parseInt(usageLimit) : null,
      usage_count: 0
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create coupon'
    });
  }

  // Format response
  const formattedCoupon = {
    id: newCoupon.id,
    code: newCoupon.code,
    name: newCoupon.name,
    description: newCoupon.description,
    discountType: newCoupon.discount_type,
    discountValue: newCoupon.discount_value,
    minOrderAmount: newCoupon.min_order_amount,
    maxDiscountAmount: newCoupon.max_discount_amount,
    isActive: newCoupon.is_active,
    validFrom: newCoupon.valid_from,
    validUntil: newCoupon.valid_until,
    usageLimit: newCoupon.usage_limit,
    usageCount: newCoupon.usage_count,
    createdAt: newCoupon.created_at,
    updatedAt: newCoupon.updated_at
  };

  res.status(201).json({
    success: true,
    data: formattedCoupon
  });
}

// PUT - Update coupon
async function handleUpdateCoupon(req, res, supabase) {
  const { id } = req.query;
  const updates = req.body;

=======
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
  
>>>>>>> 0c02b31d5c32753dc145f5cbbc8a8aab88bbb561
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
<<<<<<< HEAD
    });
  }

  // Convert frontend field names to database field names
  const dbUpdates = {};
  if (updates.code !== undefined) dbUpdates.code = updates.code.toUpperCase().trim();
  if (updates.name !== undefined) dbUpdates.name = updates.name.trim();
  if (updates.description !== undefined) dbUpdates.description = updates.description?.trim() || null;
  if (updates.discountType !== undefined) dbUpdates.discount_type = updates.discountType;
  if (updates.discountValue !== undefined) dbUpdates.discount_value = parseFloat(updates.discountValue);
  if (updates.minOrderAmount !== undefined) dbUpdates.min_order_amount = updates.minOrderAmount ? parseFloat(updates.minOrderAmount) : null;
  if (updates.maxDiscountAmount !== undefined) dbUpdates.max_discount_amount = updates.maxDiscountAmount ? parseFloat(updates.maxDiscountAmount) : null;
  if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
  if (updates.validFrom !== undefined) dbUpdates.valid_from = updates.validFrom;
  if (updates.validUntil !== undefined) dbUpdates.valid_until = updates.validUntil;
  if (updates.usageLimit !== undefined) dbUpdates.usage_limit = updates.usageLimit ? parseInt(updates.usageLimit) : null;

  dbUpdates.updated_at = new Date().toISOString();

  const { data: updatedCoupon, error } = await supabase
    .from('coupons')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating coupon:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update coupon'
    });
  }

  if (!updatedCoupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  // Format response
  const formattedCoupon = {
    id: updatedCoupon.id,
    code: updatedCoupon.code,
    name: updatedCoupon.name,
    description: updatedCoupon.description,
    discountType: updatedCoupon.discount_type,
    discountValue: updatedCoupon.discount_value,
    minOrderAmount: updatedCoupon.min_order_amount,
    maxDiscountAmount: updatedCoupon.max_discount_amount,
    isActive: updatedCoupon.is_active,
    validFrom: updatedCoupon.valid_from,
    validUntil: updatedCoupon.valid_until,
    usageLimit: updatedCoupon.usage_limit,
    usageCount: updatedCoupon.usage_count,
    createdAt: updatedCoupon.created_at,
    updatedAt: updatedCoupon.updated_at
  };

  res.status(200).json({
    success: true,
    data: formattedCoupon
  });
}

// DELETE - Delete coupon
async function handleDeleteCoupon(req, res, supabase) {
  const { id } = req.query;

=======
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
  
>>>>>>> 0c02b31d5c32753dc145f5cbbc8a8aab88bbb561
  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
<<<<<<< HEAD
    });
  }

  const { error } = await supabase
    .from('coupons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting coupon:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete coupon'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Coupon deleted successfully'
  });
=======
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
>>>>>>> 0c02b31d5c32753dc145f5cbbc8a8aab88bbb561
}