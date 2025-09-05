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
    <section className="py-20 px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Storm */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md group">
              <div className="aspect-square rounded-3xl overflow-hidden flex items-end justify-center">
                <img
                  src={stormImages[stormImageIndex]}
                  alt="Vaayura Storm"
                  className={`w-full h-full object-contain object-bottom ${stormImageIndex === 0 ? 'p-6' : 'p-20'} scale-110 group-hover:scale-125 transition-transform duration-300 -translate-y-8`}
                  style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))' }}
                />
              </div>
              
              {/* Left Click Area */}
              <div
                onClick={prevStormImage}
                className="absolute left-0 top-0 w-1/3 h-full z-20"
                aria-label="Previous Storm image"
              />

              {/* Center Click Area - Navigate to Product */}
              <Link to="/products/storm">
                <div
                  className="absolute left-1/3 top-0 w-1/3 h-full z-20"
                  aria-label="View Storm product details"
                />
              </Link>

              {/* Right Click Area */}
              <div
                onClick={nextStormImage}
                className="absolute right-0 top-0 w-1/3 h-full z-20"
                aria-label="Next Storm image"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Storm
              </h3>
              
              <div className="flex gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md min-w-[100px]">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Living Rooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md min-w-[100px]">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Power</div>
                  <div className="text-green-800 font-sora font-bold text-sm">High Performance</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex gap-3 justify-center">
                <Link to="/checkout" state={{
                  item: {
                    id: 'storm',
                    name: 'Vaayura Storm',
                    price: 15990,
                    quantity: 1,
                    image: '/src/assets/Productimages/stormfrontview.png'
                  }
                }} className="w-[120px]">
                  <Button
                    size="lg"
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full text-sm min-h-[48px]"
                  >
                    Add to Cart
                  </Button>
                </Link>
                <Link to="/products/storm" className="w-[120px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full text-sm min-h-[48px]"
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
            <div className="relative mb-8 w-full max-w-md group">
              <div className="aspect-square rounded-3xl overflow-hidden flex items-end justify-center">
                <img
                  src={nestImages[nestImageIndex]}
                  alt="Vaayura Nest"
                  className="w-full h-full object-contain object-bottom p-10 group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))' }}
                />
              </div>
              
              {/* Left Click Area */}
              <div
                onClick={prevNestImage}
                className="absolute left-0 top-0 w-1/3 h-full z-20"
                aria-label="Previous Nest image"
              />

              {/* Center Click Area - Navigate to Product */}
              <Link to="/products/nest">
                <div
                  className="absolute left-1/3 top-0 w-1/3 h-full z-20"
                  aria-label="View Nest product details"
                />
              </Link>

              {/* Right Click Area */}
              <div
                onClick={nextNestImage}
                className="absolute right-0 top-0 w-1/3 h-full z-20"
                aria-label="Next Nest image"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Nest
              </h3>
              
              <div className="flex gap-3 justify-center mb-2">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md min-w-[100px]">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Ideal For</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Bedrooms</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-center shadow-md min-w-[100px]">
                  <div className="text-gray-500 text-xs font-montserrat font-medium mb-1">Size</div>
                  <div className="text-green-800 font-sora font-bold text-sm">Compact</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex gap-3 justify-center">
                <Link to="/checkout" state={{
                  item: {
                    id: 'nest',
                    name: 'Vaayura Nest',
                    price: 8990,
                    quantity: 1,
                    image: '/src/assets/Productimages/nestfrontview.png'
                  }
                }} className="w-[120px]">
                  <Button
                    size="lg"
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full text-sm min-h-[48px]"
                  >
                    Add to Cart
                  </Button>
                </Link>
                <Link to="/products/nest" className="w-[120px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full text-sm min-h-[48px]"
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