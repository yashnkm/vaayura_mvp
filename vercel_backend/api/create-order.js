// Vercel Serverless Function: /api/create-order.js
// Handles secure Razorpay order creation with multi-item cart support

import Razorpay from 'razorpay';
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cartItems, customerData, coupon } = req.body;

    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items are required' });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get all product IDs from cart
    const productIds = cartItems.map(item => item.id);
    console.log('Looking for products:', productIds);

    // Fetch all products in one query
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)
      .eq('published', true);

    console.log('Products query result:', { products, productsError });

    if (productsError || !products || products.length === 0) {
      return res.status(404).json({
        error: 'One or more products not found',
        debug: {
          requestedIds: productIds,
          productsError: productsError,
          foundCount: products?.length || 0
        }
      });
    }

    // Validate all cart items have matching products
    const missingProducts = cartItems.filter(item =>
      !products.find(p => p.id === item.id)
    );

    if (missingProducts.length > 0) {
      return res.status(404).json({
        error: 'Some products not found',
        missingProductIds: missingProducts.map(p => p.id)
      });
    }

    // Calculate cart total
    let baseAmount = 0;
    const lineItems = cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      const subtotal = product.price * cartItem.quantity;
      baseAmount += subtotal;

      return {
        product_id: product.id,
        product_name: product.name,
        quantity: cartItem.quantity,
        unit_price: product.price,
        subtotal: subtotal
      };
    });

    console.log('Cart calculation:', {
      baseAmount,
      itemCount: lineItems.length,
      lineItems
    });

    // Apply coupon discount if provided
    let discountAmount = 0;
    let finalAmount = baseAmount;

    if (coupon && coupon.discountAmount) {
      discountAmount = coupon.discountAmount;
      finalAmount = Math.max(0, baseAmount - discountAmount);
      console.log('Coupon applied:', {
        baseAmount,
        discountAmount,
        finalAmount,
        couponCode: coupon.coupon?.code || 'unknown'
      });
    }

    const totalAmount = Math.round(finalAmount * 100); // Convert to paise

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create order in Razorpay
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        total_items: lineItems.length.toString(),
        base_amount: baseAmount.toString(),
        discount_amount: discountAmount.toString(),
        coupon_code: coupon?.coupon?.code || 'none',
        // Store product summary in notes
        products: lineItems.map(item => `${item.product_name}(${item.quantity})`).join(', ')
      }
    });

    console.log('Razorpay order created:', razorpayOrder.id);

    // Get first product for summary (backward compatibility)
    const firstProduct = lineItems[0];

    // Create main order in database
    const { data: dbOrder, error: dbError } = await supabase
      .from('orders')
      .insert([{
        product_id: firstProduct.product_id, // Primary product for summary
        product_name: firstProduct.product_name,
        quantity: firstProduct.quantity,
        amount: finalAmount, // Final amount after discount
        base_amount: baseAmount, // Original amount before discount
        discount_amount: discountAmount,
        currency: 'INR',
        razorpay_order_id: razorpayOrder.id,
        status: 'created',
        user_email: customerData?.email || null,
        user_name: customerData?.name || null,
        user_phone: customerData?.phone || null,
        shipping_address: customerData?.address ? JSON.stringify(customerData.address) : null,
        coupon_code: coupon?.coupon?.code || null,
        total_items: lineItems.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error creating order:', dbError);
      return res.status(500).json({
        error: 'Failed to create order',
        details: dbError.message
      });
    }

    console.log('Main order created:', dbOrder.id);

    // Create order items (line items)
    const orderItemsToInsert = lineItems.map(item => ({
      order_id: dbOrder.id,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsToInsert);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Don't fail the whole request, just log it
      console.warn('Order created but line items failed. Order ID:', dbOrder.id);
    } else {
      console.log(`Created ${lineItems.length} order items`);
    }

    // Return success
    res.status(200).json({
      success: true,
      razorpay_order: razorpayOrder,
      order_id: dbOrder.id,
      total_items: lineItems.length,
      line_items: lineItems
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
