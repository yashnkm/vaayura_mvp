import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon } from "lucide-react";
import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    navigate('/checkout', {
      state: {
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: imageSrc
        }
      }
    });
  }, [navigate, product, imageSrc]);


  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Visual - Clean Product Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-contain rounded-2xl"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  aspectRatio: '1/1'
                }}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora text-brand-grey-green leading-tight">
                {product.name.startsWith('Vaayura') ? product.name : `Vaayura ${product.name}`}
              </h1>
              
              {/* Replace text description with feature cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">CADR</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {product.name.toLowerCase().includes('storm') ? '600 m³/hr' : 
                     product.name.toLowerCase().includes('nest') ? '450 m³/hr' : '190 m³/hr'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Coverage</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {product.name.toLowerCase().includes('storm') ? '1000 sq ft' : 
                     product.name.toLowerCase().includes('nest') ? '600 sq ft' : '400 sq ft'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Fan Speeds</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Adjustable</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Sleep Timer</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Available</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Filter Alert</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Smart</div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="pt-4">
              <div className="text-4xl font-bold text-brand-grey-green mb-6">
                ₹{formattedPrice}
              </div>
              <p className="text-brand-dark-grey font-montserrat mb-8">
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
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ProductDetailHeroComponent.displayName = 'ProductDetailHero';

export { ProductDetailHeroComponent as ProductDetailHero };