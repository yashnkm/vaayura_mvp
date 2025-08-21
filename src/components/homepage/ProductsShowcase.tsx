import { Button } from "@/components/ui/button"
import stormImg from "@/assets/storm.png"
import nestImg from "@/assets/nest.png"

export function ProductsShowcase() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white">
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
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Vaayura Storm
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Powerful air purifier for living rooms, dining rooms, and kitchens
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex gap-3">
                <a href="/products/storm" className="flex-1">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                  >
                    Shop Vaayura Storm
                  </Button>
                </a>
                <Button
                  className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex-1"
                >
                  Bulk Order
                </Button>
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
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Vaayura Nest
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Compact air purifier great for bedrooms, home offices, or bathrooms
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex gap-3">
                <a href="/products/nest" className="flex-1">
                  <Button
                    className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 w-full"
                  >
                    Shop Vaayura Nest
                  </Button>
                </a>
                <Button
                  className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105 flex-1"
                >
                  Bulk Order
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}