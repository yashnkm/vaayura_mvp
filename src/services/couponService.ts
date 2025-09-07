import { Coupon, CouponValidationResult } from '@/types/coupon'

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-backend-url.vercel.app'  // Replace with actual Vercel URL
  : 'http://localhost:3000'

class CouponService {
  // Get all coupons
  async getAllCoupons(): Promise<Coupon[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/coupons`)
      const result = await response.json()
      
      if (!result.success) {
        console.error('Failed to fetch coupons:', result.message)
        return []
      }
      
      return result.data || []
    } catch (error) {
      console.error('Error loading coupons:', error)
      return []
    }
  }

  // Create new coupon
  async createCoupon(couponData: Omit<Coupon, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>): Promise<Coupon | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData)
      })
      
      const result = await response.json()
      
      if (!result.success) {
        console.error('Failed to create coupon:', result.message)
        return null
      }
      
      return result.data
    } catch (error) {
      console.error('Error creating coupon:', error)
      return null
    }
  }

  // Update coupon
  async updateCoupon(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/coupons?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })
      
      const result = await response.json()
      
      if (!result.success) {
        console.error('Failed to update coupon:', result.message)
        return null
      }
      
      return result.data
    } catch (error) {
      console.error('Error updating coupon:', error)
      return null
    }
  }

  // Delete coupon
  async deleteCoupon(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/coupons?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      return result.success
    } catch (error) {
      console.error('Error deleting coupon:', error)
      return false
    }
  }

  // Validate coupon code
  async validateCoupon(code: string, orderAmount: number): Promise<CouponValidationResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/validate-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          couponCode: code,
          orderAmount: orderAmount
        })
      })
      
      const result = await response.json()
      
      if (!result.success) {
        return {
          isValid: false,
          discountAmount: 0,
          errorMessage: result.message || 'Invalid coupon code'
        }
      }
      
      return {
        isValid: true,
        coupon: result.data.coupon,
        discountAmount: result.data.discountAmount
      }
    } catch (error) {
      console.error('Error validating coupon:', error)
      return {
        isValid: false,
        discountAmount: 0,
        errorMessage: 'Failed to validate coupon'
      }
    }
  }

  // Apply coupon (this is now handled automatically in validateCoupon)
  async applyCoupon(couponId: string): Promise<boolean> {
    // Note: Usage count is now incremented automatically in the validate-coupon API
    // This method is kept for compatibility but doesn't need to do anything
    return true
  }

  // Get active coupons only
  async getActiveCoupons(): Promise<Coupon[]> {
    try {
      const allCoupons = await this.getAllCoupons()
      const now = new Date()
      
      return allCoupons.filter(coupon => 
        coupon.isActive && 
        new Date(coupon.validFrom) <= now && 
        new Date(coupon.validUntil) >= now &&
        (!coupon.usageLimit || coupon.usageCount < coupon.usageLimit)
      )
    } catch (error) {
      console.error('Error getting active coupons:', error)
      return []
    }
  }
}

export const couponService = new CouponService()