import { Button } from "@/components/ui/button"
import stormImg from "@/assets/Productimages/stormfrontview.png"
import nestImg from "@/assets/Productimages/nestfrontview.png"

export function ProductsShowcase() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Storm */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={stormImg}
                  alt="Storm"
                  className="w-full h-full object-contain p-6 scale-110 hover:scale-125 transition-transform duration-300 cursor-pointer"
                  style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))' }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Storm
              </h3>
              
              <p className="text-gray-600 font-montserrat leading-relaxed">
                Powerful air purifier for living rooms, dining rooms, and kitchens
              </p>

              {/* CTA Buttons */}
              <div className="pt-4">
                <a href="/products/storm">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                  >
                    Shop Vaayura Storm
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Nest */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <img
                  src={nestImg}
                  alt="Nest"
                  className="w-full h-full object-contain p-7 hover:scale-110 transition-transform duration-300 cursor-pointer"
                  style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.15))' }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-sora font-semibold text-[#36454F]">
                Vaayura Nest
              </h3>
              
              <p className="text-gray-600 font-montserrat leading-relaxed">
                Compact air purifier great for bedrooms, home offices, or bathrooms
              </p>

              {/* CTA Buttons */}
              <div className="pt-4">
                <a href="/products/nest">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                  >
                    Shop Vaayura Nest
                  </Button>
                </a>
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