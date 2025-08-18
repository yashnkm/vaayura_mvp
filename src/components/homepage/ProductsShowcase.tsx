import { Button } from "@/components/ui/button"

export function ProductsShowcase() {
  return (
    <section className="py-20 bg-emerald-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Choose Your Perfect Air Purifier
          </h2>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            From compact spaces to large living areas, we have the perfect solution for every home.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Vaayura Mini */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Product Image Placeholder */}
            <div className="mb-8">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto bg-emerald-300 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-emerald-700">Vaayura Mini</p>
                </div>
              </div>
              
              {/* Product Badge */}
              <div className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                Compact & Powerful
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Vaayura Mini</h3>
                <p className="text-gray-600 leading-relaxed">
                  Perfect for small to medium rooms. Delivers premium air purification in a sleek, compact design.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Room Size:</strong> Up to 300 sq ft</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Coverage:</strong> 4x air changes per hour</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Noise Level:</strong> Ultra-quiet ≤25dB</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Unique Feature:</strong> Smart air quality sensor</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-3 font-semibold transition-colors duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* Vaayura Zen */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Product Image Placeholder */}
            <div className="mb-8">
              <div className="aspect-square bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto bg-emerald-400 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-emerald-800">Vaayura Zen</p>
                </div>
              </div>
              
              {/* Product Badge */}
              <div className="inline-block bg-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                Premium Performance
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Vaayura Zen</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our flagship model for large spaces. Advanced filtration with whisper-quiet operation and smart controls.
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Room Size:</strong> Up to 800 sq ft</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Coverage:</strong> 5x air changes per hour</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Noise Level:</strong> Sleep mode ≤20dB</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-700"><strong>Unique Feature:</strong> App control & scheduling</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-3 font-semibold transition-colors duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-emerald-100 mb-6">
            Need help choosing? Our air quality experts are here to help.
          </p>
          <Button 
            variant="outline" 
            className="border-emerald-200 text-emerald-100 hover:bg-emerald-800 px-8 py-3 rounded-2xl font-semibold"
          >
            Compare All Models
          </Button>
        </div>
      </div>
    </section>
  )
}