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
        stormSideView,
        stormFrontView,
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
    return product.images?.length ? product.images : [stormSideView, stormFrontView, leftSideViewStorm];
  }, [product.name, product.images]);

  // Pricing details - MRP is hardcoded, discount price from backend, percentage calculated
  const pricingDetails = useMemo(() => {
    const isStorm = product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom');
    const isNest = product.name.toLowerCase().includes('nest');

    if (isStorm) {
      const mrp = 24999;
      const discountPrice = product.price || 15999; // Price from backend (discounted price)
      const discountPercentage = Math.round(((mrp - discountPrice) / mrp) * 100);

      return {
        mrp: mrp,
        discountPrice: discountPrice,
        discountPercentage: discountPercentage,
        formattedMrp: mrp.toLocaleString('en-IN'),
        formattedDiscountPrice: discountPrice.toLocaleString('en-IN')
      };
    } else if (isNest) {
      const mrp = 11999;
      const discountPrice = product.price || 8000; // Price from backend (discounted price)
      const discountPercentage = Math.round(((mrp - discountPrice) / mrp) * 100);

      return {
        mrp: mrp,
        discountPrice: discountPrice,
        discountPercentage: discountPercentage,
        formattedMrp: mrp.toLocaleString('en-IN'),
        formattedDiscountPrice: discountPrice.toLocaleString('en-IN')
      };
    }

    // Default pricing for other products (no discount)
    return {
      mrp: product.price || 25000,
      discountPrice: product.price || 25000,
      discountPercentage: 0,
      formattedMrp: (product.price?.toLocaleString('en-IN') || '25,000'),
      formattedDiscountPrice: (product.price?.toLocaleString('en-IN') || '25,000')
    };
  }, [product.name, product.price]);

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

  // Check if current image is storm side view (for loading optimization only)
  const isStormSideView = useMemo(() => {
    const currentImage = productImages[currentImageIndex];
    return currentImage === stormSideView;
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
          price: pricingDetails.discountPrice,
          quantity: 1,
          image: currentImageSrc
        }
      }
    });
  }, [navigate, product, currentImageSrc, pricingDetails.discountPrice]);


  return (
    <section className="py-16 sm:py-24 lg:py-40 bg-white overflow-x-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0">
        
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          
          {/* Left Visual - Product Image with Navigation */}
          <div className="flex justify-center lg:justify-start w-full">
            <div className={`relative overflow-hidden w-full max-w-[80vw] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[750px] h-[300px] sm:h-[450px] md:h-[550px] lg:h-[750px] p-2 sm:p-4 ${isStormSideView ? 'bg-white' : ''}`}>
              <img
                src={currentImageSrc}
                alt={`${product.name} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-contain lg:drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)]"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  transformOrigin: 'center center',
                  transform: isStormFrontView ? 'scale(1.4) translateY(-5%)' :
                           isNestFrontView ? 'scale(1.4) translateY(-2%)' :
                           isStormSideView ? 'scale(1)' :
                           isLeftSideViewStorm ? 'scale(1.3) translateY(-3%)' :
                           isLeftSideViewNest ? 'scale(1.0) translateY(-3%)' : 'scale(1)'
                }}
                loading={isStormSideView ? "eager" : "lazy"}
                decoding={isStormSideView ? "sync" : "async"}
                onError={handleImageError}
              />
              
              {/* Navigation arrows - only show if multiple images */}
              {productImages.length > 1 && (
                <>
                  {/* Left arrow */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 lg:bg-white/80 lg:hover:bg-white lg:shadow-lg lg:rounded-full p-2 transition-all duration-200 hover:scale-105 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Right arrow */}
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 lg:bg-white/80 lg:hover:bg-white lg:shadow-lg lg:rounded-full p-2 transition-all duration-200 hover:scale-105 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image indicators - hidden on mobile */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:flex space-x-2 hidden">
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
          <div className="w-full space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-0 min-w-0">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora text-brand-grey-green leading-tight">
                {product.name.startsWith('Vaayura') ? product.name : 
                 product.name.toLowerCase() === 'strom' ? 'Vaayura Storm' : 
                 `Vaayura ${product.name}`}
              </h1>
              
              {/* Replace text description with feature cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full overflow-hidden">
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">CADR</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '400 m³/hr' :
                     product.name.toLowerCase().includes('nest') ? '190 m³/hr' : '190 m³/hr'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Coverage</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '600+ sq ft' :
                     product.name.toLowerCase().includes('nest') ? '300 sq ft' : '400 sq ft'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? 'Particle capture' :
                     product.name.toLowerCase().includes('nest') ? 'Particle capture' : 'Dimensions'}
                  </div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {(product.name.toLowerCase().includes('storm') || product.name.toLowerCase().includes('strom')) ? '0.1μm' :
                     product.name.toLowerCase().includes('nest') ? '0.1μm' : 'Compact'}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Fan Speeds</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Automatic</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Sleep Timer</div>
                  <div className="text-green-800 font-sora font-bold text-sm">3-4 hours</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-2 sm:px-3 md:px-4 py-3 text-center shadow-md min-w-0">
                  <div className="text-gray-600 text-xs font-montserrat font-medium mb-1">Filter</div>
                  <div className="text-green-800 font-sora font-bold text-sm">
                    {product.name.toLowerCase().includes('nest') ? '3 layer filter' : '4 layer filter'}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-4xl font-bold text-brand-grey-green">
                  ₹{pricingDetails.formattedDiscountPrice}
                </div>
                {pricingDetails.discountPercentage > 0 && (
                  <>
                    <div className="text-2xl font-medium text-gray-500 line-through">
                      ₹{pricingDetails.formattedMrp}
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {pricingDetails.discountPercentage}% OFF
                    </div>
                  </>
                )}
              </div>
              {pricingDetails.discountPercentage > 0 && (
                <p className="text-green-600 font-medium mb-2">
                  You save ₹{(pricingDetails.mrp - pricingDetails.discountPrice).toLocaleString('en-IN')}
                </p>
              )}
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