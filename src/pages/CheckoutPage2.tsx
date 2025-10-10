import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CreditCard, Shield, Truck, Plus, Minus, Trash2, ChevronLeft, ChevronRight, Tag } from 'lucide-react'
import { couponService } from '@/services/couponService'
import { AppliedCoupon } from '@/types/coupon'
import { useAdminProducts } from '@/hooks/useProducts'
import logoImage from '@/assets/sections/shared/logos/logo_2.png'
import { formatInvoiceDate, formatPaymentDate, generateInvoiceNumber } from '@/utils/invoiceGeneratorV2'

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
  const [showVerificationLoading, setShowVerificationLoading] = useState(false)
  const [verificationStage, setVerificationStage] = useState<'verifying' | 'generating' | 'downloading' | 'emailing'>('verifying')
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    zipCode: ''
  })

  // State for cart items - will be populated with actual backend prices
  const [cartItems, setCartItems] = useState<CheckoutItem[]>([])

  // Fetch actual product prices from backend on component mount
  useEffect(() => {
    // Only initialize when products are loaded
    if (!products || products.length === 0) {
      return
    }

    const initializeCartWithBackendPrices = async () => {
      try {
        // Find Storm and Nest products from the products hook
        const stormProduct = products.find(p =>
          p.id === '51f1a996-6e38-42a3-a952-b62a40436735' ||
          p.name.toLowerCase().includes('storm')
        )
        const nestProduct = products.find(p =>
          p.id === '719171bd-7b50-482f-9ee5-fc8c946c8b15' ||
          p.name.toLowerCase().includes('nest')
        )


        const initialItems = [
          {
            id: '51f1a996-6e38-42a3-a952-b62a40436735',
            name: 'Storm',
            price: stormProduct?.price || 15999, // Always use backend price
            quantity: location.state?.item?.id === '51f1a996-6e38-42a3-a952-b62a40436735' ? (location.state.item.quantity || 1) : 0, // Start at 0 if no item passed
            image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'
          },
          {
            id: '719171bd-7b50-482f-9ee5-fc8c946c8b15',
            name: 'Nest',
            price: nestProduct?.price || 7999, // Always use backend price
            quantity: location.state?.item?.id === '719171bd-7b50-482f-9ee5-fc8c946c8b15' ? (location.state.item.quantity || 1) : 0, // Start at 0 if no item passed
            image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755666606/vaayura/products/tsbzsxd55ya5hrequbm9.png'
          }
        ]

        // If coming from product page, use quantity but keep backend prices
        if (location.state?.item) {
          const incomingItem = location.state.item
          const itemIndex = initialItems.findIndex(item => item.id === incomingItem.id)
          if (itemIndex !== -1) {
            initialItems[itemIndex] = {
              ...initialItems[itemIndex],
              // Keep backend price, only update quantity
              quantity: incomingItem.quantity || 1
            }
          }
        }

        setCartItems(initialItems)
      } catch (error) {
        // Fallback to hardcoded values if backend fetch fails
        const fallbackItems = [
          {
            id: '51f1a996-6e38-42a3-a952-b62a40436735',
            name: 'Storm',
            price: 15999,
            quantity: location.state?.item?.id === '51f1a996-6e38-42a3-a952-b62a40436735' ? (location.state.item.quantity || 1) : 0,
            image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'
          },
          {
            id: '719171bd-7b50-482f-9ee5-fc8c946c8b15',
            name: 'Nest',
            price: 7999,
            quantity: location.state?.item?.id === '719171bd-7b50-482f-9ee5-fc8c946c8b15' ? (location.state.item.quantity || 1) : 0,
            image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755666606/vaayura/products/tsbzsxd55ya5hrequbm9.png'
          }
        ]
        setCartItems(fallbackItems)
      }
    }

    initializeCartWithBackendPrices()
  }, [products, location.state])

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
        name: 'True HEPA 13 Filter Replacement',
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
        '51f1a996-6e38-42a3-a952-b62a40436735': { id: '51f1a996-6e38-42a3-a952-b62a40436735', name: 'Storm', price: 15000, images: ['https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'] },
        '719171bd-7b50-482f-9ee5-fc8c946c8b15': { id: '719171bd-7b50-482f-9ee5-fc8c946c8b15', name: 'Nest', price: 10000, images: ['https://res.cloudinary.com/dmdhhrgme/image/upload/v1755666606/vaayura/products/tsbzsxd55ya5hrequbm9.png'] },
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

  // Validation helper functions
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required'
    }
    // Remove spaces, dashes, and plus signs for validation
    const cleanPhone = phone.replace(/[\s\-+]/g, '')
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid 10-digit phone number'
    }
    return ''
  }

  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Name is required'
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters'
    }
    if (/\d/.test(name)) {
      return 'Name should not contain numbers'
    }
    return ''
  }

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) {
      return `${fieldName} is required`
    }
    return ''
  }

  const validateZipCode = (zipCode: string): string => {
    if (!zipCode.trim()) {
      return 'ZIP code is required'
    }
    // Indian PIN code validation (6 digits)
    const zipRegex = /^[0-9]{6}$/
    if (!zipRegex.test(zipCode)) {
      return 'Please enter a valid 6-digit PIN code'
    }
    return ''
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

      // Validate address field on change
      let error = ''
      if (field === 'line1') {
        error = validateRequired(value, 'Address Line 1')
      } else if (field === 'city') {
        error = validateRequired(value, 'City')
      } else if (field === 'state') {
        error = validateRequired(value, 'State')
      } else if (field === 'zipCode') {
        error = validateZipCode(value)
      }

      setValidationErrors(prev => ({
        ...prev,
        [field]: error
      }))
    } else {
      setCustomerData(prev => ({
        ...prev,
        [field]: value
      }))

      // Validate customer field on change
      let error = ''
      if (field === 'name') {
        error = validateName(value)
      } else if (field === 'email') {
        error = validateEmail(value)
      } else if (field === 'phone') {
        error = validatePhone(value)
      }

      setValidationErrors(prev => ({
        ...prev,
        [field]: error
      }))
    }
  }

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const { name, email, phone, address } = customerData
    const errors: string[] = []
    const newValidationErrors = {
      name: '',
      email: '',
      phone: '',
      line1: '',
      city: '',
      state: '',
      zipCode: ''
    }

    // Validate name
    const nameError = validateName(name)
    if (nameError) {
      errors.push(nameError)
      newValidationErrors.name = nameError
    }

    // Validate email
    const emailError = validateEmail(email)
    if (emailError) {
      errors.push(emailError)
      newValidationErrors.email = emailError
    }

    // Validate phone
    const phoneError = validatePhone(phone)
    if (phoneError) {
      errors.push(phoneError)
      newValidationErrors.phone = phoneError
    }

    // Validate address line 1
    const line1Error = validateRequired(address.line1, 'Address Line 1')
    if (line1Error) {
      errors.push(line1Error)
      newValidationErrors.line1 = line1Error
    }

    // Validate city
    const cityError = validateRequired(address.city, 'City')
    if (cityError) {
      errors.push(cityError)
      newValidationErrors.city = cityError
    }

    // Validate state
    const stateError = validateRequired(address.state, 'State')
    if (stateError) {
      errors.push(stateError)
      newValidationErrors.state = stateError
    }

    // Validate ZIP code
    const zipError = validateZipCode(address.zipCode)
    if (zipError) {
      errors.push(zipError)
      newValidationErrors.zipCode = zipError
    }

    // Update validation errors state
    setValidationErrors(newValidationErrors)

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const handlePayment = async () => {
    // Validate form and get detailed errors
    const validation = validateForm()

    if (!validation.isValid) {
      // Create a detailed error message
      const errorMessage = `Please fix the following errors:\n\n${validation.errors.map((error, index) => `${index + 1}. ${error}`).join('\n')}`
      alert(errorMessage)
      return
    }

    // Check if cart has items
    const itemsWithQuantity = cartItems.filter(item => item.quantity > 0)
    if (itemsWithQuantity.length === 0) {
      alert('Your cart is empty. Please add at least one item.')
      return
    }

    setLoading(true)

    try {
      // Prepare cart items for backend
      const requestPayload = {
        cartItems: itemsWithQuantity.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        customerData: customerData,
        coupon: appliedCoupon
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      })

      const orderData = await response.json()

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
        handler: async function (razorpayResponse: any) {
          try {
            // Small delay to ensure Razorpay modal closes, then show verification loading popup
            setTimeout(() => {
              setShowVerificationLoading(true)
              setVerificationStage('verifying')
            }, 300)

            // Verify payment with backend
            const verifyResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                order_id: orderData.order_id,
                customerData: customerData
              })
            })

            const verifyResult = await verifyResponse.json()

            if (verifyResult.verified && verifyResult.success) {
              // Payment verified successfully

              // Generate and download invoice from backend
              try {
                setVerificationStage('generating')
                const now = new Date();
                const invoiceData = {
                  invoiceNumber: generateInvoiceNumber(orderData.order_id),
                  invoiceDate: formatInvoiceDate(now),
                  orderId: orderData.order_id,
                  customerName: customerData.name,
                  customerEmail: customerData.email,
                  customerPhone: customerData.phone,
                  shippingAddress: customerData.address,
                  items: orderData.line_items || itemsWithQuantity.map(item => ({
                    product_name: item.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    subtotal: item.price * item.quantity
                  })),
                  baseAmount: totalAmount,
                  discountAmount: couponDiscount,
                  totalAmount: finalAmount,
                  couponCode: appliedCoupon?.coupon?.code,
                  paymentId: razorpayResponse.razorpay_payment_id,
                  paymentDate: formatPaymentDate(now),
                  paymentMethod: 'Razorpay'
                };

                // Call backend to generate PDF
                const invoiceResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-invoice`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(invoiceData)
                });

                if (!invoiceResponse.ok) {
                  throw new Error('Failed to generate invoice PDF');
                }

                // Download the PDF
                setVerificationStage('downloading')
                const blob = await invoiceResponse.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Vaayura_Invoice_${invoiceData.invoiceNumber}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                // Send invoice via email
                try {
                  setVerificationStage('emailing')

                  // Convert blob to base64 for email transmission
                  const reader = new FileReader();
                  const pdfBase64Promise = new Promise<string>((resolve, reject) => {
                    reader.onloadend = () => {
                      const base64String = (reader.result as string).split(',')[1];
                      resolve(base64String);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                  });

                  const pdfBase64 = await pdfBase64Promise;

                  const emailResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-invoice-email`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      customerEmail: customerData.email,
                      customerName: customerData.name,
                      invoiceNumber: invoiceData.invoiceNumber,
                      pdfBuffer: pdfBase64
                    })
                  });

                  // Email sent or failed silently - don't block success flow
                } catch (emailError) {
                  // Don't block success flow if email fails
                }
              } catch (invoiceError) {
                alert('Invoice generation failed, but payment was successful. Please contact support for your invoice.');
                // Don't block success flow if invoice fails
              }

              // Hide verification loading and show success
              setShowVerificationLoading(false)
              setShowConfirmation(true)
            } else {
              // Verification failed
              setShowVerificationLoading(false)
              alert('Payment verification failed. Please contact support with your payment ID: ' + razorpayResponse.razorpay_payment_id)
            }
          } catch (error) {
            setShowVerificationLoading(false)
            alert('Failed to verify payment. Please contact support with your payment ID: ' + razorpayResponse.razorpay_payment_id)
          } finally {
            setLoading(false)
          }
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
          ondismiss: async function() {
            // Handle payment cancellation/failure
            try {
              // Notify backend about payment failure
              await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment-failed`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  order_id: orderData.order_id,
                  razorpay_order_id: orderData.razorpay_order.id,
                  reason: 'Payment cancelled by user'
                })
              })
            } catch (error) {
              // Silent failure - payment was cancelled anyway
            }

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
                        {/* Show MRP and discount for Storm and Nest */}
                        {(item.name.toLowerCase().includes('storm') || item.name.toLowerCase().includes('nest')) && (
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500 line-through">
                              ₹{item.name.toLowerCase().includes('storm') ? '24,999' : '11,999'}
                            </div>
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                              {item.name.toLowerCase().includes('storm') ?
                                Math.round(((24999 - item.price) / 24999) * 100) :
                                Math.round(((11999 - item.price) / 11999) * 100)}% OFF
                            </div>
                          </div>
                        )}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      validationErrors.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      validationErrors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Enter your email"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      validationErrors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                      validationErrors.line1
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-green-500'
                    }`}
                    placeholder="Street address"
                  />
                  {validationErrors.line1 && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.line1}</p>
                  )}
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
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        validationErrors.city
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                      placeholder="City"
                    />
                    {validationErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.state}
                      onChange={(e) => handleInputChange('state', e.target.value, true)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        validationErrors.state
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                      placeholder="State"
                    />
                    {validationErrors.state && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={customerData.address.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value, true)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                        validationErrors.zipCode
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                      placeholder="ZIP"
                    />
                    {validationErrors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.zipCode}</p>
                    )}
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
                        className="px-4 py-2 bg-brand-pastel-green hover:bg-green-800 text-brand-grey-green hover:text-white font-semibold rounded-lg transition-colors"
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
                {/* Show MRP total for comparison */}
                {cartItems.some(item => item.quantity > 0 && (item.name.toLowerCase().includes('storm') || item.name.toLowerCase().includes('nest'))) && (
                  <div className="flex justify-between text-gray-500">
                    <span>MRP Total</span>
                    <span className="line-through">
                      ₹{cartItems.reduce((sum, item) => {
                        if (item.quantity > 0) {
                          const mrp = item.name.toLowerCase().includes('storm') ? 24999 :
                                     item.name.toLowerCase().includes('nest') ? 11999 : item.price;
                          return sum + (mrp * item.quantity);
                        }
                        return sum;
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartItems.filter(item => item.quantity > 0).length} item{cartItems.filter(item => item.quantity > 0).length !== 1 ? 's' : ''})</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>

                {/* Show product discount savings */}
                {cartItems.some(item => item.quantity > 0 && (item.name.toLowerCase().includes('storm') || item.name.toLowerCase().includes('nest'))) && (
                  <div className="flex justify-between text-green-600">
                    <span>Product Savings</span>
                    <span>
                      -₹{cartItems.reduce((sum, item) => {
                        if (item.quantity > 0 && (item.name.toLowerCase().includes('storm') || item.name.toLowerCase().includes('nest'))) {
                          const mrp = item.name.toLowerCase().includes('storm') ? 24999 : 11999;
                          return sum + ((mrp - item.price) * item.quantity);
                        }
                        return sum;
                      }, 0).toLocaleString()}
                    </span>
                  </div>
                )}

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
                disabled={loading}
                className="w-full bg-brand-pastel-green hover:bg-green-800 text-brand-grey-green hover:text-white disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors text-base sm:text-lg touch-manipulation"
              >
                {loading ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
              </button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Razorpay Secure Payment</p>
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

      {/* Verification & Invoice Loading Popup */}
      <AnimatePresence>
        {showVerificationLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{
              zIndex: 99999,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              style={{ position: 'relative', zIndex: 100000 }}
            >
            {/* Animated Spinner */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
              {/* Inner pulsing circle */}
              <div className="absolute inset-3 bg-green-100 rounded-full animate-pulse"></div>
            </div>

            {/* Status Messages */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-gray-900">
                {verificationStage === 'verifying' && 'Verifying Payment...'}
                {verificationStage === 'generating' && 'Generating Invoice...'}
                {verificationStage === 'downloading' && 'Downloading Invoice...'}
                {verificationStage === 'emailing' && 'Sending Email...'}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed">
                {verificationStage === 'verifying' && 'Please wait while we verify your payment with the bank. This usually takes a few seconds.'}
                {verificationStage === 'generating' && 'We are generating your invoice with all order details.'}
                {verificationStage === 'downloading' && 'Your invoice is being prepared for download. Please do not close this window.'}
                {verificationStage === 'emailing' && 'Sending invoice to your email address.'}
              </p>

              {/* Progress indicator */}
              <div className="pt-4">
                <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${verificationStage === 'verifying' ? 'bg-green-600 animate-pulse' : 'bg-green-600'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${verificationStage === 'generating' ? 'bg-green-600 animate-pulse' : verificationStage === 'verifying' ? 'bg-gray-300' : 'bg-green-600'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${verificationStage === 'downloading' ? 'bg-green-600 animate-pulse' : ['verifying', 'generating'].includes(verificationStage) ? 'bg-gray-300' : 'bg-green-600'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${verificationStage === 'emailing' ? 'bg-green-600 animate-pulse' : verificationStage !== 'emailing' ? 'bg-gray-300' : 'bg-green-600'}`}></div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please do not close or refresh this page
                </p>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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