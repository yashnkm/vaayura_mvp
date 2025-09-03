import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS - Set headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request received');
    return res.status(200).json({ message: 'CORS preflight OK' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, quantity = 1, customerData } = req.body;

    console.log('Request body:', { productId, quantity, customerData });

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // First, let's check if products table exists and has data
    console.log('Checking products table...');
    
    const { data: allProducts, error: allProductsError } = await supabase
      .from('products')
      .select('*');

    console.log('All products:', { allProducts, allProductsError });

    // Get specific product
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
          hasProduct: !!product,
          availableProducts: allProducts
        }
      });
    }

    // If we get here, product exists, let's try to create Razorpay order
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

    console.log('Razorpay order created:', razorpayOrder);

    // Return success without database insertion for now
    res.status(200).json({
      success: true,
      razorpay_order: razorpayOrder,
      debug_info: {
        product: product,
        totalAmount: totalAmount,
        message: 'Order created successfully (debug mode)'
      }
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      stack: error.stack
    });
  }
}