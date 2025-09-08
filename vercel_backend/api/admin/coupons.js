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

  // Check if coupon code already exists
  const { data: existingCoupon } = await supabase
    .from('coupons')
    .select('id')
    .eq('code', code.toUpperCase().trim())
    .single();

  if (existingCoupon) {
    return res.status(400).json({
      success: false,
      message: 'Coupon code already exists'
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

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
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

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Coupon ID is required'
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
}