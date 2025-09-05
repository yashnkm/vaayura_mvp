import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Header1 } from '@/components/ui/header'
import { Footer } from '@/components/shared/Footer'
import { CheckCircle, Package, Clock, MessageSquare, User, Mail, Phone, Building, Plus, Minus } from 'lucide-react'

interface BulkOrderForm {
  name: string
  email: string
  phone: string
  company: string
  product: string
  quantity: number
  fulfillmentTime: string
  notes: string
}

export function BulkOrderPage() {
  const [formData, setFormData] = useState<BulkOrderForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: 1,
    fulfillmentTime: '',
    notes: ''
  })
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success popup
      setShowSuccessPopup(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        product: '',
        quantity: 1,
        fulfillmentTime: '',
        notes: ''
      })
      
      // Hide popup after 5 seconds
      setTimeout(() => setShowSuccessPopup(false), 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header1 />
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-brand-grey-green mb-2">
                Request Sent Successfully!
              </h3>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Your bulk order request has been sent to our team. We'll review your requirements and get back to you shortly with a customized quote.
              </p>
              <Button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-full font-heading"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative bg-white pt-32 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4 text-brand-grey-green"
          >
            Bulk Orders Made <span className="text-brand-pastel-green">Simple</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 font-subheading max-w-2xl mx-auto leading-relaxed"
          >
            Need air purifiers for your office, hotel, or large facility? Get customized pricing and priority support with our bulk order program.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Form - Takes up 2/3 of the width */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                className="rounded-3xl"
                style={{ overflow: "hidden" }}
              >
                <Card className="bg-white border-0 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm"
                      style={{ 
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)" 
                      }}>
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-heading font-bold text-brand-grey-green mb-2">
                      Submit Your Bulk Order Request
                    </h2>
                    <p className="text-sm text-gray-600 font-body">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 mr-2 text-green-600" />
                        <h3 className="text-lg font-heading font-semibold text-brand-grey-green">
                          Contact Information
                        </h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 font-subheading text-sm font-medium">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="h-10 border-gray-300 focus:border-brand-pastel-green focus:ring-brand-pastel-green rounded-lg"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-700 font-subheading text-sm font-medium">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="h-10 border-gray-300 focus:border-brand-pastel-green focus:ring-brand-pastel-green rounded-lg"
                            placeholder="your.email@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700 font-subheading text-sm font-medium">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="h-10 border-gray-300 focus:border-brand-pastel-green focus:ring-brand-pastel-green rounded-lg"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-gray-700 font-subheading text-sm font-medium">
                            Company/Organization
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="h-10 border-gray-300 focus:border-brand-pastel-green focus:ring-brand-pastel-green rounded-lg"
                            placeholder="Enter company name"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Order Information */}
                    <div className="space-y-4">
                      <div className="flex items-center mb-3">
                        <Package className="w-5 h-5 mr-2 text-green-600" />
                        <h3 className="text-lg font-heading font-semibold text-brand-grey-green">
                          Order Details
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product" className="text-gray-700 font-subheading text-sm font-medium">
                          Product Selection *
                        </Label>
                        <select
                          id="product"
                          name="product"
                          required
                          value={formData.product}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pastel-green focus:border-brand-pastel-green bg-white"
                        >
                          <option value="">Select a product</option>
                          <option value="Vaayura Storm">Vaayura Storm (Large spaces - Living rooms, offices)</option>
                          <option value="Vaayura Nest">Vaayura Nest (Small-medium spaces - Bedrooms, personal offices)</option>
                          <option value="Mixed Order">Mixed Order (Both Storm & Nest models)</option>
                        </select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity" className="text-gray-700 font-subheading text-sm font-medium">
                            Quantity Required *
                          </Label>
                          <div className="relative flex items-center">
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                              className="absolute left-3 z-10 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              min="1"
                              required
                              value={formData.quantity}
                              onChange={handleInputChange}
                              className="h-10 border-gray-300 focus:border-brand-pastel-green focus:ring-brand-pastel-green rounded-lg text-center pl-12 pr-12 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                              placeholder="1"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                              className="absolute right-3 z-10 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Enter the quantity you need</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fulfillmentTime" className="text-gray-700 font-subheading text-sm font-medium">
                            Required Delivery Timeline
                          </Label>
                          <select
                            id="fulfillmentTime"
                            name="fulfillmentTime"
                            value={formData.fulfillmentTime}
                            onChange={handleInputChange}
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pastel-green focus:border-brand-pastel-green bg-white"
                          >
                            <option value="">Select timeline</option>
                            <option value="ASAP">ASAP (Rush Order - Additional charges may apply)</option>
                            <option value="1-2 weeks">1-2 weeks</option>
                            <option value="2-4 weeks">2-4 weeks</option>
                            <option value="1-2 months">1-2 months</option>
                            <option value="Flexible">Flexible timeline</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Additional Notes */}
                    <div className="space-y-3">
                      <div className="flex items-center mb-2">
                        <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                        <Label htmlFor="notes" className="text-lg font-heading font-semibold text-brand-grey-green">
                          Additional Notes or Requirements
                        </Label>
                      </div>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-pastel-green focus:border-brand-pastel-green resize-none text-sm"
                        placeholder="Include installation needs, special delivery instructions, room configurations, budget considerations, etc..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded-full font-heading font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-10"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                            Submitting Request...
                          </div>
                        ) : (
                          'Submit Bulk Order Request'
                        )}
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            </div>

            {/* Benefits Sidebar - Takes up 1/3 of the width */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                className="space-y-6 sticky top-8"
              >
                <motion.div
                  className="rounded-3xl"
                  style={{ overflow: "hidden" }}
                  whileHover={{ 
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <Card className="bg-white border-0 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100/30"
                        style={{ 
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                        }}>
                  <h3 className="text-2xl font-heading font-bold text-brand-grey-green mb-6">
                    Why Choose Bulk Orders?
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-brand-grey-green mb-2">Volume Discounts</h4>
                        <p className="text-gray-600 font-body text-sm leading-relaxed">Get competitive pricing with significant savings on orders of 5+ units.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-brand-grey-green mb-2">Priority Support</h4>
                        <p className="text-gray-600 font-body text-sm leading-relaxed">Dedicated account manager and faster delivery for bulk orders.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Building className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-semibold text-brand-grey-green mb-2">Custom Solutions</h4>
                        <p className="text-gray-600 font-body text-sm leading-relaxed">Tailored installations and maintenance packages for your organization.</p>
                      </div>
                    </div>
                  </div>
                </Card>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                  className="rounded-3xl"
                  style={{ overflow: "hidden" }}
                  whileHover={{ 
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/20"
                        style={{ 
                          boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.08), 0 3px 5px -2px rgba(0, 0, 0, 0.04)" 
                        }}>
                  <h4 className="text-lg font-heading font-semibold text-brand-grey-green mb-4">Need Help?</h4>
                  <p className="text-gray-600 font-body mb-4 text-sm leading-relaxed">
                    Have questions about bulk pricing or custom requirements? Our team is here to help.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="font-body text-sm">bulk@vaayura.com</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span className="font-body text-sm">+91-8766802724</span>
                    </div>
                  </div>
                </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}