import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import product images from assets
import stormFrontView from "@/assets/sections/products/product-images/stormfrontview.png";
import stormSideView from "@/assets/sections/products/product-images/stormsideview.png";
import leftSideViewStorm from "@/assets/sections/products/product-images/leftsideviewstorm.png";
import nestFrontView from "@/assets/sections/products/product-images/nestfrontview.png";
import nestSideView from "@/assets/sections/products/product-images/nestsideview.png";
import leftSideViewNest from "@/assets/sections/products/product-images/leftsidenest.png";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define product images based on product name
  const productImages = useMemo(() => {
    const productName = product.name.toLowerCase();
    if (productName.includes('storm') || productName.includes('strom')) {
      return [
        stormFrontView,
        stormSideView,
        leftSideViewStorm
      ];
    } else if (productName.includes('nest')) {
      return [
        nestFrontView,
        nestSideView,
        leftSideViewNest
      ];
    }
    // Fallback to original images array if available
    return product.images?.length ? product.images : [stormFrontView, stormSideView, leftSideViewStorm];
  }, [product.name, product.images]);

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

  // Memoize current image src and error handler
  const currentImageSrc = useMemo(() => 
    productImages[currentImageIndex] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    [productImages, currentImageIndex]
  );

  // Check if current image is a front view (should be larger)
  const isStormFrontView = useMemo(() => {
    const currentImage = productImages[currentImageIndex];
    return currentImage === stormFrontView;
  }, [productImages, currentImageIndex]);

  const isNestFrontView = useMemo(() => {
    const currentImage = productImages[currentImageIndex];
    return currentImage === nestFrontView;
  }, [productImages, currentImageIndex]);

  // Check if current image is a left side view (should also be zoomed)
  const isLeftSideViewStorm = useMemo(() => {
    const currentImage = productImages[currentImageIndex];
    return currentImage === leftSideViewStorm;
  }, [productImages, currentImageIndex]);

  const isLeftSideViewNest = useMemo(() => {
    const currentImage = productImages[currentImageIndex];
    return currentImage === leftSideViewNest;
  }, [productImages, currentImageIndex]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";
  }, []);

  // Image navigation handlers
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  }, [productImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  }, [productImages.length]);

  const handleBuyNow = useCallback(() => {
    navigate('/checkout', {
      state: {
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: currentImageSrc
        }
      }
    });
  }, [navigate, product, currentImageSrc]);


  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto max-w-7xl">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Visual - Product Image with Navigation */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative transition-all duration-300 ease-in-out overflow-hidden w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[750px] lg:h-[750px] p-4">
              <img
                src={currentImageSrc}
                alt={`${product.name} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  transform: isStormFrontView ? 'scale(1.4) translateY(-5%)' : 
                           isNestFrontView ? 'scale(1.4) translateY(-2%)' :
                           isLeftSideViewStorm ? 'scale(1.3) translateY(-3%)' :
                           isLeftSideViewNest ? 'scale(1.0) translateY(-3%)' : 'scale(1)'
                }}
                loading="lazy"
                decoding="async"
                onError={handleImageError}
              />
              
              {/* Navigation arrows - only show if multiple images */}
              {productImages.length > 1 && (
                <>
                  {/* Left arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-105 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  {/* Right arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200 hover:scale-105 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-green-800 scale-125' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sora text-brand-grey-green leading-tight">
                {product.name.startsWith('Vaayura') ? product.name : 
                 product.name.toLowerCase() === 'strom' ? 'Vaayura Storm' : 
                 `Vaayura ${product.name}`}
              </h1>
              
              {/* Replace text description with feature cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">CADR</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '450 m³/hr' : 
                     product.name.toLowerCase().includes('nest') ? '190 m³/hr' : '190 m³/hr'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Coverage</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '600 sq ft' : 
                     product.name.toLowerCase().includes('nest') ? '400 sq ft' : '400 sq ft'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Dimensions</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '254×254×447 mm' : 
                     product.name.toLowerCase().includes('nest') ? '210×213×317 mm' : 'Compact'}
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