import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon } from "lucide-react";
import { useState, memo, useMemo, useCallback } from "react";

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

const ProductDetailHeroComponent = memo(({ product }: ProductDetailHeroProps) => {
  // Memoize formatted price to avoid recalculation
  const formattedPrice = useMemo(() => 
    product.price?.toLocaleString('en-IN') || '25,000', 
    [product.price]
  );

  // Memoize description to avoid repeated fallback evaluation
  const description = useMemo(() => 
    product.description || "Experience cleaner, healthier air with advanced filtration technology designed for your well-being and peace of mind.",
    [product.description]
  );

  // Memoize image src and error handler
  const imageSrc = useMemo(() => 
    product.images[0] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    [product.images]
  );

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  }, []);

  const handleBuyNow = useCallback(() => {
    // Add buy now logic here
    console.log('Buy now clicked');
  }, []);

  const handleRequestDemo = useCallback(() => {
    // Add demo request logic here
    console.log('Request demo clicked');
  }, []);

  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-brand-grey-green leading-tight">
                {product.name.startsWith('Vaayura') ? product.name : `Vaayura ${product.name}`}
              </h1>
              
              <p className="text-lg md:text-xl text-brand-dark-grey font-body leading-relaxed max-w-lg">
                {description}
              </p>
            </div>

            {/* Price */}
            <div className="pt-4">
              <div className="text-4xl font-bold text-brand-grey-green mb-6">
                ₹{formattedPrice}
              </div>
              <p className="text-brand-dark-grey font-body mb-8">
                inclusive of all taxes
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105"
                onClick={handleRequestDemo}
              >
                Request Demo
              </Button>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-200 hover:scale-105"
              >
                Bulk Order
              </Button>
            </div>
          </div>

          {/* Right Visual - Clean Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[500px] h-[500px] lg:w-[650px] lg:h-[650px]">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
                decoding="async"
                onError={handleImageError}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ProductDetailHeroComponent.displayName = 'ProductDetailHero';

export { ProductDetailHeroComponent as ProductDetailHero };