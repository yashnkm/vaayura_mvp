import { InvoiceTemplate } from '@/components/invoice/InvoiceTemplate';
import { useLocation } from 'react-router-dom';

export function InvoicePreviewPage() {
  const location = useLocation();
  const invoiceData = location.state?.invoiceData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This will be implemented with html2pdf.js
    alert('PDF download will be implemented next!');
  };

  if (!invoiceData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-sora font-bold text-brand-grey-green mb-4">No Invoice Data</h1>
          <p className="text-gray-600">Please complete a payment to view your invoice.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Action Bar - Hidden when printing */}
      <div className="print:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-sora font-bold text-brand-grey-green">Invoice Preview</h1>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-gray-300 text-brand-grey-green font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-brand-pastel-green text-brand-grey-green font-semibold rounded-lg hover:bg-green-700 hover:text-white transition-colors"
            >
              📥 Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Template */}
      <div className="py-8">
        <InvoiceTemplate data={invoiceData} />
      </div>
    </div>
  );
}
