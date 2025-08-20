import { usePublishedProducts } from '@/hooks/useProducts'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'

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

export function ProductCatalog() {
  const { products, loading, error } = usePublishedProducts()
  const navigate = useNavigate()

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
              Discover our premium air purification solutions designed for every space and need.
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
          {products
            .sort((a, b) => {
              // Priority order: Storm first, then Nest, then others alphabetically
              const aIsStorm = a.name.toLowerCase().includes('storm');
              const bIsStorm = b.name.toLowerCase().includes('storm');
              const aIsNest = a.name.toLowerCase().includes('nest');
              const bIsNest = b.name.toLowerCase().includes('nest');
              
              if (aIsStorm && bIsStorm) return 0; // Both Storm, keep original order
              if (aIsStorm) return -1; // a is Storm, put it first
              if (bIsStorm) return 1;  // b is Storm, put it first
              
              if (aIsNest && bIsNest) return 0; // Both Nest, keep original order
              if (aIsNest) return -1; // a is Nest, put it first (after Storm)
              if (bIsNest) return 1;  // b is Nest, put it first (after Storm)
              
              return a.name.localeCompare(b.name); // Alphabetical for others
            })
            .map((product) => (
            <div key={product.id} className="flex flex-col items-center text-center space-y-6">
              {/* Product Image */}
              <div className="w-full max-w-md aspect-square">
                <img
                  src={product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                  }}
                />
              </div>
              
              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-normal text-black font-body">{product.name.startsWith('Vaayura') ? product.name : `Vaayura ${product.name}`}</h3>
                <p className="text-gray-600 font-body leading-relaxed max-w-md mx-auto">
                  {product.description}
                </p>
                
                {/* CTA Buttons */}
                <div className="space-y-3">
                  {/* Shop Now and Bulk Order side by side */}
                  <div className="flex gap-3">
                    <Button 
                      className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex-1"
                      onClick={() => navigate(`/products/${product.slug || product.id}`)}
                    >
                      Shop Now
                    </Button>
                    <Button 
                      className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex-1"
                    >
                      Bulk Order
                    </Button>
                  </div>
                  {/* Request Demo below */}
                  <Button 
                    className="bg-transparent border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
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