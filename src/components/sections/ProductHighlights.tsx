import { Button } from "@/components/ui/legacy-button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, Smartphone, Home, Building2, ArrowRight } from "lucide-react"

export function ProductHighlights() {
  const products = [
    {
      name: "Vaayura Mini",
      tagline: "Compact power for personal spaces",
      description: "Perfect for bedrooms, offices, and small spaces. Advanced HEPA filtration in a sleek, portable design.",
      features: ["HEPA-13 Filter", "Whisper Quiet", "Touch Controls", "LED Indicators"],
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
      price: "₹12,999",
      coverage: "Up to 300 sq ft",
      icon: <Home className="w-6 h-6" />,
      badge: "Best Seller"
    },
    {
      name: "Vaayura Zen",
      tagline: "Smart, app-connected purification for larger spaces",
      description: "AI-powered air purification with real-time monitoring and smartphone control for living rooms and large spaces.",
      features: ["Wi-Fi Connected", "App Control", "Air Quality Monitor", "Auto Mode"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      price: "₹24,999",
      coverage: "Up to 800 sq ft",
      icon: <Building2 className="w-6 h-6" />,
      badge: "Smart Choice"
    }
  ]

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-brand-grey-green leading-tight">
            Product{" "}
            <span className="text-brand-pastel-green">Highlights</span>
          </h2>
          <div className="w-24 h-1 bg-brand-pastel-green mx-auto rounded-full"></div>
          <p className="text-xl md:text-2xl text-brand-dark-grey font-body max-w-3xl mx-auto leading-relaxed">
            Discover our flagship air purifiers designed to meet every need, from personal spaces to large environments.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card key={product.name} variant="brand-elevated" className="overflow-hidden bg-white group hover:shadow-2xl transition-all duration-300">
              
              {/* Product Badge */}
              <div className="relative">
                <Badge className="absolute top-4 left-4 z-10 bg-brand-grey-green text-white">
                  {product.badge}
                </Badge>
                
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-8 space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-brand-pastel-green/20 rounded-full flex items-center justify-center text-brand-grey-green">
                        {product.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-heading text-brand-grey-green">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-lg text-brand-pastel-green font-subheading">
                      {product.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading text-brand-grey-green">
                      {product.price}
                    </p>
                    <p className="text-sm text-brand-dark-grey">
                      {product.coverage}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-dark-grey font-body leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-sm font-heading text-brand-grey-green uppercase tracking-wide">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-brand-pastel-green rounded-full"></div>
                        <span className="text-sm text-brand-dark-grey font-body">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button variant="brand-primary" className="flex-1 group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="brand-outline" className="flex-1">
                    View Specs
                  </Button>
                </div>

              </div>
            </Card>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Button variant="brand-primary" size="brand-default" className="px-12">
            View All Products
          </Button>
        </div>

      </div>
    </section>
  )
}