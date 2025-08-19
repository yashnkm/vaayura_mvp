import { Button } from "@/components/ui/button"
import product1 from "@/assets/product_hero.png"
import product2 from "@/ref_images/product1.png"

export function ProductsShowcase() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Storm */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={product1}
                  alt="Storm"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Storm
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Powerful air purifier for living rooms, dining rooms, and kitchens
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Shop Storm
                </Button>
              </div>
            </div>
          </div>

          {/* Nest */}
          <div className="flex flex-col items-center text-center">
            {/* Product Image */}
            <div className="relative mb-8 w-full max-w-md">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={product2}
                  alt="Nest"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 max-w-sm">
              <h3 className="text-2xl font-display font-semibold text-gray-900">
                Nest
              </h3>
              
              <p className="text-gray-600 font-body leading-relaxed">
                Compact air purifier great for bedrooms, home offices, or bathrooms
              </p>

              {/* CTA Button */}
              <div className="pt-6">
                <Button
                  className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  Shop Nest
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}