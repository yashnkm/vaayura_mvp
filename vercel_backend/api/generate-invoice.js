// Vercel Serverless Function: /api/generate-invoice.js
// Generates PDF invoice using Puppeteer

import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';
import puppeteerFull from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateInvoiceHTML(data, logoBase64) {
  const itemsHTML = data.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #1f2937; font-size: 12px;">${item.product_name}</div>
        <div style="font-size: 10px; color: #9ca3af;">Air Purifier</div>
      </td>
      <td style="padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb; font-size: 12px;">${item.quantity}</td>
      <td style="padding: 8px; text-align: right; border-bottom: 1px solid #e5e7eb; font-size: 12px;">₹${item.unit_price.toLocaleString('en-IN')}</td>
      <td style="padding: 8px; text-align: right; font-weight: 600; border-bottom: 1px solid #e5e7eb; font-size: 12px;">₹${item.subtotal.toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          line-height: 1.4;
          color: #374151;
          padding: 20px;
          font-size: 11px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 2px solid #86efac;
        }
        .logo {
          height: 40px;
          margin-bottom: 8px;
        }
        .company-details {
          font-size: 10px;
          color: #6b7280;
          line-height: 1.5;
        }
        .invoice-title h1 {
          font-size: 24px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .invoice-number {
          font-size: 14px;
          font-weight: bold;
          color: #16a34a;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .detail-box {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 12px;
        }
        .detail-box h3 {
          font-size: 10px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .customer-name {
          font-size: 13px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 4px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        thead {
          background: #f3f4f6;
          border-bottom: 2px solid #e5e7eb;
        }
        th {
          padding: 8px;
          font-size: 11px;
          font-weight: 600;
          color: #1f2937;
          text-align: left;
        }
        .summary {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 15px;
        }
        .summary-box {
          width: 350px;
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
        }
        .summary-row.total {
          border-top: 2px solid #e5e7eb;
          padding-top: 10px;
          margin-top: 8px;
          font-size: 14px;
        }
        .summary-total-value {
          font-size: 18px;
          font-weight: bold;
          color: #16a34a;
        }
        .payment-status {
          background: #f0fdf4;
          border-top: 2px solid #86efac;
          border-bottom: 2px solid #86efac;
          padding: 12px;
          margin-bottom: 15px;
        }
        .paid-badge {
          background: #16a34a;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 11px;
          display: inline-block;
        }
        .signature-note {
          text-align: center;
          font-size: 9px;
          color: #9ca3af;
          font-style: italic;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <img src="${logoBase64}" alt="Vaayura Logo" class="logo">
          <div class="company-details">
            62, Rama Road, Najafgarh Road<br>
            Industrial Area, West Delhi<br>
            New Delhi - 110015<br>
            GST NO: 07AADCG6361J1ZG<br>
            CIN NO: U29253DL2010PTC197795<br>
            State: Delhi, Code: 07
          </div>
        </div>
        <div class="invoice-title">
          <h1>INVOICE</h1>
          <div class="invoice-number">${data.invoiceNumber}</div>
        </div>
      </div>

      <div class="details-grid">
        <div class="detail-box">
          <h3>Bill To</h3>
          <div class="customer-name">${data.customerName}</div>
          <div style="font-size: 10px; color: #6b7280;">${data.customerEmail}</div>
          <div style="font-size: 10px; color: #6b7280;">${data.customerPhone}</div>
          <div style="font-size: 10px; color: #6b7280; margin-top: 6px;">
            ${data.shippingAddress.line1}<br>
            ${data.shippingAddress.line2 ? data.shippingAddress.line2 + '<br>' : ''}
            ${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.zipCode}
          </div>
        </div>
        <div class="detail-box">
          <h3>Invoice Details</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 10px;">
            <span>Invoice Date:</span>
            <span style="font-weight: 600;">${data.invoiceDate}</span>
          </div>
          <div style="margin-bottom: 6px; font-size: 9px;">
            <div style="color: #6b7280; margin-bottom: 2px;">Order ID:</div>
            <div style="font-weight: 600; font-family: monospace; word-break: break-all;">${data.orderId}</div>
          </div>
          <div style="margin-bottom: 6px; font-size: 9px;">
            <div style="color: #6b7280; margin-bottom: 2px;">Payment ID:</div>
            <div style="font-weight: 600; font-family: monospace; word-break: break-all;">${data.paymentId}</div>
          </div>
        </div>
      </div>

      <h3 style="font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 15px;">Order Items</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th style="text-align: center;">Quantity</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-box">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span style="font-weight: 600;">₹${data.baseAmount.toLocaleString('en-IN')}</span>
          </div>
          ${data.discountAmount > 0 ? `
          <div class="summary-row">
            <span>Discount ${data.couponCode ? '(' + data.couponCode + ')' : ''}:</span>
            <span style="font-weight: 600; color: #16a34a;">-₹${data.discountAmount.toLocaleString('en-IN')}</span>
          </div>
          ` : ''}
          <div class="summary-row">
            <span>Shipping:</span>
            <span style="font-weight: 600; color: #16a34a;">Free</span>
          </div>
          <div class="summary-row total">
            <span style="font-size: 16px; font-weight: bold;">Total Amount:</span>
            <span class="summary-total-value">₹${data.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div class="payment-status">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div class="paid-badge">✓ PAID</div>
            <div style="font-size: 10px; color: #6b7280;">
              Method: <strong>${data.paymentMethod}</strong><br>
              Transaction: <strong style="font-family: monospace; font-size: 9px;">${data.paymentId}</strong>
            </div>
          </div>
          <div style="font-size: 10px; color: #6b7280;">
            Payment Date:<br>
            <strong>${data.paymentDate}</strong>
          </div>
        </div>
      </div>

      <div class="signature-note">
        This is a digitally generated invoice and does not require a physical signature.
      </div>
    </body>
    </html>
  `;
}

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

  let browser = null;

  try {
    const invoiceData = req.body;

    console.log('Generating invoice PDF for:', invoiceData.invoiceNumber);

    // Read and convert logo to base64
    const logoPath = path.join(__dirname, '..', 'assets', 'logo_2.png');
    let logoBase64 = '';

    try {
      const logoBuffer = fs.readFileSync(logoPath);
      logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    } catch (error) {
      console.warn('Logo not found, using text fallback');
      logoBase64 = ''; // Will fallback to text
    }

    // Generate HTML content
    const htmlContent = generateInvoiceHTML(invoiceData, logoBase64);

    // Detect if we're running on Vercel or locally
    const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production';

    if (isProduction) {
      // Production: Use @sparticuz/chromium (works on Vercel)
      console.log('Using Vercel Chromium for PDF generation');
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Local development: Use regular puppeteer (downloads its own chromium)
      console.log('Using local Chromium for PDF generation');
      browser = await puppeteerFull.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }

    const page = await browser.newPage();

    // Set content and wait for it to load
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });

    await browser.close();

    // Send PDF as response with correct headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Vaayura_Invoice_${invoiceData.invoiceNumber}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send as buffer, not JSON
    res.status(200).end(pdfBuffer);

  } catch (error) {
    console.error('Error generating invoice PDF:', error);

    if (browser) {
      await browser.close();
    }

    res.status(500).json({
      error: 'Failed to generate invoice',
      message: error.message
    });
  }
}
