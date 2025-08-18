import { Shield, Zap, Leaf, Moon, Sparkles, Wifi, Wind, Heart } from "lucide-react";

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

interface ProductDetailFeaturesProps {
  product: Product;
}

// Icon mapping for feature icons
const iconMap = {
  shield: Shield,
  zap: Zap,
  leaf: Leaf,
  moon: Moon,
  sparkles: Sparkles,
  wifi: Wifi,
  wind: Wind,
  heart: Heart,
};

export function ProductDetailFeatures({ product }: ProductDetailFeaturesProps) {
  // Fallback features if none provided
  const defaultFeatures = [
    {
      title: "Advanced Filtration",
      description: "Multi-layer HEPA filtration system removes 99.97% of ultra-fine particles including allergens, dust, and pollutants.",
      icon: "shield"
    },
    {
      title: "Smart Auto Mode",
      description: "Intelligent sensors automatically detect air quality and adjust purification speed for optimal performance.",
      icon: "zap"
    },
    {
      title: "Whisper Quiet",
      description: "Sleep mode operates at less than 40dB - quieter than a library for undisturbed rest.",
      icon: "moon"
    },
    {
      title: "App Connectivity",
      description: "Monitor and control your air purifier remotely with real-time air quality data through our smart app.",
      icon: "wifi"
    }
  ];

  const features = product.features && product.features.length > 0 ? product.features : defaultFeatures;

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-brand-grey-green leading-tight">
              Advanced <span className="text-brand-pastel-green">Features</span>
            </h2>
            <p className="text-lg text-brand-dark-grey font-body max-w-3xl mx-auto">
              Every feature is designed to provide you with the cleanest, healthiest air while maintaining 
              the perfect balance of performance and tranquility.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Shield;
              
              return (
                <div 
                  key={index}
                  className="flex gap-6 group"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-brand-pastel-green/10 flex items-center justify-center group-hover:bg-brand-pastel-green/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-brand-grey-green" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-brand-grey-green font-subheading group-hover:text-brand-pastel-green transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-brand-dark-grey font-body leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="bg-slate-50 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-semibold text-brand-grey-green mb-4 font-display">
                Experience the Difference
              </h3>
              <p className="text-brand-dark-grey font-body text-lg mb-8 max-w-2xl mx-auto">
                See how {product.name} can transform your indoor air quality and enhance your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-brand-pastel-green hover:bg-brand-pastel-green/90 text-brand-grey-green px-8 py-3 rounded-full font-medium text-lg transition-colors">
                  Try Risk-Free for 30 Days
                </button>
                <button className="border border-brand-pastel-green text-brand-grey-green hover:bg-brand-pastel-green/10 px-8 py-3 rounded-full font-medium text-lg transition-colors">
                  Schedule Home Demo
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}