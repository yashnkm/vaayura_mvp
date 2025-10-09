// Vercel Serverless Function: /api/send-invoice-email.js
// Sends invoice PDF via email using Nodemailer

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerEmail, customerName, invoiceNumber, pdfBuffer } = req.body;

    console.log('Sending invoice email to:', customerEmail);

    // Create transporter using Gmail or other SMTP service
    // You'll need to set these environment variables:
    // EMAIL_USER: your email (e.g., vaayura@gmail.com)
    // EMAIL_PASS: app password (not your regular password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Convert base64 PDF buffer if it's a string, otherwise use as-is
    const pdfAttachment = typeof pdfBuffer === 'string'
      ? Buffer.from(pdfBuffer, 'base64')
      : pdfBuffer;

    // Email options
    const mailOptions = {
      from: {
        name: 'Vaayura',
        address: process.env.EMAIL_USER
      },
      to: customerEmail,
      subject: `Invoice ${invoiceNumber} - Thank you for your purchase!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              line-height: 1.6;
              color: #374151;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #86efac 0%, #16a34a 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
              border-radius: 12px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              margin-bottom: 20px;
            }
            .content p {
              margin: 0 0 15px 0;
            }
            .invoice-number {
              background: #dcfce7;
              border: 2px solid #86efac;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              text-align: center;
            }
            .invoice-number strong {
              color: #16a34a;
              font-size: 18px;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              padding: 20px;
            }
            .footer p {
              margin: 5px 0;
            }
            .tagline {
              color: #16a34a;
              font-weight: bold;
              font-size: 16px;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Thank You for Your Purchase!</h1>
          </div>

          <div class="content">
            <p>Dear ${customerName},</p>

            <p>Thank you for choosing Vaayura! Your payment has been successfully processed.</p>

            <div class="invoice-number">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Invoice Number</p>
              <strong>${invoiceNumber}</strong>
            </div>

            <p>Please find your invoice attached to this email. Keep this invoice for your records.</p>

            <p>Your order is being processed and you will receive shipping updates shortly.</p>

            <p>If you have any questions or concerns, please don't hesitate to contact us.</p>

            <p style="margin-top: 25px;">
              Best regards,<br>
              <strong>Team Vaayura</strong>
            </p>
          </div>

          <div class="footer">
            <p>62, Rama Road, Najafgarh Road Industrial Area</p>
            <p>West Delhi, New Delhi - 110015</p>
            <p class="tagline">Breathe Easy, Live Better.</p>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `Vaayura_Invoice_${invoiceNumber}.pdf`,
          content: pdfAttachment,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Invoice email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);

    res.status(500).json({
      error: 'Failed to send invoice email',
      message: error.message
    });
  }
}
