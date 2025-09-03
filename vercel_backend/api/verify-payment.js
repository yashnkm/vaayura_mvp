// Vercel Serverless Function: /api/verify-payment.js
// Handles secure payment verification with crypto signatures

import crypto from 'crypto';
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
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      order_id,
      customerData
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      return res.status(400).json({ error: 'Missing required payment data' });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verify payment signature using crypto
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isValidSignature = expectedSignature === razorpay_signature;

    if (!isValidSignature) {
      // Update order status to failed
      await supabase
        .from('orders')
        .update({
          status: 'failed',
          razorpay_payment_id: razorpay_payment_id,
          razorpay_signature: razorpay_signature,
          updated_at: new Date().toISOString()
        })
        .eq('id', order_id);

      // Log failed verification
      await supabase
        .from('payment_logs')
        .insert([{
          order_id: order_id,
          event_type: 'payment_failed',
          error_message: 'Invalid payment signature',
          event_data: {
            razorpay_order_id,
            razorpay_payment_id,
            provided_signature: razorpay_signature,
            expected_signature: expectedSignature
          },
          created_at: new Date().toISOString()
        }]);

      return res.status(400).json({ 
        error: 'Payment verification failed',
        verified: false 
      });
    }

    // Update order status to paid
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        user_email: customerData?.email,
        user_name: customerData?.name,
        user_phone: customerData?.phone,
        shipping_address: customerData?.address,
        updated_at: new Date().toISOString()
      })
      .eq('id', order_id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return res.status(500).json({ error: 'Failed to update order status' });
    }

    // Log successful payment
    await supabase
      .from('payment_logs')
      .insert([{
        order_id: order_id,
        event_type: 'payment_success',
        event_data: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        },
        created_at: new Date().toISOString()
      }]);

    res.status(200).json({
      success: true,
      verified: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}