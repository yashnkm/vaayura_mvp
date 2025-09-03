// Vercel Serverless Function: /api/create-order.js
// Handles secure Razorpay order creation

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
    const { productId, quantity = 1, customerData } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get product details and validate
    console.log('Looking for product ID:', productId);
    
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('published', true)
      .single();

    console.log('Product query result:', { product, productError });

    if (productError || !product) {
      console.log('Product not found error:', productError);
      return res.status(404).json({ 
        error: 'Product not found',
        debug: {
          productId: productId,
          productError: productError,
          hasProduct: !!product
        }
      });
    }

    // Calculate total amount
    const totalAmount = Math.round(product.price * quantity * 100); // Convert to paise

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
        product_id: productId,
        product_name: product.name,
        quantity: quantity.toString()
      }
    });

    // Create order in database
    const { data: dbOrder, error: dbError } = await supabase
      .from('orders')
      .insert([{
        product_id: productId,
        product_name: product.name,
        quantity: quantity,
        amount: product.price * quantity,
        currency: 'INR',
        razorpay_order_id: razorpayOrder.id,
        status: 'created',
        user_email: null,
        user_name: null,
        user_phone: null,
        shipping_address: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to create order' });
    }

    // Return success
    res.status(200).json({
      success: true,
      razorpay_order: razorpayOrder,
      order_id: dbOrder.id
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}