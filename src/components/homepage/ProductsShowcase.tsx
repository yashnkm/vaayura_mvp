import { Button } from "@/components/ui/button"
import product1 from "@/assets/product_hero.png"
import product2 from "@/ref_images/product1.png"

export function ProductsShowcase() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Air Pro */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={product1}
                  alt="Air Pro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Air Pro
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Powerful air purifier for living rooms, dining rooms, and kitchens
              </p>

              {/* Rental Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span>Rentals Available</span>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Shop Air Pro
                </Button>
              </div>
            </div>
          </div>

          {/* Air Mini+ */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={product2}
                  alt="Air Mini+"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Air Mini+
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Compact air purifier great for bedrooms, home offices, or bathrooms
              </p>

              {/* CTA Button */}
              <div className="pt-6">
                <Button
                  className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Shop Air Mini+
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}