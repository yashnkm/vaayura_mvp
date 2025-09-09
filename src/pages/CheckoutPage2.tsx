import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Shield, Truck, Plus, Minus, Trash2, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { couponService } from '@/services/couponService'
import { AppliedCoupon } from '@/types/coupon'
import { useAdminProducts } from '@/hooks/useProducts'
import logoImage from '@/assets/sections/shared/logos/logo_2.png'

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CustomerData {
  name: string
  email: string
  phone: string
  address: {
    line1: string
    line2: string
    city: string
    state: string
    zipCode: string
  }
}

interface RecommendedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
}

export function CheckoutPage2() {
  const location = useLocation()
  const navigate = useNavigate()
  const { products } = useAdminProducts()
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  
  // Cart system - initialize with both Storm and Nest products
  const initialItems = [
    {
      id: '51f1a996-6e38-42a3-a952-b62a40436735', // Storm product UUID
      name: 'Strom', // Match database name
      price: 15000, // Match database price
      quantity: location.state?.item?.id === '51f1a996-6e38-42a3-a952-b62a40436735' ? (location.state.item.quantity || 1) : 0,
      image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'
    },
    {
      id: '719171bd-7b50-482f-9ee5-fc8c946c8b15', // Nest product UUID
      name: 'Nest', // Match database name
      price: 10000, // Match database price
      quantity: location.state?.item?.id === '719171bd-7b50-482f-9ee5-fc8c946c8b15' ? (location.state.item.quantity || 1) : 0,
      image: '/src/assets/sections/products/product-images/nestfrontview.png'
    }
  ]
  
  const [cartItems, setCartItems] = useState<CheckoutItem[]>(initialItems)

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  // Get recommended products - remove duplicates and prepare for 3-product display
  const getAllRecommendedProducts = (): RecommendedProduct[] => {
    // Admin products from database (no filtering by cart items)
    const adminRecommendations = products
      .filter(product => product.published)
      .map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: Math.round(product.price * 1.25), // 25% markup as original price
        image: product.images[0] || '/src/assets/Productimages/stormfrontview.png',
        badge: product.name.toLowerCase().includes('storm') ? 'Best Seller' : 
               product.name.toLowerCase().includes('nest') ? 'Compact' : 'Popular'
      }))
    
    // Fallback products (including filters) - only if not in admin products
    const fallbackProducts: RecommendedProduct[] = [
      {
        id: '719171bd-7b50-482f-9ee5-fc8c946c8b15', // Nest UUID
        name: 'Nest',
        price: 10000,
        originalPrice: 12000,
        image: '/src/assets/sections/products/product-images/nestfrontview.png',
        badge: 'Compact'
      },
      {
        id: 'hepa-filter',
        name: 'HEPA Filter Replacement',
        price: 1999,
        originalPrice: 2499,
        image: '/src/assets/4 layer filter.jpg',
        badge: 'Essential'
      },
      {
        id: 'carbon-filter',
        name: 'Carbon Pre-Filter',
        price: 899,
        originalPrice: 1299,
        image: '/src/assets/4 layer filter.jpg',
        badge: 'Essential'
      },
      {
        id: 'uv-lamp',
        name: 'UV-C Sanitizer Lamp',
        price: 2499,
        originalPrice: 2999,
        image: '/src/assets/4 layer filter.jpg',
        badge: 'Advanced'
      }
    ]
    
    // Combine admin products with fallback, removing duplicates
    const combined = [...adminRecommendations]
    
    fallbackProducts.forEach(fallback => {
      const existsInAdmin = adminRecommendations.some(admin => 
        admin.id === fallback.id ||
        admin.name.toLowerCase().includes(fallback.name.toLowerCase())
      )
      if (!existsInAdmin) {
        combined.push(fallback)
      }
    })
    
    // Remove any duplicate IDs
    const uniqueProducts = combined.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    )
    
    return uniqueProducts
  }
  
  const allRecommendedProducts = getAllRecommendedProducts()
  
  // Get current 3 products to display based on currentRecommendationIndex
  const getVisibleRecommendedProducts = (): RecommendedProduct[] => {
    const startIndex = currentRecommendationIndex
    const visibleProducts = []
    
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % allRecommendedProducts.length
      if (allRecommendedProducts[index]) {
        visibleProducts.push(allRecommendedProducts[index])
      }
    }
    
    return visibleProducts
  }
  
  const recommendedProducts = getVisibleRecommendedProducts()

  // Calculate totals based on cart items with quantity > 0
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const couponDiscount = appliedCoupon ? appliedCoupon.discountAmount : 0
  const finalAmount = totalAmount - couponDiscount

  // Cart management functions
  const addToCart = (productId: string) => {
    // First try to find in admin products
    let product = products.find(p => p.id === productId)
    
    // If not found in admin products, check fallback products
    if (!product) {
      const fallbackMap: { [key: string]: any } = {
        '51f1a996-6e38-42a3-a952-b62a40436735': { id: '51f1a996-6e38-42a3-a952-b62a40436735', name: 'Strom', price: 15000, images: ['https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'] },
        '719171bd-7b50-482f-9ee5-fc8c946c8b15': { id: '719171bd-7b50-482f-9ee5-fc8c946c8b15', name: 'Nest', price: 10000, images: ['/src/assets/sections/products/product-images/nestfrontview.png'] },
        'hepa-filter': { id: 'hepa-filter', name: 'HEPA Filter Replacement', price: 1999, images: ['/src/assets/4 layer filter.jpg'] },
        'carbon-filter': { id: 'carbon-filter', name: 'Carbon Pre-Filter', price: 899, images: ['/src/assets/4 layer filter.jpg'] },
        'uv-lamp': { id: 'uv-lamp', name: 'UV-C Sanitizer Lamp', price: 2499, images: ['/src/assets/4 layer filter.jpg'] }
      }
      product = fallbackMap[productId]
    }
    
    if (!product) return
    
    const existingItem = cartItems.find(item => item.id === productId)
    
    if (existingItem) {
      // Update quantity if item already exists
      setCartItems(prev => prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      // Add new item to cart
      const newItem: CheckoutItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0] || '/src/assets/Productimages/stormfrontview.png'
      }
      setCartItems(prev => [...prev, newItem])
    }
    
    // Reset coupon if applied (since cart total changed)
    if (appliedCoupon) {
      setAppliedCoupon(null)
      setCouponError('')
      setCouponCode('')
    }
  }

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 0) { // Allow 0 quantity for items
      setCartItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
    
    // Reset coupon if applied (since cart total changed)
    if (appliedCoupon) {
      setAppliedCoupon(null)
      setCouponError('')
      setCouponCode('')
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
    
    // Reset coupon if applied
    if (appliedCoupon) {
      setAppliedCoupon(null)
      setCouponError('')
      setCouponCode('')
    }
  }

  const nextRecommendation = () => {
    setCurrentRecommendationIndex((prev) => 
      (prev + 1) % allRecommendedProducts.length
    )
  }

  const prevRecommendation = () => {
    setCurrentRecommendationIndex((prev) => 
      prev === 0 ? allRecommendedProducts.length - 1 : prev - 1
    )
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    setApplyingCoupon(true)
    setCouponError('')

    try {
      // Validate coupon against the total order amount (before existing discounts)
      const validationResult = await couponService.validateCoupon(couponCode.trim(), totalAmount)
      
      if (validationResult.isValid && validationResult.coupon) {
        setAppliedCoupon({
          coupon: validationResult.coupon,
          discountAmount: validationResult.discountAmount
        })
        setCouponCode('')
        setCouponError('')
      } else {
        setCouponError(validationResult.errorMessage || 'Invalid coupon code')
        setAppliedCoupon(null)
      }
    } catch (error) {
      console.error('Error applying coupon:', error)
      setCouponError('Failed to apply coupon. Please try again.')
    } finally {
      setApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const handleInputChange = (field: string, value: string, isAddress = false) => {
    if (isAddress) {
      setCustomerData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }))
    } else {
      setCustomerData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const validateForm = () => {
    const { name, email, phone, address } = customerData
    return name && email && phone && address.line1 && address.city && address.state && address.zipCode
  }

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      // Create order via backend API
      // Filter items with quantity > 0
      const itemsWithQuantity = cartItems.filter(item => item.quantity > 0)
      if (itemsWithQuantity.length === 0) {
        throw new Error('No items in cart')
      }

      // For now, handle the first item with quantity > 0 (backend limitation)
      const firstItem = itemsWithQuantity[0]
      
      const requestPayload = {
        productId: firstItem.id,
        quantity: firstItem.quantity,
        customerData: customerData,
        coupon: appliedCoupon
      }

      console.log('Sending payment request:', JSON.stringify(requestPayload, null, 2))

      const response = await fetch('http://localhost:3000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      const orderData = await response.json()
      console.log('Response data:', JSON.stringify(orderData, null, 2))
      
      if (!response.ok || !orderData.success) {
        throw new Error(orderData.error || orderData.message || `Server error: ${response.status}`)
      }

      // Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.razorpay_order.amount,
        currency: orderData.razorpay_order.currency,
        name: 'Vaayura',
        description: `Payment for ${itemsWithQuantity.length} item(s)`,
        order_id: orderData.razorpay_order.id,
        handler: async function (response: any) {
          setShowConfirmation(true)
          setLoading(false)
        },
        prefill: {
          name: customerData.name,
          email: customerData.email,
          contact: customerData.phone
        },
        theme: {
          color: '#16a34a'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded')
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="Vaayura Logo" 
                className="h-8 w-auto cursor-pointer" 
                onClick={() => navigate('/')}
              />
            </div>
            <div className="flex items-center space-x-2">
              {/* Progress text removed as requested */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Cart Items */}
            {cartItems.map((item) => {
              const adminProduct = products.find(p => p.id === item.id)
              return (
                <div key={item.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                        alt={item.name}
                        className="w-16 h-16 sm:w-24 sm:h-24 object-contain rounded-lg"
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'contain'
                        }}
                        loading="lazy"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                        <div className="text-lg sm:text-xl font-semibold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            className="p-2 sm:p-3 hover:bg-gray-100 transition-colors touch-manipulation"
                            disabled={item.quantity <= 0}
                          >
                            <Minus size={16} className={item.quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                          </button>
                          <span className="px-3 sm:px-4 py-2 min-w-[50px] sm:min-w-[60px] text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                            className="p-2 sm:p-3 hover:bg-gray-100 transition-colors touch-manipulation"
                          >
                            <Plus size={16} className="text-gray-600" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2 sm:p-3 transition-colors touch-manipulation"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}


            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={customerData.address.line1}
                    onChange={(e) => handleInputChange('line1', e.target.value, true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={customerData.address.line2}
                    onChange={(e) => handleInputChange('line2', e.target.value, true)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Apartment, suite, etc."
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.city}
                      onChange={(e) => handleInputChange('city', e.target.value, true)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.state}
                      onChange={(e) => handleInputChange('state', e.target.value, true)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value, true)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="ZIP"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:sticky lg:top-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Summary</h2>

              {/* Coupon Code Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Have a coupon code?</h3>
                
                {!appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                        disabled={applyingCoupon}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-green-800 hover:bg-green-900 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {applyingCoupon ? 'Applying...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm">{couponError}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          {appliedCoupon.coupon.code}
                        </p>
                        <p className="text-xs text-green-600">
                          {appliedCoupon.coupon.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-800">
                        -₹{appliedCoupon.discountAmount.toLocaleString()}
                      </span>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.filter(item => item.quantity > 0).length} item{cartItems.filter(item => item.quantity > 0).length !== 1 ? 's' : ''})</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-gray-700">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Coupon ({appliedCoupon.coupon.code})
                    </span>
                    <span className="text-green-600">-₹{couponDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 mb-6">
                <span className="text-lg font-semibold text-gray-900">Order Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{Math.round(finalAmount).toLocaleString()}
                </span>
              </div>


              {/* Proceed Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !validateForm()}
                className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-400 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors text-base sm:text-lg touch-manipulation"
              >
                {loading ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Secure Checkout</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">
              Your order has been confirmed. You will receive an email confirmation shortly.
            </p>
            <button
              onClick={() => {
                setShowConfirmation(false)
                navigate('/products')
              }}
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}