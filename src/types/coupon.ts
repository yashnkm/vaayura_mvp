export interface Coupon {
  id: string
  code: string
  name: string
  description?: string
  discountType: 'fixed' | 'percentage'
  discountValue: number // Amount in rupees for fixed, percentage for percentage
  minOrderAmount?: number // Minimum order amount required
  maxDiscountAmount?: number // Maximum discount cap for percentage coupons
  isActive: boolean
  validFrom: string // ISO date string
  validUntil: string // ISO date string
  usageLimit?: number // Total usage limit
  usageCount: number // Current usage count
  createdAt: string
  updatedAt: string
}

export interface CouponValidationResult {
  isValid: boolean
  coupon?: Coupon
  discountAmount: number
  errorMessage?: string
}

export interface AppliedCoupon {
  coupon: Coupon
  discountAmount: number
}