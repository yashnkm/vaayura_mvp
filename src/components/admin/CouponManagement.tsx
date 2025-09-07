import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react'
import { couponService } from '@/services/couponService'
import { Coupon } from '@/types/coupon'
import { CouponForm } from './CouponForm'

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCoupons()
  }, [])

  const loadCoupons = async () => {
    setLoading(true)
    try {
      const allCoupons = await couponService.getAllCoupons()
      setCoupons(allCoupons)
    } catch (error) {
      console.error('Error loading coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCoupon = () => {
    setEditingCoupon(null)
    setShowForm(true)
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setShowForm(true)
  }

  const handleDeleteCoupon = async (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      try {
        await couponService.deleteCoupon(couponId)
        loadCoupons()
      } catch (error) {
        console.error('Error deleting coupon:', error)
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCoupon(null)
    loadCoupons()
  }

  const toggleCouponStatus = async (coupon: Coupon) => {
    try {
      await couponService.updateCoupon(coupon.id, { isActive: !coupon.isActive })
      loadCoupons()
    } catch (error) {
      console.error('Error updating coupon:', error)
    }
  }

  if (showForm) {
    return (
      <CouponForm
        coupon={editingCoupon}
        onClose={handleCloseForm}
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading text-brand-grey-green">
              Coupon Management
            </h1>
            <p className="text-brand-dark-grey font-body">
              Create and manage discount coupons
            </p>
          </div>
          <Button
            onClick={handleAddCoupon}
            className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Coupon
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Total Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-brand-grey-green">
                {loading ? '...' : coupons.length}
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Active Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {loading ? '...' : coupons.filter(c => c.isActive).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Total Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">
                {loading ? '...' : coupons.reduce((sum, c) => sum + c.usageCount, 0)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle className="text-brand-grey-green">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {loading ? '...' : coupons.filter(c => new Date(c.validUntil) < new Date()).length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coupons List */}
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <CardTitle className="text-brand-grey-green">All Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="text-brand-dark-grey">Loading coupons...</div>
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-brand-dark-grey mb-4">No coupons found</p>
                <Button onClick={handleAddCoupon} className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Coupon
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Code</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Discount</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Valid Until</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Usage</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-brand-grey-green">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">
                            {coupon.code}
                          </code>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-brand-grey-green">{coupon.name}</div>
                            {coupon.description && (
                              <div className="text-sm text-brand-dark-grey">{coupon.description}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {coupon.discountType === 'fixed' ? (
                              <span className="text-green-600 font-medium">₹{coupon.discountValue}</span>
                            ) : (
                              <span className="text-blue-600 font-medium">{coupon.discountValue}%</span>
                            )}
                            {coupon.maxDiscountAmount && coupon.discountType === 'percentage' && (
                              <div className="text-xs text-brand-dark-grey">
                                Max ₹{coupon.maxDiscountAmount}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {new Date(coupon.validUntil).toLocaleDateString()}
                            {new Date(coupon.validUntil) < new Date() && (
                              <span className="text-red-500 ml-2 text-xs">(Expired)</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            {coupon.usageCount}
                            {coupon.usageLimit && (
                              <span className="text-brand-dark-grey">/{coupon.usageLimit}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleCouponStatus(coupon)}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              coupon.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {coupon.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditCoupon(coupon)}
                              className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCoupon(coupon.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}