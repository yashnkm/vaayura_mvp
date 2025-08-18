import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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

interface ProductDetailHeroProps {
  product: Product;
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="py-32 bg-slate-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square w-full max-w-lg mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-white shadow-sm">
              <img
                src={product.images[selectedImage] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                }}
              />
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 justify-center lg:justify-start">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-brand-pastel-green' 
                        : 'border-slate-200 hover:border-brand-pastel-green/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            
            {/* Product Title & Badge */}
            <div className="space-y-4">
              <Badge variant="outline" className="bg-white border-brand-pastel-green text-brand-grey-green">
                Air Purifier
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-brand-dark-grey font-body leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-slate-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-brand-grey-green">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                <span className="text-brand-dark-grey font-body">
                  inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-grey-green font-subheading">
                Key Benefits
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-pastel-green"></div>
                  <span className="text-brand-dark-grey font-body">99.97% filtration efficiency</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-pastel-green"></div>
                  <span className="text-brand-dark-grey font-body">Intelligent auto-adjustment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-pastel-green"></div>
                  <span className="text-brand-dark-grey font-body">Near-silent operation</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-pastel-green"></div>
                  <span className="text-brand-dark-grey font-body">Smart app connectivity</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="flex-1 bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-brand-grey-green px-8 py-4 text-lg font-medium"
                >
                  Buy Now - ₹{product.price?.toLocaleString('en-IN')}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="flex-1 border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-8 py-4 text-lg font-medium"
                >
                  Request Demo
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-brand-dark-grey font-body">
                  Free delivery • 2-year warranty • 30-day return policy
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}