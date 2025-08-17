import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

// Local Product type
interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: Record<string, any>
  published: boolean
  created_at: string
}

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
}

export function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    images: product?.images || [],
    features: product?.features || {},
    published: product?.published || false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { createProduct, updateProduct } = useProducts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (product) {
        // Update existing product
        result = await updateProduct(product.id, formData)
      } else {
        // Create new product
        result = await createProduct(formData)
      }

      if (result.error) {
        setError(result.error)
      } else {
        onClose()
      }
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }

  const handleImageUrlAdd = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }))
    }
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleFeatureAdd = () => {
    const key = prompt('Feature name:')
    const value = prompt('Feature value:')
    if (key && value) {
      setFormData(prev => ({
        ...prev,
        features: { ...prev.features, [key]: value }
      }))
    }
  }

  const handleFeatureRemove = (key: string) => {
    setFormData(prev => ({
      ...prev,
      features: Object.fromEntries(
        Object.entries(prev.features).filter(([k]) => k !== key)
      )
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border-slate-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-brand-grey-green">
                {product ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
              <Button variant="outline" onClick={onClose} className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Storm"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Product description..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-pastel-green focus:border-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                    placeholder="e.g., 25000"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Product Images</Label>
                  <Button type="button" variant="outline" onClick={handleImageUrlAdd} className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10">
                    Add Image URL
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="space-y-2">
                    {formData.images.map((url, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input value={url} readOnly className="flex-1" />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleImageRemove(index)}
                          className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Product Features</Label>
                  <Button type="button" variant="outline" onClick={handleFeatureAdd} className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10">
                    Add Feature
                  </Button>
                </div>
                {Object.entries(formData.features).length > 0 && (
                  <div className="space-y-2">
                    {Object.entries(formData.features).map(([key, value]) => (
                      <div key={key} className="flex gap-2 items-center">
                        <span className="w-1/3 text-sm font-medium">{key}:</span>
                        <span className="flex-1">{value}</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleFeatureRemove(key)}
                          className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Published */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, published: !!checked }))
                  }
                />
                <Label htmlFor="published">Published (visible on website)</Label>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="brand-primary"
                  size="brand-default"
                  disabled={loading}
                  className="flex-1 bg-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/90"
                >
                  {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}