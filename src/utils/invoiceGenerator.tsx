import html2pdf from 'html2pdf.js';
import { createRoot } from 'react-dom/client';
import { InvoiceTemplate } from '@/components/invoice/InvoiceTemplate';

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

export async function generateAndDownloadInvoice(invoiceData: InvoiceData): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      document.body.appendChild(container);

      // Render the invoice component into the container
      const root = createRoot(container);
      root.render(<InvoiceTemplate data={invoiceData} />);

      // Wait for React to render, then generate PDF
      setTimeout(() => {
        const options = {
          margin: 0,
          filename: `Vaayura_Invoice_${invoiceData.invoiceNumber}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          }
        };

        // Get the rendered content
        const invoiceElement = container.querySelector('div');

        if (!invoiceElement) {
          throw new Error('Invoice element not found');
        }

        // Generate and download PDF
        html2pdf()
          .set(options)
          .from(invoiceElement)
          .save()
          .then(() => {
            // Cleanup
            root.unmount();
            document.body.removeChild(container);
            resolve();
          })
          .catch((error: Error) => {
            // Cleanup on error
            root.unmount();
            document.body.removeChild(container);
            reject(error);
          });
      }, 1000); // Wait 1 second for images to load

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
