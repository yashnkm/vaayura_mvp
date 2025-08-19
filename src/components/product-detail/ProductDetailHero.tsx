import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon } from "lucide-react";
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
  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-brand-grey-green leading-tight">
                {product.name}
              </h1>
              
              <p className="text-lg md:text-xl text-brand-dark-grey font-body leading-relaxed max-w-lg">
                {product.description || "Experience cleaner, healthier air with advanced filtration technology designed for your well-being and peace of mind."}
              </p>
            </div>

            {/* Price */}
            <div className="pt-4">
              <div className="text-4xl font-bold text-brand-grey-green mb-6">
                ₹{product.price?.toLocaleString('en-IN') || '25,000'}
              </div>
              <p className="text-brand-dark-grey font-body mb-8">
                inclusive of all taxes
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-black hover:bg-black/90 text-white px-8 py-4 text-lg font-medium rounded-full"
              >
                Buy Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-medium rounded-full transition-colors"
              >
                Request Demo
              </Button>
            </div>
          </div>

          {/* Right Visual - Clean Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]">
              <img
                src={product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}