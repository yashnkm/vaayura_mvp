import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Package, Eye, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generateInvoiceNumber } from '@/utils/invoiceGeneratorV2'

interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: string
  subtotal: string
  created_at: string
  updated_at: string
}

interface Order {
  id: string
  user_email: string
  user_name: string
  user_phone: string
  product_id: string
  product_name: string
  quantity: number
  amount: string
  base_amount?: string
  discount_amount?: string
  coupon_code?: string | null
  currency: string
  razorpay_order_id: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  status: string
  shipping_address: string | object
  created_at: string
  updated_at: string
  total_items?: number
  // Joined data from order_items
  order_items?: OrderItem[]
}

interface OrdersManagementProps {
  onBack: () => void
}

export function OrdersManagement({ onBack }: OrdersManagementProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 5

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordersError) {
        console.error('Error loading orders:', ordersError)
        setLoading(false)
        return
      }

      // Fetch all order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')

      if (itemsError) {
        console.error('Error loading order items:', itemsError)
      }

      // Merge order items with orders
      const ordersWithItems = (ordersData || []).map(order => ({
        ...order,
        order_items: (itemsData || []).filter(item => item.order_id === order.id)
      }))

      setOrders(ordersWithItems)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800'

    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'created':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const parseAddress = (address: string | object) => {
    if (typeof address === 'object') {
      return address
    }
    try {
      return JSON.parse(address)
    } catch {
      return { line1: address }
    }
  }

  const formatAddress = (address: string | object) => {
    const addr = parseAddress(address)
    if (typeof addr === 'string') return addr

    const parts = [
      addr.line1,
      addr.line2,
      addr.city,
      addr.state,
      addr.zipCode
    ].filter(Boolean)

    return parts.join(', ')
  }

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    if (!searchQuery.trim()) return true

    const invoiceNumber = generateInvoiceNumber(order.id).toLowerCase()
    const query = searchQuery.toLowerCase().trim()

    // Search by invoice number, customer name, or email
    return (
      invoiceNumber.includes(query) ||
      order.user_name.toLowerCase().includes(query) ||
      order.user_email.toLowerCase().includes(query)
    )
  })

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedOrder(null)}
              className="mb-4 text-brand-grey-green hover:text-brand-grey-green/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
            <h1 className="text-2xl font-heading text-brand-grey-green">
              Invoice #{generateInvoiceNumber(selectedOrder.id)}
            </h1>
            <p className="text-brand-dark-grey font-body">
              {formatDate(selectedOrder.created_at)}
            </p>
          </div>
        </header>

        {/* Order Details */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-brand-grey-green">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.order_items && selectedOrder.order_items.length > 0 ? (
                      selectedOrder.order_items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-brand-grey-green">{item.product_name}</h3>
                            <p className="text-sm text-brand-dark-grey">Quantity: {item.quantity}</p>
                            <p className="text-sm text-brand-dark-grey">
                              Price: ₹{parseFloat(item.unit_price).toLocaleString('en-IN')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-brand-grey-green">
                              ₹{parseFloat(item.subtotal).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 border border-slate-200 rounded-lg text-center text-brand-dark-grey">
                        <p className="text-sm">Order items data not available in order_items table.</p>
                        <p className="text-sm mt-2">Legacy order - product reference: {selectedOrder.product_name || 'N/A'}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
                    {selectedOrder.base_amount && parseFloat(selectedOrder.base_amount) > 0 && selectedOrder.discount_amount && parseFloat(selectedOrder.discount_amount) > 0 ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-brand-dark-grey">Subtotal</span>
                          <span className="text-brand-grey-green">
                            ₹{parseFloat(selectedOrder.base_amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-brand-dark-grey">Discount {selectedOrder.coupon_code && `(${selectedOrder.coupon_code})`}</span>
                          <span className="text-green-600">
                            -₹{parseFloat(selectedOrder.discount_amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span className="text-brand-grey-green">Total</span>
                          <span className="text-brand-grey-green">
                            ₹{parseFloat(selectedOrder.amount).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-brand-grey-green">Total</span>
                        <span className="text-brand-grey-green">
                          ₹{parseFloat(selectedOrder.amount).toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer & Payment Info */}
            <div className="space-y-6">
              {/* Customer Details */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-brand-grey-green">Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-brand-dark-grey">Name</p>
                    <p className="font-medium text-brand-grey-green">{selectedOrder.user_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark-grey">Email</p>
                    <p className="font-medium text-brand-grey-green">{selectedOrder.user_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark-grey">Phone</p>
                    <p className="font-medium text-brand-grey-green">{selectedOrder.user_phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark-grey">Address</p>
                    <p className="font-medium text-brand-grey-green whitespace-pre-line">
                      {formatAddress(selectedOrder.shipping_address)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle className="text-brand-grey-green">Invoice & Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-brand-dark-grey">Invoice Number</p>
                    <p className="font-mono text-sm font-semibold text-brand-grey-green">
                      {generateInvoiceNumber(selectedOrder.id)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark-grey">Payment Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status || 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-brand-dark-grey">Payment Method</p>
                    <p className="font-medium text-brand-grey-green">Razorpay</p>
                  </div>
                  {selectedOrder.razorpay_order_id && (
                    <div>
                      <p className="text-sm text-brand-dark-grey">Razorpay Order ID</p>
                      <p className="font-mono text-xs text-brand-grey-green break-all">
                        {selectedOrder.razorpay_order_id}
                      </p>
                    </div>
                  )}
                  {selectedOrder.razorpay_payment_id && (
                    <div>
                      <p className="text-sm text-brand-dark-grey">Razorpay Payment ID</p>
                      <p className="font-mono text-xs text-brand-grey-green break-all">
                        {selectedOrder.razorpay_payment_id}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-brand-grey-green hover:text-brand-grey-green/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-heading text-brand-grey-green">
            Orders Management
          </h1>
          <p className="text-brand-dark-grey font-body">
            View and manage all customer orders
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-dark-grey" />
            <Input
              type="text"
              placeholder="Search by invoice number, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-brand-pastel-green focus:ring-brand-pastel-green"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-dark-grey hover:text-brand-grey-green"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-grey-green">
                {loading ? '...' : orders.length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {loading ? '...' : filteredOrders.filter(o => o.status && o.status.toLowerCase() === 'paid').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-600">
                {loading ? '...' : filteredOrders.filter(o => o.status && (o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'created')).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {loading ? '...' : `₹${filteredOrders.filter(o => o.status && o.status.toLowerCase() === 'paid').reduce((sum, o) => sum + parseFloat(o.amount), 0).toLocaleString('en-IN')}`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-brand-grey-green">All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="text-brand-dark-grey">Loading orders...</div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-brand-dark-grey mx-auto mb-4" />
                <p className="text-brand-dark-grey">
                  {searchQuery ? 'No orders found matching your search' : 'No orders found'}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Invoice #</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Items</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Total</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((order) => (
                        <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                              {generateInvoiceNumber(order.id)}
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium text-brand-grey-green">{order.user_name}</div>
                              <div className="text-sm text-brand-dark-grey">{order.user_email}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-brand-dark-grey">
                              {formatDate(order.created_at)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-brand-dark-grey">
                              {order.order_items && order.order_items.length > 0
                                ? (() => {
                                    const totalQty = order.order_items.reduce((sum, item) => sum + item.quantity, 0)
                                    return `${totalQty} item${totalQty !== 1 ? 's' : ''}`
                                  })()
                                : `${order.quantity} item${order.quantity !== 1 ? 's' : ''}`
                              }
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-brand-grey-green">
                              ₹{parseFloat(order.amount).toLocaleString('en-IN')}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status || 'Unknown'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                              className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {filteredOrders.length > itemsPerPage && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                    <div className="text-sm text-brand-dark-grey">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
                      {searchQuery && ` (filtered from ${orders.length} total)`}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </Button>
                      <div className="flex items-center px-4 text-sm text-brand-grey-green">
                        Page {currentPage} of {Math.ceil(filteredOrders.length / itemsPerPage)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredOrders.length / itemsPerPage), prev + 1))}
                        disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
                        className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
