import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'

// Define types locally to avoid import issues
interface ProductFeature {
  title: string
  description: string
  icon: string
}

interface ProductSpecifications {
  [key: string]: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  features: ProductFeature[]
  specifications: ProductSpecifications
  published: boolean
  slug: string
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
    features: product?.features || [],
    specifications: product?.specifications || {},
    slug: product?.slug || '',
    published: product?.published || false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { createProduct, updateProduct } = useProducts()

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }))
  }

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
    const title = prompt('Feature title:')
    const description = prompt('Feature description:')
    const icon = prompt('Icon name (e.g., shield, zap, leaf):') || 'shield'
    
    if (title && description) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, { title, description, icon }]
      }))
    }
  }

  const handleFeatureRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSpecificationAdd = () => {
    const key = prompt('Specification name:')
    const value = prompt('Specification value:')
    if (key && value) {
      setFormData(prev => ({
        ...prev,
        specifications: { ...prev.specifications, [key]: value }
      }))
    }
  }

  const handleSpecificationRemove = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-brand-grey-green">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g., Storm Air Purifier"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="e.g., storm-air-purifier"
                      required
                    />
                  </div>
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
                  <h3 className="text-lg font-semibold text-brand-grey-green">Product Images</h3>
                  <Button type="button" variant="outline" onClick={handleImageUrlAdd} className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10">
                    Add Image URL
                  </Button>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  <h3 className="text-lg font-semibold text-brand-grey-green">Product Features</h3>
                  <Button type="button" variant="outline" onClick={handleFeatureAdd} className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10">
                    Add Feature
                  </Button>
                </div>
                {formData.features.length > 0 && (
                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-slate-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-brand-grey-green">{feature.title}</h4>
                            <p className="text-brand-dark-grey text-sm mt-1">{feature.description}</p>
                            <p className="text-brand-dark-grey text-xs mt-1">Icon: {feature.icon}</p>
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFeatureRemove(index)}
                            className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-brand-grey-green">Specifications</h3>
                  <Button type="button" variant="outline" onClick={handleSpecificationAdd} className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10">
                    Add Specification
                  </Button>
                </div>
                {Object.entries(formData.specifications).length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(formData.specifications).map(([key, value]) => (
                      <div key={key} className="flex gap-2 items-center">
                        <span className="w-1/3 text-sm font-medium text-brand-grey-green">{key}:</span>
                        <span className="flex-1 text-brand-dark-grey">{value}</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSpecificationRemove(key)}
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