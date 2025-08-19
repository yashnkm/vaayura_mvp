import { useProducts } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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

interface ProductListProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
}

export function ProductList({ products, loading, onEdit }: ProductListProps) {
  const { deleteProduct } = useProducts()

  const handleDelete = async (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      await deleteProduct(product.id)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-brand-dark-grey font-body">Loading products...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Card className="bg-white border-slate-200">
        <CardContent className="text-center py-8">
          <p className="text-brand-dark-grey font-body mb-4">
            No products yet. Add your first product to get started!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="bg-white border-slate-200">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-brand-grey-green">
                    {product.name}
                  </CardTitle>
                  <Badge variant={product.published ? "default" : "secondary"}>
                    {product.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-brand-dark-grey font-body text-sm">
                  {product.description || 'No description'}
                </p>
                <p className="text-brand-grey-green font-semibold mt-2">
                  ₹{product.price?.toLocaleString('en-IN') || 'Price not set'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="bg-white border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product)}
                  className="bg-white border-red-300 text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {(product.images.length > 0 || product.features.length > 0 || Object.keys(product.specifications).length > 0) && (
            <CardContent>
              <div className="space-y-4">
                {/* Slug */}
                {product.slug && (
                  <div>
                    <h4 className="text-sm font-semibold text-brand-grey-green mb-1">URL Slug</h4>
                    <p className="text-xs text-brand-dark-grey">/products/{product.slug}</p>
                  </div>
                )}

                {/* Images */}
                {product.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-brand-grey-green mb-2">
                      Images ({product.images.length})
                    </h4>
                    <div className="flex gap-2 overflow-x-auto">
                      {product.images.slice(0, 3).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = 'https://via.placeholder.com/64x64?text=No+Image'
                          }}
                        />
                      ))}
                      {product.images.length > 3 && (
                        <div className="w-16 h-16 bg-slate-100 rounded border flex items-center justify-center text-xs text-brand-dark-grey">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-brand-grey-green mb-2">
                      Features ({product.features.length})
                    </h4>
                    <div className="space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="bg-slate-50 p-2 rounded text-xs">
                          <span className="font-medium">{feature.title}</span>
                          <p className="text-brand-dark-grey mt-1">{feature.description}</p>
                        </div>
                      ))}
                      {product.features.length > 3 && (
                        <p className="text-xs text-brand-dark-grey">
                          +{product.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-brand-grey-green mb-2">
                      Specifications ({Object.keys(product.specifications).length})
                    </h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="bg-slate-50 p-2 rounded">
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                    {Object.keys(product.specifications).length > 4 && (
                      <p className="text-xs text-brand-dark-grey mt-2">
                        +{Object.keys(product.specifications).length - 4} more specs
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}