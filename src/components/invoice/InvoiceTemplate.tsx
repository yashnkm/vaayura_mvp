import React from 'react';
import logoImage from '@/assets/sections/shared/logos/logo_2.png';

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

interface InvoiceTemplateProps {
  data: InvoiceData;
}

export function InvoiceTemplate({ data }: InvoiceTemplateProps) {
  return (
    <div className="bg-white min-h-screen p-8 font-montserrat">
      {/* A4 Paper Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-brand-pastel-green">
          {/* Logo and Company Info */}
          <div>
            <img
              src={logoImage}
              alt="Vaayura Logo"
              className="h-12 mb-4"
            />
            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="font-semibold text-brand-grey-green text-base">Vaayura</p>
              <p className="mt-2">62, Rama Road, Najafgarh Road</p>
              <p>Industrial Area, West Delhi</p>
              <p>New Delhi - 110015</p>
              <p className="mt-2">GST NO: 07AADCG6361J1ZG</p>
              <p>CIN NO: U29253DL2010PTC197795</p>
              <p>State: Delhi, Code: 07</p>
            </div>
          </div>

          {/* Invoice Title and Number */}
          <div className="text-right">
            <h1 className="text-4xl font-sora font-bold text-brand-grey-green mb-2">
              INVOICE
            </h1>
            <div className="bg-brand-pastel-green/10 border border-brand-pastel-green rounded-xl px-6 py-3 inline-block">
              <p className="text-xs text-gray-600 font-medium mb-1">Invoice Number</p>
              <p className="text-xl font-sora font-bold text-brand-pastel-green">{data.invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Bill To */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Bill To</h3>
            <div className="space-y-2">
              <p className="text-lg font-sora font-bold text-brand-grey-green">{data.customerName}</p>
              <p className="text-sm text-gray-600">{data.customerEmail}</p>
              <p className="text-sm text-gray-600">{data.customerPhone}</p>
              <div className="text-sm text-gray-600 mt-3">
                <p>{data.shippingAddress.line1}</p>
                {data.shippingAddress.line2 && <p>{data.shippingAddress.line2}</p>}
                <p>{data.shippingAddress.city}, {data.shippingAddress.state} - {data.shippingAddress.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Invoice Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Invoice Date:</span>
                <span className="text-sm font-semibold text-brand-grey-green">{data.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="text-sm font-mono text-brand-grey-green">{data.orderId.substring(0, 13)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment ID:</span>
                <span className="text-sm font-mono text-brand-grey-green">{data.paymentId.substring(0, 13)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Date:</span>
                <span className="text-sm font-semibold text-brand-grey-green">{data.paymentDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Order Items</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md">
            <table className="w-full">
              <thead className="bg-brand-pastel-green/10">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-brand-grey-green">Product</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-brand-grey-green">Quantity</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-brand-grey-green">Unit Price</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-brand-grey-green">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-sora font-semibold text-brand-grey-green">{item.product_name}</p>
                      <p className="text-xs text-gray-500">Air Purifier</p>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-gray-700">₹{item.unit_price.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-right font-semibold text-brand-grey-green">₹{item.subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="flex justify-end mb-8">
          <div className="w-full max-w-md">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-semibold">₹{data.baseAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Discount */}
              {data.discountAmount > 0 && (
                <div className="flex justify-between text-brand-pastel-green">
                  <span>Discount {data.couponCode && `(${data.couponCode})`}:</span>
                  <span className="font-semibold">-₹{data.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Shipping */}
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span className="font-semibold text-brand-pastel-green">Free</span>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-sora font-bold text-brand-grey-green">Total Amount:</span>
                  <span className="text-2xl font-sora font-bold text-brand-pastel-green">
                    ₹{data.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Payment Status</h3>
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                    ✓ PAID
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Method: <span className="font-semibold text-brand-grey-green">{data.paymentMethod}</span></p>
                    <p>Transaction ID: <span className="font-mono text-xs text-brand-grey-green">{data.paymentId}</span></p>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Payment Date:</p>
                <p className="font-semibold text-brand-grey-green">{data.paymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="text-center">
            <h4 className="font-sora font-bold text-lg text-brand-pastel-green mb-2">Thank You!</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Thank you for choosing Vaayura.<br />
              We're committed to providing you with the cleanest air possible.
            </p>
            <p className="mt-4 text-brand-grey-green font-semibold">
              Breathe Easy, Live Better.
            </p>
          </div>
        </div>

        {/* Digital Signature Note */}
        <div className="mt-6 text-center text-xs text-gray-500 italic">
          This is a digitally generated invoice and does not require a physical signature.
        </div>

      </div>
    </div>
  );
}
