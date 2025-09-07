import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import stormFrontImg from "@/assets/Productimages/stormfrontview.png"
import stormSideImg from "@/assets/Productimages/stormsideview.png"
import nestFrontImg from "@/assets/Productimages/nestfrontview.png"
import nestSideImg from "@/assets/Productimages/nestsideview.png"

export function ProductsShowcase() {
  const [stormImageIndex, setStormImageIndex] = useState(0)
  const [nestImageIndex, setNestImageIndex] = useState(0)

  const stormImages = [stormFrontImg, stormSideImg]
  const nestImages = [nestFrontImg, nestSideImg]

  const nextStormImage = () => {
    setStormImageIndex((prev) => (prev + 1) % stormImages.length)
  }

  const prevStormImage = () => {
    setStormImageIndex((prev) => (prev - 1 + stormImages.length) % stormImages.length)
  }

  const nextNestImage = () => {
    setNestImageIndex((prev) => (prev + 1) % nestImages.length)
  }

  const prevNestImage = () => {
    setNestImageIndex((prev) => (prev - 1 + nestImages.length) % nestImages.length)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          
          {/* Storm */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md group mx-auto">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center bg-gray-50/30">
                <img
                  src={stormImages[stormImageIndex]}
                  alt="Vaayura Storm"
                  className={`max-w-full max-h-full object-contain ${stormImageIndex === 0 ? 'p-3 sm:p-4 md:p-6' : 'p-8 sm:p-12 md:p-16 lg:p-20'} scale-100 sm:scale-105 md:scale-110 group-hover:scale-105 sm:group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300`}
                  style={{ 
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.12))',
                    maxHeight: '85%',
                    maxWidth: '85%'
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

            {/* Product Info */}
            <div className="space-y-3 sm:space-y-4 max-w-sm px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Storm
              </h3>
              
              <div className="flex gap-2 sm:gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Living Rooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Power</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">High Performance</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 justify-center w-full">
                <Link to="/checkout" state={{
                  item: {
                    id: 'storm',
                    name: 'Vaayura Storm',
                    price: 15990,
                    quantity: 1,
                    image: '/src/assets/Productimages/stormfrontview.png'
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

          {/* Nest */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md group mx-auto">
              <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center bg-gray-50/30">
                <img
                  src={nestImages[nestImageIndex]}
                  alt="Vaayura Nest"
                  className="max-w-full max-h-full object-contain p-4 sm:p-6 md:p-8 lg:p-10 scale-100 sm:scale-105 md:scale-110 group-hover:scale-105 sm:group-hover:scale-110 md:group-hover:scale-125 transition-transform duration-300"
                  style={{ 
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08)) drop-shadow(0 8px 20px rgba(0, 0, 0, 0.12))',
                    maxHeight: '85%',
                    maxWidth: '85%'
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

            {/* Product Info */}
            <div className="space-y-3 sm:space-y-4 max-w-sm px-4 sm:px-0">
              <h3 className="text-xl sm:text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Nest
              </h3>
              
              <div className="flex gap-2 sm:gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Bedrooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center shadow-md flex-1 min-w-0">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Size</div>
                  <div className="text-green-800 font-sora font-bold text-xs sm:text-sm">Compact</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 justify-center w-full">
                <Link to="/checkout" state={{
                  item: {
                    id: 'nest',
                    name: 'Vaayura Nest',
                    price: 8990,
                    quantity: 1,
                    image: '/src/assets/Productimages/nestfrontview.png'
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