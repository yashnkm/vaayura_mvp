import nodemailer from 'nodemailer'

// Create email transporter
export const createTransporter = () => {
  // For Gmail SMTP
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your-email@gmail.com
        pass: process.env.EMAIL_APP_PASSWORD // App-specific password
      }
    })
  }
  
  // For SendGrid SMTP  
  if (process.env.EMAIL_SERVICE === 'sendgrid') {
    return nodemailer.createTransporter({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    })
  }
  
  // For custom SMTP
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  })
}

// Send email function
export const sendEmail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// Email templates
export const createDemoRequestTemplate = (data) => {
  const { name, email, phone, company, product, quantity, message } = data
  
  return {
    subject: `🎯 Demo Request: ${name} - ${product}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2d5a27;">New Demo Request</h1>
        <h2>Customer Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Company:</strong> ${company || 'Not provided'}</li>
        </ul>
        <h2>Product Information:</h2>
        <ul>
          <li><strong>Product:</strong> ${product}</li>
          <li><strong>Quantity:</strong> ${quantity} units</li>
        </ul>
        ${message ? `<h2>Message:</h2><p>${message}</p>` : ''}
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      </div>
    `
  }
}