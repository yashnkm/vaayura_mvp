import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import { couponService } from '@/services/couponService'
import { Coupon } from '@/types/coupon'

interface CouponFormProps {
  coupon?: Coupon | null
  onClose: () => void
}

export function CouponForm({ coupon, onClose }: CouponFormProps) {
  const isEditing = !!coupon
  
  const [formData, setFormData] = useState({
    code: coupon?.code || '',
    name: coupon?.name || '',
    description: coupon?.description || '',
    discountType: coupon?.discountType || 'percentage' as 'fixed' | 'percentage',
    discountValue: coupon?.discountValue || 0,
    minOrderAmount: coupon?.minOrderAmount || '',
    maxDiscountAmount: coupon?.maxDiscountAmount || '',
    validFrom: coupon?.validFrom ? coupon.validFrom.split('T')[0] : new Date().toISOString().split('T')[0],
    validUntil: coupon?.validUntil ? coupon.validUntil.split('T')[0] : '',
    usageLimit: coupon?.usageLimit || '',
    isActive: coupon?.isActive ?? true
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.code.trim()) {
      newErrors.code = 'Coupon code is required'
    } else if (formData.code.length < 3) {
      newErrors.code = 'Coupon code must be at least 3 characters'
    } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code = 'Coupon code must contain only uppercase letters and numbers'
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Coupon name is required'
    }

    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = 'Discount value must be greater than 0'
    }

    if (formData.discountType === 'percentage' && formData.discountValue > 100) {
      newErrors.discountValue = 'Percentage discount cannot exceed 100%'
    }

    if (!formData.validUntil) {
      newErrors.validUntil = 'Valid until date is required'
    } else if (new Date(formData.validUntil) <= new Date(formData.validFrom)) {
      newErrors.validUntil = 'Valid until date must be after valid from date'
    }

    if (formData.minOrderAmount && Number(formData.minOrderAmount) < 0) {
      newErrors.minOrderAmount = 'Minimum order amount cannot be negative'
    }

    if (formData.maxDiscountAmount && Number(formData.maxDiscountAmount) < 0) {
      newErrors.maxDiscountAmount = 'Maximum discount amount cannot be negative'
    }

    if (formData.usageLimit && Number(formData.usageLimit) < 1) {
      newErrors.usageLimit = 'Usage limit must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSaving(true)

    try {
      const couponData = {
        code: formData.code.trim().toUpperCase(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : undefined,
        maxDiscountAmount: formData.maxDiscountAmount ? Number(formData.maxDiscountAmount) : undefined,
        validFrom: new Date(formData.validFrom).toISOString(),
        validUntil: new Date(formData.validUntil + 'T23:59:59').toISOString(),
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
        isActive: formData.isActive
      }

      if (isEditing) {
        await couponService.updateCoupon(coupon.id, couponData)
      } else {
        // Check if code already exists
        const existingCoupons = await couponService.getAllCoupons()
        const existing = existingCoupons.find(c => c.code === couponData.code)
        if (existing) {
          setErrors({ code: 'This coupon code already exists' })
          setSaving(false)
          return
        }
        
        await couponService.createCoupon(couponData)
      }

      onClose()
    } catch (error) {
      console.error('Error saving coupon:', error)
      alert('Failed to save coupon. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Coupons
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-brand-grey-green">
                {isEditing ? 'Edit Coupon' : 'Create New Coupon'}
              </h1>
              <p className="text-brand-dark-grey font-body">
                {isEditing ? 'Update coupon details' : 'Create a new discount coupon'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Coupon Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                    placeholder="e.g., WELCOME10"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent font-mono ${
                      errors.code ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Coupon Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Welcome Discount"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-grey-green mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Optional description for the coupon"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent"
                />
              </div>

              {/* Discount Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Discount Type *
                  </label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => handleInputChange('discountType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Discount Value *
                  </label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => handleInputChange('discountValue', Number(e.target.value))}
                    placeholder={formData.discountType === 'percentage' ? '10' : '500'}
                    min="0"
                    step={formData.discountType === 'percentage' ? '0.1' : '1'}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                      errors.discountValue ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.discountValue && <p className="text-red-500 text-sm mt-1">{errors.discountValue}</p>}
                </div>

                {formData.discountType === 'percentage' && (
                  <div>
                    <label className="block text-sm font-medium text-brand-grey-green mb-2">
                      Max Discount (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.maxDiscountAmount}
                      onChange={(e) => handleInputChange('maxDiscountAmount', e.target.value)}
                      placeholder="e.g., 2000"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                        errors.maxDiscountAmount ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.maxDiscountAmount && <p className="text-red-500 text-sm mt-1">{errors.maxDiscountAmount}</p>}
                  </div>
                )}
              </div>

              {/* Validity and Limits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Valid From *
                  </label>
                  <input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => handleInputChange('validFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Valid Until *
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => handleInputChange('validUntil', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                      errors.validUntil ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.validUntil && <p className="text-red-500 text-sm mt-1">{errors.validUntil}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-grey-green mb-2">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => handleInputChange('usageLimit', e.target.value)}
                    placeholder="Unlimited"
                    min="1"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                      errors.usageLimit ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.usageLimit && <p className="text-red-500 text-sm mt-1">{errors.usageLimit}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-grey-green mb-2">
                  Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => handleInputChange('minOrderAmount', e.target.value)}
                  placeholder="No minimum"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent ${
                    errors.minOrderAmount ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.minOrderAmount && <p className="text-red-500 text-sm mt-1">{errors.minOrderAmount}</p>}
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-brand-pastel-green focus:ring-brand-pastel-green border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-brand-grey-green">
                  Activate this coupon immediately
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : isEditing ? 'Update Coupon' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}