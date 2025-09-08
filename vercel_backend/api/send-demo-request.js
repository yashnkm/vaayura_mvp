import { createTransporter, sendEmail } from '../utils/emailService.js'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vaayura.com'

const getProductName = (productId) => {
  const productMap = {
    'storm': 'Vaayura Storm Air Purifier',
    'nest': 'Vaayura Nest Air Purifier', 
    'both': 'Both Products (Storm + Nest)',
    'other': 'Other/Not Sure'
  }
  return productMap[productId] || productId
}

const validateDemoRequest = (data) => {
  const errors = []
  
  if (!data.name?.trim()) errors.push('Name is required')
  if (!data.email?.trim()) errors.push('Email is required')
  if (!data.phone?.trim()) errors.push('Phone is required')
  if (!data.product) errors.push('Product selection is required')
  if (!data.quantity || data.quantity < 5) errors.push('Minimum quantity is 5 units')
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Invalid email format')
  }
  
  // Phone validation
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone format')
  }
  
  return errors
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
    const {
      name,
      email,
      phone,
      company,
      product,
      quantity,
      message
    } = req.body
    
    // Validate request data
    const validationErrors = validateDemoRequest(req.body)
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      })
    }
    
    const productName = getProductName(product)
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    
    // Email content for admin
    const adminEmailSubject = `🎯 Demo Request: ${name} - ${productName}`
    const adminEmailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <h1 style="color: #2d5a27; text-align: center; margin-bottom: 30px; font-size: 24px;">
            🎯 New Demo Request Received
          </h1>
          
          <div style="background-color: #f0f8e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4ade80; margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin-top: 0; font-size: 18px;">👤 Customer Details</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2d5a27;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #2d5a27;">${phone}</a></p>
            <p style="margin: 8px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f0f8e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4ade80; margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin-top: 0; font-size: 18px;">📦 Product Information</h2>
            <p style="margin: 8px 0;"><strong>Product of Interest:</strong> ${productName}</p>
            <p style="margin: 8px 0;"><strong>Requested Quantity:</strong> ${quantity} units</p>
            <p style="margin: 8px 0;"><strong>Minimum Quantity Met:</strong> <span style="color: #16a34a;">✅ Yes (${quantity} ≥ 5)</span></p>
          </div>
          
          ${message ? `
          <div style="background-color: #f0f8e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4ade80; margin-bottom: 25px;">
            <h2 style="color: #2d5a27; margin-top: 0; font-size: 18px;">💬 Additional Message</h2>
            <p style="margin: 8px 0; font-style: italic;">"${message}"</p>
          </div>
          ` : ''}
          
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-bottom: 25px;">
            <h2 style="color: #0c4a6e; margin-top: 0; font-size: 18px;">📅 Submission Details</h2>
            <p style="margin: 8px 0;"><strong>Date & Time:</strong> ${timestamp}</p>
            <p style="margin: 8px 0;"><strong>Source:</strong> Vaayura Website Contact Page</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; text-align: center;">
            <h2 style="color: #92400e; margin-top: 0; font-size: 18px;">🚀 Next Steps</h2>
            <p style="margin: 8px 0; color: #92400e; font-weight: bold;">
              Please reach out to ${name} within 24 hours to schedule the demo.
            </p>
            <div style="margin-top: 15px;">
              <a href="mailto:${email}" style="background-color: #4ade80; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Email Customer</a>
              <a href="tel:${phone}" style="background-color: #0ea5e9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Call Customer</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px;">
            <p>This email was automatically generated from the Vaayura website demo booking system.</p>
          </div>
          
        </div>
      </div>
    `
    
    // Send email to admin
    const transporter = createTransporter()
    await sendEmail(transporter, {
      from: process.env.EMAIL_FROM || 'noreply@vaayura.com',
      to: ADMIN_EMAIL,
      subject: adminEmailSubject,
      html: adminEmailBody
    })
    
    // Log successful request
    console.log('Demo request processed:', {
      customer: name,
      email: email,
      product: productName,
      quantity: quantity,
      timestamp: timestamp
    })
    
    return res.status(200).json({
      success: true,
      message: 'Demo request sent successfully',
      data: {
        customerName: name,
        productRequested: productName,
        quantityRequested: quantity,
        submittedAt: timestamp
      }
    })
    
  } catch (error) {
    console.error('Error processing demo request:', error)
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    })
  }
}