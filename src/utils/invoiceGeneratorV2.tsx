import html2pdf from 'html2pdf.js';

interface InvoiceItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: InvoiceItem[];
  baseAmount: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
  paymentId: string;
  paymentDate: string;
  paymentMethod: string;
}

function generateInvoiceHTML(data: InvoiceData): string {
  const itemsHTML = data.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
        <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${item.product_name}</div>
        <div style="font-size: 11px; color: #9ca3af;">Air Purifier</div>
      </td>
      <td style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">₹${item.unit_price.toLocaleString('en-IN')}</td>
      <td style="padding: 12px; text-align: right; font-weight: 600; border-bottom: 1px solid #e5e7eb;">₹${item.subtotal.toLocaleString('en-IN')}</td>
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
          line-height: 1.6;
          color: #374151;
        }
        .container {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          background: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #86efac;
        }
        .company-info { flex: 1; }
        .company-name {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        .company-details {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.8;
        }
        .invoice-title {
          text-align: right;
          flex: 1;
        }
        .invoice-title h1 {
          font-size: 36px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 10px;
        }
        .invoice-number-box {
          background: #dcfce7;
          border: 2px solid #86efac;
          border-radius: 8px;
          padding: 12px 20px;
          display: inline-block;
        }
        .invoice-number-label {
          font-size: 10px;
          color: #6b7280;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .invoice-number {
          font-size: 18px;
          font-weight: bold;
          color: #16a34a;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }
        .detail-box {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          background: white;
        }
        .detail-box h3 {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
        }
        .customer-name {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .detail-text {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 13px;
        }
        .detail-label { color: #6b7280; }
        .detail-value {
          font-weight: 600;
          color: #1f2937;
          font-family: monospace;
        }
        .items-section { margin-bottom: 30px; }
        .items-section h3 {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }
        thead {
          background: #dcfce7;
        }
        th {
          padding: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #1f2937;
          text-align: left;
        }
        th:nth-child(2) { text-align: center; }
        th:nth-child(3), th:nth-child(4) { text-align: right; }
        .summary {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 30px;
        }
        .summary-box {
          width: 400px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          background: white;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .summary-row.total {
          border-top: 2px solid #e5e7eb;
          padding-top: 12px;
          margin-top: 12px;
        }
        .summary-total-label {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
        }
        .summary-total-value {
          font-size: 22px;
          font-weight: bold;
          color: #16a34a;
        }
        .payment-status {
          background: #dcfce7;
          border: 2px solid #86efac;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
        }
        .payment-status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .status-left { display: flex; gap: 15px; align-items: center; }
        .paid-badge {
          background: #16a34a;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 13px;
        }
        .payment-info { font-size: 13px; color: #6b7280; }
        .payment-info strong { color: #1f2937; }
        .footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
          text-align: center;
        }
        .footer h4 {
          font-size: 18px;
          color: #16a34a;
          margin-bottom: 10px;
        }
        .footer p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.8;
        }
        .tagline {
          font-weight: 600;
          color: #1f2937;
          margin-top: 10px;
        }
        .signature-note {
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
          font-style: italic;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="company-info">
            <div class="company-name">Vaayura</div>
            <div class="company-details">
              62, Rama Road, Najafgarh Road<br>
              Industrial Area, West Delhi<br>
              New Delhi - 110015<br><br>
              GST NO: 07AADCG6361J1ZG<br>
              CIN NO: U29253DL2010PTC197795<br>
              State: Delhi, Code: 07
            </div>
          </div>
          <div class="invoice-title">
            <h1>INVOICE</h1>
            <div class="invoice-number-box">
              <div class="invoice-number-label">Invoice Number</div>
              <div class="invoice-number">${data.invoiceNumber}</div>
            </div>
          </div>
        </div>

        <!-- Customer and Invoice Details -->
        <div class="details-grid">
          <div class="detail-box">
            <h3>Bill To</h3>
            <div class="customer-name">${data.customerName}</div>
            <div class="detail-text">${data.customerEmail}</div>
            <div class="detail-text">${data.customerPhone}</div>
            <div class="detail-text" style="margin-top: 12px;">
              ${data.shippingAddress.line1}<br>
              ${data.shippingAddress.line2 ? data.shippingAddress.line2 + '<br>' : ''}
              ${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.zipCode}
            </div>
          </div>
          <div class="detail-box">
            <h3>Invoice Details</h3>
            <div class="detail-row">
              <span class="detail-label">Invoice Date:</span>
              <span class="detail-value">${data.invoiceDate}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Order ID:</span>
              <span class="detail-value">${data.orderId.substring(0, 13)}...</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment ID:</span>
              <span class="detail-value">${data.paymentId.substring(0, 13)}...</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Payment Date:</span>
              <span class="detail-value">${data.paymentDate}</span>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <div class="items-section">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
        </div>

        <!-- Payment Summary -->
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
              <span class="summary-total-label">Total Amount:</span>
              <span class="summary-total-value">₹${data.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <!-- Payment Status -->
        <div class="payment-status">
          <div class="payment-status-header">
            <div class="status-left">
              <div class="paid-badge">✓ PAID</div>
              <div class="payment-info">
                Method: <strong>${data.paymentMethod}</strong><br>
                Transaction ID: <strong style="font-family: monospace; font-size: 11px;">${data.paymentId}</strong>
              </div>
            </div>
            <div class="payment-info" style="text-align: right;">
              Payment Date:<br>
              <strong>${data.paymentDate}</strong>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <h4>Thank You!</h4>
          <p>
            Thank you for choosing Vaayura.<br>
            We're committed to providing you with the cleanest air possible.
          </p>
          <p class="tagline">Breathe Easy, Live Better.</p>
        </div>

        <div class="signature-note">
          This is a digitally generated invoice and does not require a physical signature.
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function generateAndDownloadInvoice(invoiceData: InvoiceData): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Generate clean HTML
      const htmlContent = generateInvoiceHTML(invoiceData);

      // Create temporary container
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm';
      document.body.appendChild(tempDiv);

      // Get the actual invoice container element
      const invoiceElement = tempDiv.querySelector('.container') as HTMLElement;

      if (!invoiceElement) {
        throw new Error('Invoice container element not found');
      }

      // PDF options optimized for clean output
      const options = {
        margin: 0,
        filename: `Vaayura_Invoice_${invoiceData.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          windowWidth: 794, // A4 width in pixels at 96 DPI
          windowHeight: 1123 // A4 height in pixels at 96 DPI
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true
        }
      };

      // Wait a bit for styles to apply
      setTimeout(() => {
        // Generate PDF
        html2pdf()
          .set(options)
          .from(invoiceElement)
          .save()
          .then(() => {
            // Cleanup
            document.body.removeChild(tempDiv);
            resolve();
          })
          .catch((error: Error) => {
            // Cleanup on error
            document.body.removeChild(tempDiv);
            reject(error);
          });
      }, 500);

    } catch (error) {
      reject(error);
    }
  });
}

// Helper function to format date
export function formatInvoiceDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to format date with time
export function formatPaymentDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// Generate invoice number from order ID
export function generateInvoiceNumber(orderId: string): string {
  const year = new Date().getFullYear();
  const shortId = orderId.substring(0, 8).toUpperCase();
  return `INV-${year}-${shortId}`;
}
