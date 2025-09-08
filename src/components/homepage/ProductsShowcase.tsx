import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import stormFrontImg from "@/assets/sections/products/product-images/stormfrontview.png"
import stormSideImg from "@/assets/sections/products/product-images/stormsideview.png"
import nestFrontImg from "@/assets/sections/products/product-images/nestfrontview.png"
import nestSideImg from "@/assets/sections/products/product-images/nestsideview.png"

export function ProductsShowcase() {
  const [stormImageIndex, setStormImageIndex] = useState(0)
  const [nestImageIndex, setNestImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const stormImages = [stormFrontImg, stormSideImg]
  const nestImages = [nestFrontImg, nestSideImg]

  const nextStormImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setStormImageIndex((prev) => (prev + 1) % stormImages.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevStormImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setStormImageIndex((prev) => (prev - 1 + stormImages.length) % stormImages.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const nextNestImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setNestImageIndex((prev) => (prev + 1) % nestImages.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevNestImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setNestImageIndex((prev) => (prev - 1 + nestImages.length) % nestImages.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Images Row - Aligned from bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-end mb-8 sm:mb-12">
          
          {/* Storm Image */}
          <div className="flex justify-center" style={{ transform: 'translateY(-20px)' }}>
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg group mx-auto">
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={stormImages[stormImageIndex]}
                  alt="Vaayura Storm"
                  className="object-contain"
                  style={{ 
                    width: stormImageIndex === 0 ? '85%' : '70%',
                    height: stormImageIndex === 0 ? '85%' : '70%',
                    transform: stormImageIndex === 1 ? 'translateY(15px)' : 'none',
                    transition: 'width 0.3s ease, height 0.3s ease, transform 0.3s ease'
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Touch-friendly click areas for mobile */}
              <div
                onClick={prevStormImage}
                className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                aria-label="Previous Storm image"
              />

              {/* Center Click Area - Navigate to Product */}
              <Link to="/products/storm" className="absolute left-1/3 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation" aria-label="View Storm product details" />

              {/* Right Click Area */}
              <div
                onClick={nextStormImage}
                className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                aria-label="Next Storm image"
              />
              
              {/* Mobile swipe indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:hidden">
                {stormImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === stormImageIndex ? 'bg-green-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Nest Image */}
          <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg group mx-auto">
              <div className="aspect-square flex items-center justify-center">
                <img
                  src={nestImages[nestImageIndex]}
                  alt="Vaayura Nest"
                  className="object-contain"
                  style={{ 
                    width: nestImageIndex === 0 ? '85%' : '70%',
                    height: nestImageIndex === 0 ? '85%' : '70%',
                    transition: 'width 0.3s ease, height 0.3s ease'
                  }}
                  loading="lazy"
                />
              </div>
              
              {/* Touch-friendly click areas for mobile */}
              <div
                onClick={prevNestImage}
                className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                aria-label="Previous Nest image"
              />

              {/* Center Click Area - Navigate to Product */}
              <Link to="/products/nest" className="absolute left-1/3 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation" aria-label="View Nest product details" />

              {/* Right Click Area */}
              <div
                onClick={nextNestImage}
                className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer touch-manipulation"
                aria-label="Next Nest image"
              />
              
              {/* Mobile swipe indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 sm:hidden">
                {nestImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === nestImageIndex ? 'bg-green-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Row - Text information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          
          {/* Storm Info */}
          <div className="flex flex-col items-center text-center">
            {/* Product Info */}
            <div className="space-y-3 sm:space-y-4 max-w-sm px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Strom
              </h3>
              
              <div className="flex gap-2 sm:gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-subheading font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Living Rooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-subheading font-medium mb-1">Power</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">High Performance</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 justify-center w-full">
                <Link to="/checkout" state={{
                  item: {
                    id: '51f1a996-6e38-42a3-a952-b62a40436735', // Storm UUID from database
                    name: 'Strom', // Match database name
                    price: 15000, // Match database price
                    quantity: 1,
                    image: 'https://res.cloudinary.com/dmdhhrgme/image/upload/v1755672081/vaayura/products/zhncsmnmogny6bpioldf.png'
                  }
                }} className="w-full sm:w-[120px]">
                  <Button
                    size="lg"
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105 w-full text-sm min-h-[48px] touch-manipulation"
                  >
                    Add to Cart
                  </Button>
                </Link>
                <Link to="/products/storm" className="w-full sm:w-[120px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105 w-full text-sm min-h-[48px] touch-manipulation"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Nest Info */}
          <div className="flex flex-col items-center text-center">
            {/* Product Info */}
            <div className="space-y-3 sm:space-y-4 max-w-sm px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Nest
              </h3>
              
              <div className="flex gap-2 sm:gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-subheading font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Bedrooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-subheading font-medium mb-1">Size</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Compact</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 justify-center w-full">
                <Link to="/checkout" state={{
                  item: {
                    id: '719171bd-7b50-482f-9ee5-fc8c946c8b15', // Nest UUID from database (you mentioned this earlier)
                    name: 'Nest', // Match database name
                    price: 10000, // Match database price  
                    quantity: 1,
                    image: '/src/assets/sections/products/product-images/nestfrontview.png'
                  }
                }} className="w-full sm:w-[120px]">
                  <Button
                    size="lg"
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105 w-full text-sm min-h-[48px] touch-manipulation"
                  >
                    Add to Cart
                  </Button>
                </Link>
                <Link to="/products/nest" className="w-full sm:w-[120px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 active:scale-95 sm:hover:scale-105 w-full text-sm min-h-[48px] touch-manipulation"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Gradient Transition to Slate */}
      <div className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-b from-white to-slate-50 pointer-events-none z-10"></div>
    </section>
  )
}