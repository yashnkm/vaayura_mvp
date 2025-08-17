import { useProducts } from '@/hooks/useProducts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

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
          
          {(product.images.length > 0 || Object.keys(product.features).length > 0) && (
            <CardContent>
              {/* Images */}
              {product.images.length > 0 && (
                <div className="mb-4">
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
              {Object.keys(product.features).length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-brand-grey-green mb-2">
                    Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.features).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 p-2 rounded">
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                  {Object.keys(product.features).length > 4 && (
                    <p className="text-xs text-brand-dark-grey mt-2">
                      +{Object.keys(product.features).length - 4} more features
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}