import { usePublishedProducts } from '@/hooks/useProducts'
import { Button } from "@/components/ui/button"

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

export function ProductCatalog() {
  const { products, loading, error } = usePublishedProducts()

  if (loading) {
    return (
      <section className="py-32 bg-white">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-brand-dark-grey font-body">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-32 bg-white">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-red-600 font-body">Error loading products: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-32 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-12 px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
              Our <span className="text-brand-pastel-green">Products</span>
            </h2>
            <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
            <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto">
              We're putting the finishing touches on our premium air purification solutions. 
              Stay tuned for products that will transform your indoor environment.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        {/* Section Header - matching homepage pattern */}
        <div className="text-center space-y-4 mb-12 px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
            Our <span className="text-brand-pastel-green">Products</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-brand-dark-grey font-body max-w-2xl mx-auto">
            Discover our premium air purification solutions designed for every space and need.
          </p>
        </div>

        {/* Products Grid - 2 columns, scales vertically */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center text-center space-y-6">
              {/* Product Image */}
              <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-normal text-black font-body">{product.name}</h3>
                <p className="text-gray-600 font-body leading-relaxed max-w-md mx-auto">
                  {product.description}
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-brand-grey-green px-8 py-3 rounded-full font-medium"
                  >
                    Shop {product.name}
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-8 py-3 rounded-full font-medium"
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}