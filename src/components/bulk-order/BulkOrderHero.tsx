import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Truck, Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function BulkOrderHero() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    quantity: '',
    product: '',
    requirements: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle bulk order submission
    console.log('Bulk order submitted:', formData)
    alert('Thank you for your bulk order inquiry. We will contact you within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
              Enterprise Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bulk Orders for
              <span className="text-green-600 block">Clean Air Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Partner with Vaayura for large-scale air purification projects. Get special pricing, 
              dedicated support, and customized solutions for your organization.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: Building2,
              title: "Corporate Pricing",
              description: "Special bulk discounts for quantities of 10+ units"
            },
            {
              icon: Users,
              title: "Dedicated Support",
              description: "Assigned account manager for your project"
            },
            {
              icon: Truck,
              title: "Free Installation",
              description: "Complimentary setup and training for bulk orders"
            },
            {
              icon: Shield,
              title: "Extended Warranty",
              description: "Enhanced warranty coverage for enterprise clients"
            }
          ].map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <benefit.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bulk Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get Bulk Quote</CardTitle>
                <p className="text-gray-600 text-center">
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Interest *
                      </label>
                      <select
                        required
                        value={formData.product}
                        onChange={(e) => handleInputChange('product', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select Product</option>
                        <option value="storm">Vaayura Storm</option>
                        <option value="nest">Vaayura Nest</option>
                        <option value="both">Both Products</option>
                        <option value="custom">Custom Solution</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Quantity *
                      </label>
                      <select
                        required
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select Quantity</option>
                        <option value="10-25">10-25 units</option>
                        <option value="25-50">25-50 units</option>
                        <option value="50-100">50-100 units</option>
                        <option value="100+">100+ units</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about your specific needs, installation requirements, timeline, etc."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  >
                    Request Bulk Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Client Testimonials & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Success Stories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Trusted by Leading Organizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-gray-600 mb-2">
                    "Vaayura's bulk solution helped us improve air quality across 50+ office locations. 
                    The dedicated support team made implementation seamless."
                  </p>
                  <p className="font-semibold text-sm">- Fortune 500 Technology Company</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-gray-600 mb-2">
                    "Excellent pricing for our hotel chain. The air purifiers enhanced guest 
                    experience significantly."
                  </p>
                  <p className="font-semibold text-sm">- International Hotel Group</p>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Pricing Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Bulk Pricing Tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { quantity: "10-24 units", discount: "10% OFF", color: "bg-green-100 text-green-800" },
                    { quantity: "25-49 units", discount: "15% OFF", color: "bg-blue-100 text-blue-800" },
                    { quantity: "50-99 units", discount: "20% OFF", color: "bg-purple-100 text-purple-800" },
                    { quantity: "100+ units", discount: "25% OFF", color: "bg-orange-100 text-orange-800" }
                  ].map((tier, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                      <span className="font-medium">{tier.quantity}</span>
                      <Badge className={tier.color}>
                        {tier.discount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Need Immediate Assistance?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Enterprise Sales:</strong> +91 98765 43210
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> enterprise@vaayura.com
                  </p>
                  <p className="text-gray-600">
                    <strong>Business Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}