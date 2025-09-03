// Vercel Serverless Function: /api/payment-failed.js
// Handles payment failures (cancelled, network errors, etc.)

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
    const { order_id, razorpay_order_id, reason } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Update order status to failed
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', order_id);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
      return res.status(500).json({ error: 'Failed to update order status' });
    }

    // Log payment failure
    await supabase
      .from('payment_logs')
      .insert([{
        order_id: order_id,
        event_type: 'payment_cancelled',
        error_message: reason || 'Payment cancelled by user',
        event_data: {
          razorpay_order_id: razorpay_order_id,
          failure_reason: reason || 'user_cancelled'
        },
        created_at: new Date().toISOString()
      }]);

    res.status(200).json({
      success: true,
      message: 'Order status updated to failed'
    });

  } catch (error) {
    console.error('Payment failure handling error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}